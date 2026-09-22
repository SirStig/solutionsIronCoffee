import { chromium, webkit } from 'playwright';
const out = process.argv[2];
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await engine.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto('http://127.0.0.1:4300/templates/ridgeline-smokehouse', { waitUntil: 'networkidle' });
  await p.click('summary');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/menu-open-${name}.png` });
  const links = await p.$$eval('details a', (a) => a.map((x) => x.textContent.trim() + ' -> ' + x.getAttribute('href')));
  console.log(name, links);
  await p.click('details a >> nth=1');
  await p.waitForLoadState('networkidle');
  console.log(name, 'after click url', p.url());
  await b.close();
}
