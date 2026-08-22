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
];

/** Files that must exist. */
const files = ['/sitemap.xml', '/rss.xml', '/robots.txt', '/manifest.json'];

/** Old URLs that must still land somewhere sensible. */
const redirects = [
  ['/portfolio', '/work'],
  ['/services', '/about'],
];

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

console.log(`Verifying ${ORIGIN}\n`);
console.log('Pages');
for (const page of pages) await checkPage(page);

console.log('\nFiles');
for (const file of files) await checkFile(file);

console.log('\nRedirects');
for (const redirect of redirects) await checkRedirect(redirect);

console.log(
  failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`
);
process.exit(failures === 0 ? 0 : 1);
