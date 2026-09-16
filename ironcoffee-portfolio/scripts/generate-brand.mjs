/**
 * Generates the favicon set and the Open Graph share image from vector source.
 *
 * The previous favicon.svg was a 1080px PNG base64'd inside an <svg> wrapper,
 * 836KB for a 16px icon. Everything here is real vector, rasterised only where
 * a format demands it.
 *
 * Run: npm run generate:brand
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(root, 'public');

const INK = '#0c0b0a';
const COPPER = '#f59e42';
const CREAM = '#f5f2ef';
const MUTED = '#a8a19b';

/**
 * The mark: the same copper dot used next to the wordmark in the header.
 * Legible at 16px, which rules out anything with lettering.
 */
const mark = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <circle cx="32" cy="32" r="16" fill="${COPPER}"/>
</svg>`;

/**
 * Share cards.
 *
 * One generic card for the whole site meant a prospect who was texted a link
 * to the pricing page saw the same "Joshua Kac, software engineer" panel as
 * somebody sent a blog post. That is the worst possible preview for the two
 * pages the business runs on, because the link is nearly always forwarded to
 * somebody who has never heard of me and decides in one glance whether to tap.
 *
 * So the commercial pages get their own. Same furniture, different words, and
 * a price on the one where a price is the whole argument.
 */
const card = ({ title, kicker, sub, foot }) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0b0a"/>
      <stop offset="100%" stop-color="#1a1512"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="5" fill="${COPPER}"/>
  <!-- Sits above the kicker, not behind it. The portfolio card puts the dot
       on the same baseline as its first line of type, which works there
       because that line starts 150px lower down. -->
  <circle cx="112" cy="116" r="16" fill="${COPPER}"/>

  <text x="96" y="200" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="600" fill="${COPPER}" letter-spacing="2">${kicker}</text>

  <text x="96" y="318" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="76" font-weight="700" fill="${CREAM}" letter-spacing="-2.5">${title}</text>

  <text x="96" y="392" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="500" fill="${CREAM}">${sub}</text>

  <text x="96" y="462" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="400" fill="${MUTED}">${foot}</text>

  <text x="96" y="556" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="24" font-weight="500" fill="#7a736e">solutions.ironcoffee.com</text>
</svg>`;

const pageCards = [
  [
    'og-services.png',
    card({
      kicker: 'SMALL BUSINESS WEBSITES',
      title: 'See it before you pay',
      sub: 'One page $500. Full site $1,800.',
      foot: 'Fixed price. No retainer. Yours the day it goes live.',
    }),
  ],
  [
    'og-templates.png',
    card({
      kicker: 'SAMPLES',
      title: 'Five real websites',
      sub: 'Restaurants, salons, trades, clinics, shops.',
      foot: 'Working pages you can open on a phone, not screenshots.',
    }),
  ],
];

const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0b0a"/>
      <stop offset="100%" stop-color="#1a1512"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="5" fill="${COPPER}"/>

  <circle cx="120" cy="182" r="16" fill="${COPPER}"/>

  <text x="96" y="330" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="82" font-weight="700" fill="${CREAM}" letter-spacing="-2.5">Joshua Kac</text>

  <text x="96" y="400" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="36" font-weight="500" fill="${COPPER}">Software engineer</text>

  <text x="96" y="470" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="400" fill="${MUTED}">Backend, mobile, web. Shipped end to end.</text>

  <text x="96" y="556" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="24" font-weight="500" fill="#7a736e">solutions.ironcoffee.com</text>
</svg>`;

async function main() {
  // A 64-unit viewBox scales cleanly to every raster size below.
  await writeFile(path.join(PUBLIC, 'favicon.svg'), mark(64));

  const source = Buffer.from(mark(512));

  const rasters = [
    ['favicon-96x96.png', 96],
    ['apple-touch-icon.png', 180],
    ['web-app-manifest-192x192.png', 192],
    ['web-app-manifest-512x512.png', 512],
  ];

  for (const [name, size] of rasters) {
    await sharp(source, { density: 384 })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLIC, name));
  }

  // .ico for legacy browsers and the address bar on older Windows.
  await sharp(source, { density: 384 })
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, 'favicon.ico'));

  // Rendered at 2x then downsampled so the type edges stay crisp, and
  // palettized because the image is a handful of flat colors.
  await sharp(Buffer.from(ogImage), { density: 144 })
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(PUBLIC, 'og-image.png'));

  for (const [name, svg] of pageCards) {
    await sharp(Buffer.from(svg), { density: 144 })
      .resize(1200, 630)
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(path.join(PUBLIC, name));
  }

  console.log(`Brand assets regenerated, including ${pageCards.length} page cards.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
