import { chromium } from 'playwright';
const [url, out, w, h, sel] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
const el = await p.$(sel);
if (el) await el.screenshot({ path: out }); else { console.log('NO MATCH', sel); await p.screenshot({path: out}); }
await b.close();
