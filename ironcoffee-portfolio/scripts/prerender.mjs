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
 * bundle has parsed and React has begun rendering — an extra round trip on
 * every page that isn't the home page.
 */
async function loadChunkHints() {
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
    '/404': 'src/pages/NotFound.tsx',
  };

  const entryFor = (url) => {
    if (pageFor[url]) return pageFor[url];
    if (url.startsWith('/work/')) return 'src/pages/ProjectPage.tsx';
    if (url.startsWith('/blog/')) return 'src/pages/BlogPost.tsx';
    return null;
  };

  return (url) => {
    const key = entryFor(url);
    const chunk = key && manifest[key];
    if (!chunk) return '';

    const tags = [`<link rel="modulepreload" crossorigin href="/${chunk.file}">`];
    for (const css of chunk.css ?? []) {
      tags.push(`<link rel="stylesheet" crossorigin href="/${css}">`);
    }
    return tags.join('\n    ');
  };
}

function buildRoutes({ projects, posts }) {
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/work', priority: '0.9', changefreq: 'weekly' },
    { url: '/apps', priority: '0.9', changefreq: 'monthly' },
    { url: '/open-source', priority: '0.8', changefreq: 'monthly' },
    { url: '/games', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
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
    <title>Joshua Kac — Writing</title>
    <link>${ORIGIN}/blog</link>
    <description>Notes on shipping software — mobile, backend, games and the things that went wrong.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
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

  const { render, projects, posts } = await loadServerBundle();
  const content = { projects, posts };
  const routes = buildRoutes(content);
  const hintsFor = await loadChunkHints();

  let count = 0;
  for (const route of routes) {
    const rendered = await render(route.url);
    const page = composePage(template, rendered, hintsFor(route.url));

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

  await writeFile(path.join(OUT, 'sitemap.xml'), renderSitemap(routes));
  await writeFile(path.join(OUT, 'rss.xml'), renderRss(content.posts));

  await rm(SSR, { recursive: true, force: true });
  // The manifest is a build artifact, not something to publish.
  await rm(path.join(OUT, '.vite'), { recursive: true, force: true });

  console.log(
    `Prerendered ${count} routes, ${content.posts.length} posts in the feed.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
