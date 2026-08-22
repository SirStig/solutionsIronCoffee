/**
 * Builds responsive AVIF/WebP derivatives for everything in assets/images.
 *
 * Sources live in assets/ (never shipped). Derivatives land in public/img/ and a
 * manifest with intrinsic dimensions + a blur placeholder is written to
 * src/generated/images.json so <Img> can render zero-layout-shift markup.
 *
 * Run: npm run optimize:media
 */
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(root, 'assets/images');
const OUT_DIR = path.join(root, 'public/img');
const MANIFEST = path.join(root, 'src/generated/images.json');
const CACHE = path.join(root, 'node_modules/.cache/optimize-media.json');

const WIDTHS = [420, 840, 1280, 1920];
const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 74, effort: 5 };

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) out.push(full);
  }
  return out;
};

/** Key images by their source-relative path minus extension: `projects/ourlee/home`. */
const keyFor = (file) =>
  path.relative(SRC_DIR, file).replace(/\\/g, '/').replace(/\.[^.]+$/, '');

const loadCache = async () => {
  try {
    return JSON.parse(await readFile(CACHE, 'utf8'));
  } catch {
    return {};
  }
};

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`No source images at ${SRC_DIR}`);
    process.exit(1);
  }

  const files = (await walk(SRC_DIR)).sort();
  const cache = await loadCache();
  const nextCache = {};
  const manifest = {};

  let built = 0;
  let reused = 0;
  let bytesOut = 0;
  let bytesIn = 0;

  for (const file of files) {
    const key = keyFor(file);
    const buf = await readFile(file);
    const hash = createHash('sha1').update(buf).digest('hex').slice(0, 12);
    bytesIn += buf.length;

    // Skip work when the source is byte-identical to the last run and the
    // derivatives are still on disk.
    const cached = cache[key];
    const cacheValid =
      cached?.hash === hash &&
      cached.entry.sources.every((s) =>
        s.srcset.every((v) => existsSync(path.join(root, 'public', v.url)))
      );

    if (cacheValid) {
      manifest[key] = cached.entry;
      nextCache[key] = cached;
      reused += 1;
      for (const s of cached.entry.sources)
        for (const v of s.srcset) bytesOut += v.bytes ?? 0;
      continue;
    }

    const image = sharp(buf, { failOn: 'none' }).rotate();
    const meta = await image.metadata();
    const srcW = meta.width ?? WIDTHS[WIDTHS.length - 1];
    const srcH = meta.height ?? srcW;

    // Never upscale; always emit at least one width.
    const widths = WIDTHS.filter((w) => w <= srcW);
    if (widths.length === 0) widths.push(srcW);

    const outSub = path.join(OUT_DIR, path.dirname(path.relative(SRC_DIR, file)));
    await mkdir(outSub, { recursive: true });

    const sources = [];
    for (const [format, opts] of [
      ['avif', AVIF],
      ['webp', WEBP],
    ]) {
      const srcset = [];
      for (const w of widths) {
        const name = `${path.basename(key)}-${w}.${format}`;
        const abs = path.join(outSub, name);
        const out = await sharp(buf, { failOn: 'none' })
          .rotate()
          .resize({ width: w, withoutEnlargement: true })
          [format](opts)
          .toBuffer();
        await writeFile(abs, out);
        bytesOut += out.length;
        srcset.push({
          url: '/' + path.relative(path.join(root, 'public'), abs).replace(/\\/g, '/'),
          width: w,
          bytes: out.length,
        });
      }
      sources.push({ type: `image/${format}`, srcset });
    }

    // 20px-wide blurred base64 stand-in, inlined to kill the flash of empty box.
    const lqipBuf = await sharp(buf, { failOn: 'none' })
      .rotate()
      .resize({ width: 20 })
      .blur(1.4)
      .webp({ quality: 32 })
      .toBuffer();

    const entry = {
      width: srcW,
      height: srcH,
      aspectRatio: +(srcW / srcH).toFixed(4),
      lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
      // Widest WebP doubles as the <img> src fallback for ancient browsers.
      fallback: sources[1].srcset[sources[1].srcset.length - 1].url,
      sources,
    };

    manifest[key] = entry;
    nextCache[key] = { hash, entry };
    built += 1;
    process.stdout.write(`  built ${key} (${widths.join('/')})\n`);
  }

  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  await mkdir(path.dirname(CACHE), { recursive: true });
  await writeFile(CACHE, JSON.stringify(nextCache));

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + 'MB';
  console.log(
    `\n${files.length} images — ${built} built, ${reused} cached.\n` +
      `${mb(bytesIn)} source → ${mb(bytesOut)} shipped ` +
      `(${(100 - (bytesOut / bytesIn) * 100).toFixed(0)}% smaller)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
