import { chromium } from 'playwright';
import sharp from 'sharp';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
for (const [path, name] of [
  ['/templates/ridgeline-smokehouse', 'food'],
  ['/demo/test', 'retail'],
]) {
  await p.goto('http://localhost:4200' + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  const buf = await p.screenshot({ fullPage: true });
  // Downscale the full page so it fits in one readable frame.
  const meta = await sharp(buf).metadata();
  await sharp(buf).resize({ width: 620 }).jpeg({ quality: 78 }).toFile(`${process.argv[2]}/${name}-full.jpg`);
  console.log(name, meta.width + 'x' + meta.height);
}
await b.close();
