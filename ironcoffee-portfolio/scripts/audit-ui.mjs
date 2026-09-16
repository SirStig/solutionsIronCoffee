/**
 * Drives the built site across two engines and eight viewports, and reports
 * the five things that break a demo without anyone noticing.
 *
 * Needs a build and nothing else:
 *
 *   npm run build && npm run audit:ui
 *
 * Set PRERENDER_DRAFTS=1 on the build to include the draft configs, because a
 * page that is never built is a page nobody ever checks.
 *
 * Firefox is deliberately absent. Playwright's bundled build does not launch
 * on this machine, headless or headed, so claiming three engines would be a
 * lie. Chromium covers Chrome and Edge, WebKit covers Safari and every iOS
 * browser.
 */
import { chromium, webkit } from 'playwright';
import { spawn } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'http://127.0.0.1:4200';

/* The two on the ends matter more than the middle.
 *
 * 320 is the narrowest phone still in use and the first place a grid breaks.
 * 2560 is an ordinary external monitor, and it is where a layout that only
 * ever got looked at on a laptop falls apart: content stranded in one corner,
 * a card floating in an ocean of background, two things that never collided at
 * 1440 sitting on top of each other. */
const VIEWPORTS = [
  ['320', 320, 568],
  ['360', 360, 740],
  ['390', 390, 844],
  ['414', 414, 896],
  ['768', 768, 1024],
  ['1024', 1024, 768],
  ['1280', 1280, 800],
  ['1440', 1440, 900],
  ['1920', 1920, 1080],
  ['2560', 2560, 1400],
];

/* --- Color -----------------------------------------------------------------
   The CSS Color 4 `color(srgb r g b / a)` form carries channels in 0..1, NOT
   0..255. An earlier version of this script read them as bytes, turned every
   near-white into a near-black, and reported four hundred contrast failures
   that did not exist. */
function parse(css) {
  const srgb = css.match(
    /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?/
  );
  if (srgb) {
    return [+srgb[1], +srgb[2], +srgb[3], srgb[4] === undefined ? 1 : +srgb[4]];
  }
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  return [p[0] / 255, p[1] / 255, p[2] / 255, p[3] === undefined ? 1 : p[3]];
}

/* Source-over compositing, and the second half of the same lesson. A 7% brand
   tint on a white card is a very pale pink; read as an opaque color it is the
   full brand color, and every dark word on it reports as a failure. Layers
   have to be flattened before anything is measured. */
const over = (fg, bg) => [
  fg[0] * fg[3] + bg[0] * (1 - fg[3]),
  fg[1] * fg[3] + bg[1] * (1 - fg[3]),
  fg[2] * fg[3] + bg[2] * (1 - fg[3]),
  1,
];

function lum([r, g, b]) {
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/* --- Everything measured in the page, in one pass -------------------------- */
function collect(vw) {
  const out = { overflow: [], taps: [], dupIds: [], dead: [], text: [], overlap: [] };

  /* Overlapping siblings.
   *
   * Added after a booking card and a contact form ended up printed on top of
   * each other at wide widths, which every other check on this page passed
   * straight through: nothing overflowed, nothing was too small, the contrast
   * was fine, and the page was unusable.
   *
   * Only siblings, and only when neither contains the other, because overlap
   * between a parent and its child is just nesting. A deliberate overlap is
   * always positioned, so anything absolute, fixed or sticky is skipped, as is
   * anything the author pulled with a negative margin or a transform. */
  const overlaps = (a, b) =>
    a.left < b.right - 2 &&
    b.left < a.right - 2 &&
    a.top < b.bottom - 2 &&
    b.top < a.bottom - 2;

  for (const parent of document.querySelectorAll('body *')) {
    // Shapes inside an icon overlap by design, and `className` on an SVG node
    // is an SVGAnimatedString, so these also reported as "[object over
    // [object". Nothing inside an <svg> is laid out by CSS box rules.
    if (parent.closest('svg')) continue;
    const kids = [...parent.children].filter((el) => {
      const s = getComputedStyle(el);
      if (s.position !== 'static' && s.position !== 'relative') return false;
      if (s.transform !== 'none' || s.float !== 'none') return false;
      /* Inline boxes only.
       *
       * `getBoundingClientRect` on an inline element that wraps returns the
       * union of its line boxes, so two links in one sentence, on two lines,
       * report rectangles that cross even though nothing is painted on top of
       * anything. Overlap is a question about block layout. */
      if (s.display === 'inline' || s.display === 'inline-block') return false;
      if (s.display === 'none' || s.visibility === 'hidden') return false;
      const m = [s.marginTop, s.marginBottom, s.marginLeft, s.marginRight];
      if (m.some((v) => parseFloat(v) < -1)) return false;
      const r = el.getBoundingClientRect();
      return r.width > 8 && r.height > 8;
    });
    if (kids.length < 2 || kids.length > 40) continue;
    const ps = getComputedStyle(parent);
    // A grid or flex parent can legitimately stack children in one cell.
    if (ps.display.includes('grid') || ps.display.includes('flex')) continue;

    for (let i = 0; i < kids.length && out.overlap.length < 3; i += 1) {
      for (let j = i + 1; j < kids.length; j += 1) {
        const a = kids[i].getBoundingClientRect();
        const b = kids[j].getBoundingClientRect();
        if (!overlaps(a, b)) continue;
        out.overlap.push(
          `${kids[i].tagName.toLowerCase()}.${String(kids[i].className || '').split(' ')[0]}` +
            ` over ${kids[j].tagName.toLowerCase()}.${String(kids[j].className || '').split(' ')[0]}`
        );
        break;
      }
    }
  }

  if (document.documentElement.scrollWidth > vw + 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        const s = getComputedStyle(el);
        // A fixed bar or a deliberately scrollable box is not the page
        // overflowing; a table in its own overflow-x container is the
        // supported way to show something wider than a phone.
        if (s.position === 'fixed') continue;
        if (s.overflowX === 'auto' || s.overflowX === 'scroll') continue;
        out.overflow.push(
          `${el.tagName.toLowerCase()}.${String(el.className || '').split(' ')[0]} right=${Math.round(r.right)}`
        );
        if (out.overflow.length > 3) break;
      }
    }
  }

  for (const el of document.querySelectorAll(
    'a[href], button, input, select, textarea, [role="button"]'
  )) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // WCAG 2.5.8 exempts a target sitting inline inside a sentence.
    const inline = el.closest('p, li, figcaption, td, th, blockquote, h1, h2, h3');
    const cs = getComputedStyle(el);
    if (inline && cs.display === 'inline') continue;
    // A visually hidden radio behind a label is not a target; the label is,
    // and the label gets measured on its own.
    if (r.width <= 2 && r.height <= 2 && Number(cs.opacity) === 0) continue;
    if (r.width < 24 || r.height < 24) {
      out.taps.push(
        `${el.tagName.toLowerCase()}.${String(el.className || '').split(' ')[0]} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || '').trim().slice(0, 20)}"`
      );
      if (out.taps.length > 3) break;
    }
  }

  const seen = new Set();
  for (const el of document.querySelectorAll('[id]')) {
    if (seen.has(el.id)) out.dupIds.push(el.id);
    seen.add(el.id);
  }

  for (const a of document.querySelectorAll('a[href^="#"]')) {
    const id = a.getAttribute('href').slice(1);
    if (id && !document.getElementById(id)) out.dead.push(a.getAttribute('href'));
  }

  /* Text against its own painted backdrop. This check exists because a
     component that paints a light surface but leaves `color` to inheritance
     renders white on white inside a dark section, and every other check on
     this page passes while it does. */
  const seenPair = new Set();
  for (const el of document.querySelectorAll(
    'p, h1, h2, h3, h4, li, a, span, td, th, dt, dd, label, figcaption, blockquote, strong, em, small'
  )) {
    const text = (el.textContent || '').trim();
    if (!text || el.children.length) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.opacity === '0') continue;

    // Every painted layer from the element up, stopping at the first fully
    // opaque one because nothing below it can show through.
    const layers = [];
    let node = el;
    let onImage = false;
    const box = el.getBoundingClientRect();
    while (node) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') onImage = true;
      /* A hero photograph is an <img> positioned behind the copy, not a CSS
         background, so the check above never saw it and every headline on
         every sample reported as white on white. If an ancestor holds a
         positioned image that covers this text, there is no single backdrop
         color to measure and the answer is a judgement call, not a number. */
      if (!onImage) {
        /* Does this ancestor hold a picture that completely covers the text?
         *
         * Only the covering test, deliberately. The first version of this also
         * required the image to be positioned, which sounds right and excluded
         * every hero on the site: the <img> lives inside a <picture> inside a
         * positioned frame, so the image itself is static and the check never
         * fired. An image whose box fully contains a line of text is behind
         * that text, and there is no single backdrop color to measure. */
        for (const media of node.querySelectorAll('img, video')) {
          if (media.contains(el)) continue;
          const r = media.getBoundingClientRect();
          if (r.width < 24 || r.height < 24) continue;
          if (
            r.left <= box.left + 2 &&
            r.right >= box.right - 2 &&
            r.top <= box.top + 2 &&
            r.bottom >= box.bottom - 2
          ) {
            onImage = true;
            break;
          }
        }
      }
      const c = cs.backgroundColor;
      if (c && !/rgba\(0,\s*0,\s*0,\s*0\)|transparent/.test(c)) {
        layers.push(c);
        if (!/rgba|\/\s*0?\.\d/.test(c)) break;
      }
      node = node.parentElement;
    }

    const key = `${s.color}|${layers.join('>')}|${s.fontSize}|${s.fontWeight}|${onImage}`;
    if (seenPair.has(key)) continue;
    seenPair.add(key);
    out.text.push({
      fg: s.color,
      layers,
      onImage,
      size: parseFloat(s.fontSize),
      weight: s.fontWeight,
      sample: text.slice(0, 34),
      tag: el.tagName.toLowerCase(),
      cls: String(el.className || '').split(' ')[0],
    });
  }
  return out;
}

/* --- Run ------------------------------------------------------------------- */
const server = spawn('node', [resolve(root, 'scripts/serve.mjs')], { stdio: 'ignore' });
const stop = () => server.kill();
process.on('exit', stop);

let up = false;
for (let i = 0; i < 40 && !up; i++) {
  await new Promise((r) => setTimeout(r, 250));
  up = await fetch(`${ORIGIN}/sitemap.xml`).then((r) => r.ok).catch(() => false);
}
if (!up) {
  console.error(`No response from ${ORIGIN}. Is there a build in build/?`);
  stop();
  process.exit(1);
}

/* Walk the build rather than the sitemap.
 *
 * The sitemap deliberately leaves out previews and the retired-preview page,
 * which meant every page built for a real business was also the only kind of
 * page this never looked at. Anything with an index.html in build/ is
 * something a person can open, so it is something worth checking. */
async function walk(dir, base = '') {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'assets' || entry.name === 'img' || entry.name === 'fonts') {
      continue;
    }
    const url = `${base}/${entry.name}`;
    const full = resolve(dir, entry.name);
    const files = await readdir(full);
    if (files.includes('index.html')) out.push(url);
    out.push(...(await walk(full, url)));
  }
  return out;
}

const routes = ['/', ...(await walk(resolve(root, 'build')))].sort();

const problems = [];
const add = (kind, where, detail) => problems.push({ kind, where, detail });

for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const [vname, width, height] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    for (const route of routes) {
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e)));
      page.on('console', (m) => {
        if (m.type() === 'error') errs.push(m.text());
      });
      const where = `${name} ${vname} ${route}`;
      try {
        await page.goto(ORIGIN + route, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (e) {
        add('nav', where, String(e).slice(0, 120));
        await page.close();
        continue;
      }
      await page.waitForTimeout(250);

      const found = await page.evaluate(collect, width);
      found.overflow.forEach((d) => add('overflow', where, d));
      found.overlap.forEach((d) => add('overlap', where, d));
      found.taps.forEach((d) => add('tap-target', where, d));
      [...new Set(found.dupIds)].forEach((d) => add('duplicate-id', where, d));
      [...new Set(found.dead)].forEach((d) => add('dead-anchor', where, d));
      errs.forEach((d) => add('console', where, d.slice(0, 140)));

      for (const c of found.text) {
        // Text over a photograph or a gradient has no single backdrop color to
        // measure against. That is a judgement call, not a number.
        if (c.onImage) continue;
        const fg = parse(c.fg);
        if (!fg) continue;
        let bg = [1, 1, 1, 1];
        for (const layer of [...c.layers].reverse()) {
          const l = parse(layer);
          if (l) bg = over(l, bg);
        }
        const solid = fg[3] < 1 ? over(fg, bg) : fg;
        const ratio =
          (Math.max(lum(solid), lum(bg)) + 0.05) /
          (Math.min(lum(solid), lum(bg)) + 0.05);
        const large = c.size >= 24 || (c.size >= 18.66 && Number(c.weight) >= 700);
        const need = large ? 3 : 4.5;
        if (ratio < need) {
          add(
            'contrast',
            where,
            `${ratio.toFixed(2)}:1 (need ${need}) ${c.tag}.${c.cls} ${c.size}px "${c.sample}" | ${c.fg} over [${c.layers.join(' > ')}]`
          );
        }
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.error(`  ${name} done`);
}

stop();

const byKind = {};
for (const p of problems) (byKind[p.kind] ||= []).push(p);

console.log(
  `\n${routes.length} routes x 2 engines x ${VIEWPORTS.length} viewports = ${routes.length * 2 * VIEWPORTS.length} page loads`
);

if (!problems.length) {
  console.log('\nNo problems.');
} else {
  for (const [kind, list] of Object.entries(byKind)) {
    const distinct = [...new Set(list.map((p) => p.detail))];
    console.log(`\n=== ${kind}: ${list.length} (${distinct.length} distinct) ===`);
    const shown = new Set();
    for (const p of list) {
      if (shown.has(p.detail)) continue;
      shown.add(p.detail);
      console.log(`  ${p.where}\n    ${p.detail}`);
      if (shown.size >= 15) {
        console.log(`  ... and ${distinct.length - 15} more distinct`);
        break;
      }
    }
  }
}

process.exit(problems.length ? 1 : 0);
