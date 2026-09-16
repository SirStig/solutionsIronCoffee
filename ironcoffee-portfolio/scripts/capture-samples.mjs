/**
 * Screenshots of the gallery samples, for the gallery.
 *
 * The cards on /templates used to show each sample's hero photograph, which
 * meant a page advertising websites was illustrated with pictures of brisket
 * and haircuts. A prospect comparing this against Squarespace's showcase saw
 * stock photography where the competition shows actual screens, and drew the
 * obvious conclusion.
 *
 * So: drive a real browser over the real build and photograph the real pages.
 * Output lands in `assets/images/templates/`, which means the normal media
 * optimizer picks it up and the gallery references `templates/<slug>-desktop`
 * like any other manifest key.
 *
 * Deliberately NOT part of `npm run build`. It needs a finished build to
 * photograph, so wiring it into the build is circular, and a screenshot only
 * changes when a template changes.
 *
 *   npm run build            # 1. build (gallery falls back to gradients)
 *   npm run capture:samples  # 2. photograph it
 *   npm run build            # 3. build again, now with the screenshots
 */
import { chromium } from 'playwright';
import { mkdir, readdir, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(root, 'assets/images/templates');
const ORIGIN = 'http://127.0.0.1:4200';

/* The slug list comes from the build rather than from the TypeScript config,
   because the SSR bundle is cleaned up after prerendering and this script has
   to work against whatever is actually in build/ anyway. A sample that did not
   get built is a sample there is nothing to photograph. */
const slugs = (
  await readdir(resolve(root, 'build/templates'), { withFileTypes: true })
).filter((e) => e.isDirectory()).map((e) => e.name);

if (!slugs.length) {
  console.error('No samples in build/templates. Run `npm run build` first.');
  process.exit(1);
}

const server = spawn('node', [resolve(root, 'scripts/serve.mjs')], {
  stdio: 'ignore',
});
const stop = () => server.kill();
process.on('exit', stop);

// Give the static server a moment, then confirm it is actually answering
// before taking a browser to it: a screenshot of a connection error is still
// a valid PNG and would sail through the rest of this script.
let up = false;
for (let i = 0; i < 40 && !up; i++) {
  await new Promise((r) => setTimeout(r, 250));
  up = await fetch(`${ORIGIN}/templates/`)
    .then((r) => r.ok)
    .catch(() => false);
}
if (!up) {
  console.error(`No response from ${ORIGIN}. Is there a build in build/?`);
  stop();
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const slug of slugs) {
  for (const [kind, viewport] of [
    ['desktop', { width: 1440, height: 900 }],
    ['phone', { width: 390, height: 780 }],
  ]) {
    const ctx = await browser.newContext({
      viewport,
      /* 1x, not 2x. The desktop shot is displayed at roughly 660 CSS pixels
         wide in the gallery, so a 1440 wide capture is already better than
         2x for it, and the media optimizer resamples to four widths from
         here anyway. At 2x these were 3 MB each and nineteen megabytes of
         screenshots went into the repository for no visible gain. */
      deviceScaleFactor: 1,
      // The sample-site banner is scaffolding for the gallery, not part of
      // what the business would ship, and it is the first thing in the frame.
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/templates/${slug}/`, {
      waitUntil: 'networkidle',
    });
    await page.addStyleTag({
      content: '[class*="banner"]{display:none!important}',
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${slug}-${kind}.png` });
    await ctx.close();
    console.log(`  ${slug}-${kind}`);
  }
}

await browser.close();
stop();
console.log(`\nCaptured ${slugs.length} samples into assets/images/templates/`);
console.log('Run `npm run build` again to fold them into the manifest.');
