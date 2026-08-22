/**
 * Compiles `.md` files to JS modules at build time.
 *
 * `import post from './hello.md'` yields:
 *   { slug, html, readingTime, excerpt, ...frontmatter }
 *
 * Markdown parsing and syntax highlighting happen here, in Node — the browser
 * never downloads `marked` or `shiki`. Highlighted code uses CSS variables so a
 * single stylesheet themes both light and dark without re-highlighting.
 */
import path from 'node:path';
import { Marked } from 'marked';
import { createHighlighter } from 'shiki';

const LANGS = [
  'typescript',
  'tsx',
  'javascript',
  'jsx',
  'json',
  'bash',
  'python',
  'css',
  'html',
  'yaml',
  'sql',
  'swift',
  'diff',
  'markdown',
];

let highlighterPromise;
const getHighlighter = () => {
  highlighterPromise ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: LANGS,
  });
  return highlighterPromise;
};

/**
 * Minimal frontmatter reader. Supports the subset this blog actually uses:
 * `key: value`, quoted strings, `[a, b]` inline arrays, and booleans.
 */
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else if (value === 'true' || value === 'false') {
      value = value === 'true';
    }

    data[key] = value;
  }

  return { data, body: raw.slice(match[0].length) };
}

/** ~220 wpm, rounded up, floor of 1. */
const readingTime = (body) =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));

/** First paragraph, stripped of markdown syntax, for cards and meta description. */
function deriveExcerpt(body) {
  const para = body
    .replace(/^#{1,6} .*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .find((s) => s.length > 0);

  if (!para) return '';
  return para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Slugify heading text so posts get linkable section anchors. */
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

/** @returns {import('vite').Plugin} */
export default function markdownPlugin() {
  return {
    name: 'ironcoffee:markdown',
    enforce: /** @type {const} */ ('pre'),

    async transform(code, id) {
      const [file, query] = id.split('?');
      if (!file.endsWith('.md')) return null;

      // `?meta` yields everything except the rendered HTML. Index pages import
      // that variant so a post's body only ships with the post's own chunk.
      const metaOnly = query === 'meta';

      const { data, body } = parseFrontmatter(code);
      const slug = data.slug || path.basename(file, '.md');

      const common = {
        ...data,
        slug,
        readingTime: readingTime(body),
        excerpt: data.excerpt || deriveExcerpt(body),
      };

      if (metaOnly) {
        return { code: `export default ${JSON.stringify(common)}`, map: null };
      }

      const highlighter = await getHighlighter();

      const marked = new Marked({ gfm: true, breaks: false });

      const headings = [];
      marked.use({
        renderer: {
          code({ text, lang }) {
            const language = LANGS.includes(lang) ? lang : 'text';
            const html = highlighter.codeToHtml(text, {
              lang: language,
              themes: { light: 'github-light', dark: 'github-dark' },
              defaultColor: false,
              cssVariablePrefix: '--s-',
            });
            return `<figure class="code-block" data-lang="${language}">${html}</figure>`;
          },

          heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);
            const id = slugify(text);
            if (depth === 2 || depth === 3) headings.push({ id, text, depth });
            return `<h${depth} id="${id}"><a class="heading-anchor" href="#${id}">${text}</a></h${depth}>`;
          },

          link({ href, title, tokens }) {
            const text = this.parser.parseInline(tokens);
            const external = /^https?:\/\//.test(href);
            const attrs = external
              ? ' target="_blank" rel="noopener noreferrer"'
              : '';
            const t = title ? ` title="${title}"` : '';
            return `<a href="${href}"${t}${attrs}>${text}</a>`;
          },

          image({ href, title, text }) {
            const t = title ? ` title="${title}"` : '';
            return `<img src="${href}" alt="${text}"${t} loading="lazy" decoding="async" />`;
          },
        },
      });

      const html = await marked.parse(body);
      const post = { ...common, html, headings };

      return {
        code: `export default ${JSON.stringify(post)}`,
        map: null,
      };
    },
  };
}
