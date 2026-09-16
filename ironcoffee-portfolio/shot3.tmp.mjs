import { chromium } from 'playwright';
const [url] = process.argv.slice(2);
const b = await chromium.launch();
for (const w of [320, 360, 390, 768, 1024, 1440, 2560]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  const r = await p.evaluate((vw) => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    vw,
  }), w);
  console.log(`${w}px -> scrollWidth ${r.scroll} vs client ${r.client} ${r.scroll > r.client + 1 ? 'OVERFLOW' : 'ok'}`);
  await p.close();
}
await b.close();
