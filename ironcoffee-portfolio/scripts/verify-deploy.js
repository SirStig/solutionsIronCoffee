/**
 * Checks the live deployment after an upload.
 *
 * Verifies that every route serves prerendered HTML (not the bare SPA shell),
 * that the old URLs still redirect, and that the feeds are reachable.
 *
 * Run: npm run verify
 */
const ORIGIN = process.env.VERIFY_ORIGIN ?? 'https://solutions.ironcoffee.com';

/** Pages that must return 200 and contain server-rendered content. */
const pages = [
  ['/', 'Joshua'],
  ['/work', 'Work'],
  ['/work/beyond25', 'Beyond25'],
  ['/apps', 'Apps'],
  ['/open-source', 'Open source'],
  ['/games', 'Games'],
  ['/blog', 'Writing'],
  ['/about', 'About'],
  ['/contact', 'Get in touch'],
  ['/services', 'What a website costs'],
  ['/templates', 'Sample sites'],
  ['/templates/ridgeline-smokehouse', 'Ridgeline Smokehouse'],
];

/** Files that must exist. */
const files = ['/sitemap.xml', '/rss.xml', '/robots.txt', '/manifest.json'];

/** Old URLs that must still land somewhere sensible. */
const redirects = [['/portfolio', '/work']];

/**
 * Previews must be reachable and must stay out of search. Three things have to
 * hold at once, and only one of them is visible in the page source, so all
 * three get checked here rather than trusted.
 */
const previews = ['/demo/test'];

/** Subdomains with no demo behind them must 404, never serve the portfolio. */
const strayHost = 'no-such-demo.ironcoffee.com';

let failures = 0;

const fail = (msg) => {
  failures += 1;
  console.log(`  FAIL  ${msg}`);
};

async function checkPage([path, needle]) {
  try {
    const res = await fetch(ORIGIN + path, { redirect: 'follow' });
    const body = await res.text();

    if (!res.ok) return fail(`${path} → ${res.status}`);

    // The shell alone would mean prerendering did not run or was not uploaded.
    if (!body.includes(needle)) {
      return fail(`${path} → 200 but no "${needle}" in the HTML`);
    }
    if (!body.includes('<title>') && !body.includes('data-rh')) {
      return fail(`${path} → no per-page head tags`);
    }

    console.log(`  ok    ${path}`);
  } catch (err) {
    fail(`${path} → ${err.message}`);
  }
}

async function checkFile(path) {
  try {
    const res = await fetch(ORIGIN + path);
    if (!res.ok) return fail(`${path} → ${res.status}`);
    console.log(`  ok    ${path}`);
  } catch (err) {
    fail(`${path} → ${err.message}`);
  }
}

async function checkRedirect([from, to]) {
  try {
    const res = await fetch(ORIGIN + from, { redirect: 'manual' });
    const location = res.headers.get('location') ?? '';

    if (res.status >= 300 && res.status < 400 && location.includes(to)) {
      console.log(`  ok    ${from} → ${to}`);
      return;
    }
    fail(`${from} → expected a redirect to ${to}, got ${res.status} ${location}`);
  } catch (err) {
    fail(`${from} → ${err.message}`);
  }
}

async function checkPreview(path) {
  try {
    const res = await fetch(ORIGIN + path, { redirect: 'follow' });
    const body = await res.text();

    if (!res.ok) return fail(`${path} → ${res.status}`);
    if (!/<meta[^>]+name="robots"[^>]+noindex/i.test(body)) {
      return fail(`${path} → served without a noindex tag`);
    }
    if (!body.includes('Website preview built by Joshua Kac')) {
      return fail(`${path} → missing the preview disclosure footer`);
    }
    console.log(`  ok    ${path} (noindex + disclosure)`);
  } catch (err) {
    fail(`${path} → ${err.message}`);
  }
}

async function checkRobots() {
  try {
    const body = await (await fetch(`${ORIGIN}/robots.txt`)).text();
    if (!body.includes('Disallow: /demo/')) {
      return fail('robots.txt does not disallow /demo/');
    }
    console.log('  ok    robots.txt disallows /demo/');

    const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
    if (sitemap.includes('/demo/')) {
      return fail('sitemap.xml lists a preview');
    }
    console.log('  ok    sitemap.xml lists no previews');
  } catch (err) {
    fail(`robots/sitemap → ${err.message}`);
  }
}

async function checkStraySubdomain() {
  try {
    const res = await fetch(`https://${strayHost}/`, { redirect: 'manual' });
    if (res.status === 404) {
      console.log(`  ok    ${strayHost} → 404`);
      return;
    }
    fail(`${strayHost} → expected 404, got ${res.status}. An unknown subdomain is serving something.`);
  } catch (err) {
    // No wildcard DNS yet, or no certificate. Worth saying, not worth failing.
    console.log(`  skip  ${strayHost} (${err.message})`);
  }
}

console.log(`Verifying ${ORIGIN}\n`);
console.log('Pages');
for (const page of pages) await checkPage(page);

console.log('\nFiles');
for (const file of files) await checkFile(file);

console.log('\nRedirects');
for (const redirect of redirects) await checkRedirect(redirect);

console.log('\nPreviews');
for (const preview of previews) await checkPreview(preview);
await checkRobots();
await checkStraySubdomain();

console.log(
  failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`
);
process.exit(failures === 0 ? 0 : 1);
