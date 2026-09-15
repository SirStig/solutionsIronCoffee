/**
 * Turns the SPA build into a set of real HTML pages.
 *
 * For every known route this renders the React tree to HTML, injects it plus
 * the route's <head> tags into the built index.html, and writes it to the path
 * a static host will serve directly. Crawlers and link unfurlers then get full
 * content with no JavaScript, and visitors get a painted page before hydration.
 *
 * Also emits sitemap.xml and rss.xml from the same data, so they can never
 * drift from what actually exists.
 *
 * Run: node scripts/prerender.mjs   (after `vite build` and the SSR build)
 */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Overridable so a development-mode build can be prerendered alongside the
// production one when debugging hydration.
const OUT = path.join(root, process.env.PRERENDER_OUT ?? 'build');
const SSR = path.join(root, '.ssr-build');
const ORIGIN = 'https://solutions.ironcoffee.com';

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** Loads the SSR bundle, which re-exports both the renderer and the content. */
async function loadServerBundle() {
  const files = await readdir(SSR);
  const entry = files.find(
    (f) => f.startsWith('entry-server') && f.endsWith('.js')
  );
  if (!entry) throw new Error(`No entry-server chunk in ${SSR}`);

  return import(pathToFileURL(path.join(SSR, entry)).href);
}

/**
 * Maps each route to its lazily-loaded page chunk, plus that chunk's CSS.
 *
 * Without this the browser only discovers a route's chunk after the entry
 * bundle has parsed and React has begun rendering, costing an extra round trip on
 * every page that isn't the home page.
 */
async function loadChunkHints(alreadyLinked = new Set()) {
  let manifest;
  try {
    manifest = JSON.parse(
      await readFile(path.join(OUT, '.vite/manifest.json'), 'utf8')
    );
  } catch {
    return () => '';
  }

  const pageFor = {
    '/work': 'src/pages/Work.tsx',
    '/apps': 'src/pages/Apps.tsx',
    '/open-source': 'src/pages/OpenSource.tsx',
    '/games': 'src/pages/Games.tsx',
    '/blog': 'src/pages/Blog.tsx',
    '/about': 'src/pages/About.tsx',
    '/contact': 'src/pages/Contact.tsx',
    '/services': 'src/pages/Services.tsx',
    '/templates': 'src/pages/Templates.tsx',
    '/preview-expired': 'src/pages/PreviewExpired.tsx',
    '/404': 'src/pages/NotFound.tsx',
  };

  const entryFor = (url) => {
    if (pageFor[url]) return pageFor[url];
    if (url.startsWith('/work/')) return 'src/pages/ProjectPage.tsx';
    if (url.startsWith('/blog/')) return 'src/pages/BlogPost.tsx';
    if (url.startsWith('/templates/')) return 'src/pages/TemplateShowcase.tsx';
    if (url.startsWith('/demo/')) return 'src/pages/Demo.tsx';
    return null;
  };

  /**
   * Every stylesheet a chunk needs, including the ones its imports pull in.
   *
   * Only walking `chunk.css` misses anything Rollup hoisted into a shared
   * chunk. The demo templates are exactly that case: their styles are imported
   * by components under src/demos, which Rollup factors out of the page chunk,
   * so the page shipped with no stylesheet link at all. The browser then had to
   * wait for JavaScript to discover the CSS, which meant the page rendered
   * unstyled first and shifted violently when the styles landed, and rendered
   * unstyled forever with JavaScript off.
   */
  const collect = (key, seen = new Set()) => {
    if (!key || seen.has(key)) return { css: [], js: [] };
    seen.add(key);

    const chunk = manifest[key];
    if (!chunk) return { css: [], js: [] };

    const css = [...(chunk.css ?? [])];
    const js = [];

    for (const imported of chunk.imports ?? []) {
      const nested = collect(imported, seen);
      css.push(...nested.css);
      if (manifest[imported]?.file) js.push(manifest[imported].file);
      js.push(...nested.js);
    }

    return { css, js };
  };

  return (url) => {
    const key = entryFor(url);
    const chunk = key && manifest[key];
    if (!chunk) return '';

    const { css, js } = collect(key);
    const tags = [`<link rel="modulepreload" crossorigin href="/${chunk.file}">`];

    for (const file of [...new Set(js)]) {
      tags.push(`<link rel="modulepreload" crossorigin href="/${file}">`);
    }
    for (const file of [...new Set(css)]) {
      // The shell already links the entry stylesheet; repeating it here would
      // put the same <link> on every page twice.
      if (alreadyLinked.has(file)) continue;
      tags.push(`<link rel="stylesheet" crossorigin href="/${file}">`);
    }
    return tags.join('\n    ');
  };
}

function buildRoutes({ projects, posts, previews, showcases }) {
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/work', priority: '0.9', changefreq: 'weekly' },
    { url: '/apps', priority: '0.9', changefreq: 'monthly' },
    { url: '/open-source', priority: '0.8', changefreq: 'monthly' },
    { url: '/games', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/templates', priority: '0.9', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'yearly' },
  ];

  return [
    ...staticRoutes,
    ...projects.map((p) => ({
      url: `/work/${p.slug}`,
      priority: p.featured ? '0.8' : '0.6',
      changefreq: 'monthly',
    })),
    ...posts.map((p) => ({
      url: `/blog/${p.slug}`,
      priority: '0.7',
      changefreq: 'yearly',
      lastmod: p.date,
    })),
    // The gallery samples are public and indexed. They are the sales
    // collateral, so they belong in search results.
    ...showcases.map((d) => ({
      url: `/templates/${d.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
    // Previews built for a named business are the opposite: served, but never
    // listed. The page carries a noindex tag as well, and robots.txt disallows
    // the whole directory. Three layers, because only one of them is under my
    // control once a link has been sent.
    ...previews.map((d) => ({ url: `/demo/${d.slug}`, skipSitemap: true })),
    { url: '/preview-expired', skipSitemap: true },
    // Rendered so the host can serve a styled 404 instead of a blank shell.
    { url: '/404', skipSitemap: true },
  ];
}

/** Splices rendered markup, head tags and chunk hints into the built shell. */
function composePage(template, { html, helmet }, hints = '') {
  // `prioritizeSeoTags` on <Helmet> moves title, description, canonical and the
  // og:* tags into `priority`; without it they never reach the static HTML.
  const head = [
    helmet.priority?.toString(),
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  return (
    template
      // The shell's defaults are replaced by the route's own tags.
      .replace(/<title>[\s\S]*?<\/title>\s*/, '')
      .replace(/<meta name="description"[^>]*>\s*/, '')
      .replace('</head>', `  ${[head, hints].filter(Boolean).join('\n    ')}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  );
}

function renderSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = routes
    .filter((r) => !r.skipSitemap)
    .map(
      (r) => `  <url>
    <loc>${ORIGIN}${r.url === '/' ? '/' : r.url}</loc>
    <lastmod>${r.lastmod ?? today}</lastmod>
    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>
    <priority>${r.priority ?? '0.5'}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function renderRss(posts) {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${ORIGIN}/blog/${p.slug}</link>
      <guid isPermaLink="true">${ORIGIN}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Writing by Joshua Kac</title>
    <link>${ORIGIN}/blog</link>
    <description>Notes on shipping software: mobile, backend, games and the things that went wrong.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

/**
 * Checks that every CSS-module class a page renders is actually defined in a
 * stylesheet that page links.
 *
 * This exists because it silently was not. Rollup hoists styles imported by
 * shared components into a shared chunk, and the hint builder only looked at
 * the page chunk's own `css` array, so demo pages shipped with no link to their
 * stylesheet at all. Everything still looked right in a browser, because the
 * JavaScript eventually pulled the CSS in. The only symptoms were an unstyled
 * page for anyone without JavaScript and a large layout shift for everyone
 * else, neither of which any other check here would have caught.
 */
async function verifyStyles(pages) {
  const cache = new Map();

  const cssFor = async (href) => {
    if (!cache.has(href)) {
      cache.set(href, await readFile(path.join(OUT, href), 'utf8').catch(() => ''));
    }
    return cache.get(href);
  };

  for (const { url, html } of pages) {
    const linked = [...html.matchAll(/<link rel="stylesheet"[^>]*href="\/([^"]+)"/g)].map(
      (m) => m[1]
    );
    const sheets = (await Promise.all(linked.map(cssFor))).join('\n');

    // One representative class per module hash is enough; they share a sheet.
    const used = new Set(
      [...html.matchAll(/class="([^"]*)"/g)]
        .flatMap((m) => m[1].split(/\s+/))
        .filter((c) => /^_[A-Za-z0-9]+_[a-z0-9]{5,}_\d+$/.test(c))
    );

    const byHash = new Map();
    for (const cls of used) byHash.set(cls.split('_').at(-2), cls);

    for (const cls of byHash.values()) {
      if (!sheets.includes(`.${cls}`)) {
        throw new Error(
          `${url} renders ${cls} but links no stylesheet defining it. ` +
            `A shared chunk's CSS is probably missing from the page hints.`
        );
      }
    }
  }
}

async function main() {
  const template = await readFile(path.join(OUT, 'index.html'), 'utf8');

  // The shell is both the input and one of the outputs, so running this twice
  // without an intervening `vite build` would bake the home page's tags into
  // every other page. Refuse rather than corrupt the output silently.
  if (template.includes('data-rh="true"')) {
    throw new Error(
      'build/index.html is already prerendered. Run `vite build` to regenerate ' +
        'the shell before prerendering again (or just use `npm run build`).'
    );
  }

  const { render, projects, posts, previews, showcases, isExpired, formatExpiry } =
    await loadServerBundle();

  // A lapsed preview still gets built: the URL was texted to somebody and it
  // should land on the page that offers to put it back, not on a 404. Say so
  // out loud though, because a config that has aged out is usually one that
  // should be deleted along with the photos it borrowed.
  const lapsed = previews.filter((d) => isExpired(d));
  for (const demo of lapsed) {
    console.log(
      `  note: /demo/${demo.slug} expired on ${formatExpiry(demo)} and now serves the retired-preview page.`
    );
  }

  const content = { projects, posts, previews, showcases };
  const routes = buildRoutes(content);
  const shellStyles = new Set(
    [...template.matchAll(/<link rel="stylesheet"[^>]*href="\/([^"]+)"/g)].map(
      (m) => m[1]
    )
  );
  const hintsFor = await loadChunkHints(shellStyles);

  const written = [];
  let count = 0;
  for (const route of routes) {
    const rendered = await render(route.url);
    const page = composePage(template, rendered, hintsFor(route.url));
    written.push({ url: route.url, html: page });

    // `/work/beyond25` → build/work/beyond25/index.html, so the host serves it
    // at the clean URL with no rewrite rule.
    const dir =
      route.url === '/' ? OUT : path.join(OUT, route.url.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), page);
    count += 1;
  }

  // The 404 body also has to exist at the path Apache's ErrorDocument points to.
  await writeFile(
    path.join(OUT, '404.html'),
    await readFile(path.join(OUT, '404/index.html'), 'utf8')
  );

  await verifyStyles(written);

  await writeFile(path.join(OUT, 'sitemap.xml'), renderSitemap(routes));
  await writeFile(path.join(OUT, 'rss.xml'), renderRss(content.posts));

  await rm(SSR, { recursive: true, force: true });
  // The manifest is a build artifact, not something to publish.
  await rm(path.join(OUT, '.vite'), { recursive: true, force: true });

  console.log(
    `Prerendered ${count} routes, ${content.posts.length} posts in the feed, ` +
      `${showcases.length} gallery samples and ${previews.length} previews ` +
      `(${lapsed.length} expired).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
