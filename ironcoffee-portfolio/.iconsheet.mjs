import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

// Pull the path bodies straight out of the source so the sheet cannot drift.
const src = readFileSync('src/demos/components/icons.tsx', 'utf8');
const body = src.slice(src.indexOf('const paths'), src.indexOf('export type IconName'));
const entries = [...body.matchAll(/^  ([A-Za-z]+): \(\s*\n([\s\S]*?)\n  \),$/gm)].map((m) => [
  m[1],
  m[2].replace(/<\/?>/g, '').trim(),
]);

const cells = entries
  .map(
    ([name, svg]) => `<figure><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${svg}</svg><figcaption>${name}</figcaption></figure>`
  )
  .join('');

writeFileSync(
  process.argv[2] + '/icons.html',
  `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:28px;background:#fff;font:13px/1.3 -apple-system,system-ui,sans-serif;color:#14181c}
    .g{display:grid;grid-template-columns:repeat(8,1fr);gap:22px 14px}
    figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:8px}
    svg{width:40px;height:40px;color:#B3451E}
    figcaption{font-size:11px;color:#6b7480}
  </style><div class="g">${cells}</div>`
);
console.log(entries.length + ' icons');

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2 });
await p.goto('file://' + process.argv[2] + '/icons.html');
await p.waitForTimeout(400);
await p.screenshot({ path: process.argv[2] + '/icons.png', fullPage: true });
await b.close();
