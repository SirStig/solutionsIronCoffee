/**
 * Generates the favicon set and the Open Graph share image from vector source.
 *
 * The previous favicon.svg was a 1080px PNG base64'd inside an <svg> wrapper —
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
 * The mark: a copper bean on ink, with the seam cut out. Legible at 16px,
 * which rules out anything with lettering.
 */
const mark = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <g transform="rotate(-32 32 32)">
    <ellipse cx="32" cy="32" rx="15" ry="21" fill="${COPPER}"/>
    <path d="M32 12 C25 22, 25 42, 32 52 C39 42, 39 22, 32 12 Z" fill="${INK}" opacity="0.85"/>
  </g>
</svg>`;

const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0b0a"/>
      <stop offset="100%" stop-color="#1a1512"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="5" fill="${COPPER}"/>

  <g transform="translate(96, 150)">
    <g transform="scale(1.5)">
      <g transform="rotate(-32 32 32)">
        <ellipse cx="32" cy="32" rx="15" ry="21" fill="${COPPER}"/>
        <path d="M32 12 C25 22, 25 42, 32 52 C39 42, 39 22, 32 12 Z" fill="#0c0b0a" opacity="0.85"/>
      </g>
    </g>
  </g>

  <text x="96" y="330" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="82" font-weight="700" fill="${CREAM}" letter-spacing="-2.5">Joshua Kac</text>

  <text x="96" y="400" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="36" font-weight="500" fill="${COPPER}">Software engineer</text>

  <text x="96" y="470" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="400" fill="${MUTED}">Backend, mobile, web — shipped end to end.</text>

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
  // palettised because the image is a handful of flat colours.
  await sharp(Buffer.from(ogImage), { density: 144 })
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(PUBLIC, 'og-image.png'));

  console.log('Brand assets regenerated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
