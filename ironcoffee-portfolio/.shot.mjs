import { chromium } from 'playwright';
const [,, url, out, w='1440', scheme='light'] = process.argv;
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: +w, height: 900 }, reducedMotion: 'reduce', colorScheme: scheme });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0,0); });
await p.waitForTimeout(400);
await p.screenshot({ path: out, fullPage: true });
await b.close();
