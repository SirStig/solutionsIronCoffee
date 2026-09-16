/**
 * Every demo site, in one list, derived from the configs.
 *
 * `npm run demos`
 *
 * Exists because the alternative is a list of URLs kept in a note somewhere,
 * and a list of URLs kept in a note somewhere is wrong within a fortnight: a
 * slug changes, a preview expires, a business goes live and nobody updates it.
 * This reads the same data the prerenderer builds from, so it cannot disagree
 * with what is actually deployed.
 *
 * Deliberately a terminal command rather than a page on the site. A public
 * index of every preview would undo the three separate things that keep them
 * out of search: the noindex tag, the Disallow in robots.txt, and their
 * absence from the sitemap. These are pages built for one business to look at,
 * not a directory.
 *
 * Reads the TypeScript directly through esbuild rather than the SSR bundle, so
 * it works without a build and answers in well under a second.
 */
import { build } from 'esbuild';
import { rm, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --- Options ------------------------------------------------------------- */
const args = process.argv.slice(2);
const has = (...names) => names.some((n) => args.includes(n));
const URLS_ONLY = has('--urls', '-u');
const JSON_OUT = has('--json');
const LOCAL = has('--local');
const ORIGIN = LOCAL ? 'http://127.0.0.1:4200' : 'https://solutions.ironcoffee.com';

/* --- Load the configs ---------------------------------------------------- */
const dir = await mkdtemp(path.join(tmpdir(), 'demos-'));
const outfile = path.join(dir, 'demos.mjs');
try {
  await build({
    entryPoints: [path.join(root, 'src/demos/index.ts')],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
    // The registry pulls in types only, so nothing here needs React or CSS.
    external: ['react', 'react-dom', '*.css'],
  });
  var demos = await import(pathToFileURL(outfile).href);
} finally {
  await rm(dir, { recursive: true, force: true });
}

const { showcases, previews, drafts, demoRoutes, formatExpiry, daysRemaining, isExpired } = demos;

/* --- Shape it ------------------------------------------------------------ */
const row = (d) => {
  const routes = demoRoutes(d).map((r) => ORIGIN + r);
  return {
    slug: d.slug,
    name: d.business.name,
    where: `${d.business.city}, ${d.business.state}`,
    template: d.template,
    kind: d.showcase ? 'sample' : 'preview',
    draft: Boolean(d.draft),
    url: routes[0],
    pages: routes,
    subdomain: d.showcase ? null : `https://${d.slug}.ironcoffee.com`,
    expires: d.showcase ? null : formatExpiry(d),
    daysLeft: d.showcase ? null : daysRemaining(d),
    expired: isExpired(d),
  };
};

const samples = showcases.map(row);
const outreach = previews.map(row);
const held = drafts.map(row);

if (JSON_OUT) {
  console.log(JSON.stringify({ samples, previews: outreach, drafts: held }, null, 2));
  process.exit(0);
}

if (URLS_ONLY) {
  for (const d of [...samples, ...outreach]) console.log(d.url);
  process.exit(0);
}

/* --- Print --------------------------------------------------------------- */
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const warn = (s) => `\x1b[33m${s}\x1b[0m`;
const bad = (s) => `\x1b[31m${s}\x1b[0m`;

function section(title, rows, { expiry = false } = {}) {
  if (!rows.length) return;
  console.log(`\n${bold(title)}  ${dim(`(${rows.length})`)}`);
  const w = Math.max(...rows.map((r) => r.name.length));
  for (const r of rows) {
    const extra = r.pages.length > 1 ? dim(`  +${r.pages.length - 1} pages`) : '';
    console.log(`  ${r.name.padEnd(w)}  ${r.url}${extra}`);
    const meta = [dim(r.where), dim(r.template)];
    if (expiry) {
      if (r.expired) meta.push(bad('EXPIRED'));
      else if (r.daysLeft <= 14) meta.push(warn(`${r.daysLeft} days left`));
      else meta.push(dim(`${r.daysLeft} days left, until ${r.expires}`));
    }
    if (r.subdomain) meta.push(dim(r.subdomain));
    console.log(`  ${' '.repeat(w)}  ${meta.join(dim(' · '))}`);
  }
}

section('Gallery samples', samples);
section('Previews for real businesses', outreach, { expiry: true });
section('Drafts, not built and not reachable', held);

const soon = outreach.filter((r) => !r.expired && r.daysLeft <= 14);
if (soon.length) {
  console.log(
    `\n${warn('!')} ${soon.length} preview${soon.length > 1 ? 's' : ''} expiring within a fortnight. ` +
      `Bump createdAt to keep one alive.`
  );
}
if (outreach.some((r) => r.expired)) {
  console.log(`\n${bad('!')} An expired preview serves the retired page, not the site.`);
}

console.log(dim('\n  --urls for bare URLs, --json for everything, --local to point at 127.0.0.1:4200\n'));
