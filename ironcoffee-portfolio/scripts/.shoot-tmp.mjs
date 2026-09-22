// Full-page screenshots of demo pages, sliced into readable tiles.
// usage: node shoot.mjs <outdir> <width> <path> [<path>...]
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const [out, widthArg, ...paths] = process.argv.slice(2);
const width = Number(widthArg);
const ORIGIN = process.env.ORIGIN ?? 'http://127.0.0.1:4300';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height: width < 600 ? 844 : 900 },
  reducedMotion: 'reduce',
  deviceScaleFactor: 1,
});
for (const p of paths) {
  const page = await ctx.newPage();
  await page.goto(ORIGIN + p, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const buf = await page.screenshot({ fullPage: true });
  const meta = await sharp(buf).metadata();
  const tileH = width < 600 ? 1400 : 1800;
  const name = p.replace(/^\//, '').replace(/\//g, '_') || 'home';
  let i = 0;
  for (let y = 0; y < meta.height; y += tileH) {
    const h = Math.min(tileH, meta.height - y);
    await sharp(buf).extract({ left: 0, top: y, width: meta.width, height: h })
      .png().toFile(`${out}/${name}-${width}-${String(i++).padStart(2, '0')}.png`);
  }
  console.log(name, width, meta.height, i, 'tiles');
  await page.close();
}
await browser.close();
