/**
 * Builds responsive AVIF/WebP derivatives for everything in assets/images, and
 * web encodes of everything in assets/videos.
 *
 * Sources live in assets/ (never shipped). Image derivatives land in
 * public/img/ and a manifest with intrinsic dimensions + a blur placeholder is
 * written to src/generated/images.json so <Img> can render zero-layout-shift
 * markup. Videos land in public/video/ with their own manifest,
 * src/generated/videos.json, which <Video> reads.
 *
 * Run: npm run optimize:media
 */
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import sharp from 'sharp';

const run = promisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(root, 'assets/images');
const OUT_DIR = path.join(root, 'public/img');
const MANIFEST = path.join(root, 'src/generated/images.json');
const VIDEO_SRC_DIR = path.join(root, 'assets/videos');
const VIDEO_OUT_DIR = path.join(root, 'public/video');
const VIDEO_MANIFEST = path.join(root, 'src/generated/videos.json');
const CACHE = path.join(root, 'node_modules/.cache/optimize-media.json');

const WIDTHS = [420, 840, 1280, 1920];
const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 74, effort: 5 };

/* Two widths per codec. The project hero tops out at 68rem, so 1280 covers a
   phone at 3x and a desktop at 1x, and 1920 covers a desktop at 2x. A screen
   recording is mostly text, and text is the first thing a lower width ruins. */
const VIDEO_WIDTHS = [1280, 1920];
const VIDEO_MAX_FPS = 30;

const walk = async (dir, pattern) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, pattern)));
    else if (pattern.test(entry.name)) out.push(full);
  }
  return out;
};

/** Key media by their source-relative path minus extension: `projects/ourlee/home`. */
const keyFor = (dir, file) =>
  path.relative(dir, file).replace(/\\/g, '/').replace(/\.[^.]+$/, '');

const publicUrl = (abs) =>
  '/' + path.relative(path.join(root, 'public'), abs).replace(/\\/g, '/');

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 12);

const loadCache = async () => {
  try {
    return JSON.parse(await readFile(CACHE, 'utf8'));
  } catch {
    return {};
  }
};

/** Encodes one source image into every width and format, returning its manifest entry. */
async function buildImage(buf, key, outSub) {
  const meta = await sharp(buf, { failOn: 'none' }).rotate().metadata();
  const srcW = meta.width ?? WIDTHS[WIDTHS.length - 1];
  const srcH = meta.height ?? srcW;

  // Never upscale; always emit at least one width.
  const widths = WIDTHS.filter((w) => w <= srcW);
  if (widths.length === 0) widths.push(srcW);

  await mkdir(outSub, { recursive: true });

  const sources = [];
  for (const [format, opts] of [
    ['avif', AVIF],
    ['webp', WEBP],
  ]) {
    const srcset = [];
    for (const w of widths) {
      const abs = path.join(outSub, `${path.basename(key)}-${w}.${format}`);
      const out = await sharp(buf, { failOn: 'none' })
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        [format](opts)
        .toBuffer();
      await writeFile(abs, out);
      srcset.push({ url: publicUrl(abs), width: w, bytes: out.length });
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

  return {
    width: srcW,
    height: srcH,
    aspectRatio: +(srcW / srcH).toFixed(4),
    lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
    // Widest WebP doubles as the <img> src fallback for ancient browsers.
    fallback: sources[1].srcset[sources[1].srcset.length - 1].url,
    sources,
  };
}

const imageOnDisk = (entry) =>
  entry.sources.every((s) =>
    s.srcset.every((v) => existsSync(path.join(root, 'public', v.url)))
  );

/* --- Video ---------------------------------------------------------------- */

const encoders = async () => {
  try {
    const { stdout } = await run('ffmpeg', ['-hide_banner', '-encoders']);
    return {
      av1: /libsvtav1/.test(stdout),
      vp9: /libvpx-vp9/.test(stdout),
      h264: /libx264/.test(stdout),
    };
  } catch {
    return null;
  }
};

async function probe(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate:format=duration',
    '-of', 'json',
    file,
  ]);
  const info = JSON.parse(stdout);
  const s = info.streams[0];
  const [num, den] = s.r_frame_rate.split('/').map(Number);
  return {
    width: s.width,
    height: s.height,
    fps: den ? num / den : num,
    duration: +Number(info.format.duration).toFixed(2),
  };
}

/**
 * The codec ladder, smallest first, since <Video> takes the first one the
 * browser says it can play: AV1 in WebM for Chrome, Firefox and Safari on
 * hardware that decodes it, H.264 in MP4 for everything else. VP9 stands in
 * for AV1 only when this machine's ffmpeg has no SVT-AV1.
 *
 * No audio track in any of them. That is not only about bytes: a video with
 * no audio stream is one every browser agrees it may autoplay.
 */
const codecs = (enc) =>
  [
    enc.av1 && {
      ext: 'webm',
      type: 'video/webm; codecs="av01.0.08M.08"',
      args: ['-c:v', 'libsvtav1', '-preset', '5', '-crf', '38', '-g', '240',
        '-pix_fmt', 'yuv420p'],
    },
    !enc.av1 && enc.vp9 && {
      ext: 'webm',
      type: 'video/webm; codecs="vp9"',
      args: ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1',
        '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p'],
    },
    {
      ext: 'mp4',
      type: 'video/mp4; codecs="avc1.640028"',
      // faststart moves the index to the front of the file, so playback can
      // begin before the download has finished.
      args: ['-c:v', 'libx264', '-preset', 'veryslow', '-crf', '26',
        '-profile:v', 'high', '-level', '4.0', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart'],
    },
  ].filter(Boolean);

async function buildVideo(file, key, enc) {
  const info = await probe(file);
  const outSub = path.join(VIDEO_OUT_DIR, path.dirname(key));
  await mkdir(outSub, { recursive: true });

  const widths = VIDEO_WIDTHS.filter((w) => w <= info.width);
  if (widths.length === 0) widths.push(info.width);

  const filter = (w) =>
    [`scale=${w}:-2:flags=lanczos`, info.fps > VIDEO_MAX_FPS && `fps=${VIDEO_MAX_FPS}`]
      .filter(Boolean)
      .join(',');

  const sources = [];
  for (const codec of codecs(enc)) {
    const variants = [];
    for (const w of widths) {
      const abs = path.join(outSub, `${path.basename(key)}-${w}.${codec.ext}`);
      await run('ffmpeg', ['-y', '-v', 'error', '-i', file, '-an', '-sn', '-dn',
        '-map_metadata', '-1', '-vf', filter(w), ...codec.args, abs]);
      const { size } = await stat(abs);
      variants.push({ url: publicUrl(abs), width: w, bytes: size });
      process.stdout.write(`  encoded ${key} ${w}w ${codec.ext} (${(size / 1024).toFixed(0)}KB)\n`);
    }
    sources.push({ type: codec.type, variants });
  }

  /* The poster is the first frame, run through the image pipeline like any
     other picture. It is what paints first and what largest contentful paint
     measures, and it has to be the frame playback starts on, or the hero
     visibly jumps the moment the video takes over. */
  const frame = path.join(tmpdir(), `poster-${process.pid}.png`);
  await run('ffmpeg', ['-y', '-v', 'error', '-i', file, '-frames:v', '1', frame]);
  const posterKey = `video-posters/${key}`;
  const poster = await buildImage(
    await readFile(frame),
    posterKey,
    path.join(OUT_DIR, path.dirname(posterKey))
  );
  await rm(frame, { force: true });

  return {
    entry: {
      width: info.width,
      height: info.height,
      aspectRatio: +(info.width / info.height).toFixed(4),
      duration: info.duration,
      poster: posterKey,
      sources,
    },
    poster,
  };
}

const videoOnDisk = (entry) =>
  entry.sources.every((s) =>
    s.variants.every((v) => existsSync(path.join(root, 'public', v.url)))
  );

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`No source images at ${SRC_DIR}`);
    process.exit(1);
  }

  const files = (await walk(SRC_DIR, /\.(png|jpe?g|webp)$/i)).sort();
  const cache = await loadCache();
  const nextCache = {};
  const manifest = {};

  let built = 0;
  let reused = 0;
  let bytesOut = 0;
  let bytesIn = 0;

  for (const file of files) {
    const key = keyFor(SRC_DIR, file);
    const buf = await readFile(file);
    const hash = hashOf(buf);
    bytesIn += buf.length;

    // Skip work when the source is byte-identical to the last run and the
    // derivatives are still on disk.
    const cached = cache[key];
    if (cached?.hash === hash && imageOnDisk(cached.entry)) {
      manifest[key] = cached.entry;
      nextCache[key] = cached;
      reused += 1;
      for (const s of cached.entry.sources)
        for (const v of s.srcset) bytesOut += v.bytes ?? 0;
      continue;
    }

    const outSub = path.join(OUT_DIR, path.dirname(path.relative(SRC_DIR, file)));
    const entry = await buildImage(buf, key, outSub);
    for (const s of entry.sources) for (const v of s.srcset) bytesOut += v.bytes;

    manifest[key] = entry;
    nextCache[key] = { hash, entry };
    built += 1;
    process.stdout.write(`  built ${key}\n`);
  }

  /* Videos. A machine without ffmpeg still builds: anything already encoded is
     reused from the cache, and anything that is not is left out of the
     manifest, so its page shows the still image instead of breaking. */
  const videos = {};
  const videoFiles = existsSync(VIDEO_SRC_DIR)
    ? (await walk(VIDEO_SRC_DIR, /\.(mp4|mov|m4v|webm)$/i)).sort()
    : [];
  let enc;

  for (const file of videoFiles) {
    const key = keyFor(VIDEO_SRC_DIR, file);
    const hash = hashOf(await readFile(file));
    const cacheKey = `video:${key}`;
    const cached = cache[cacheKey];

    if (
      cached?.hash === hash &&
      videoOnDisk(cached.entry) &&
      imageOnDisk(cached.poster)
    ) {
      videos[key] = cached.entry;
      manifest[cached.entry.poster] = cached.poster;
      nextCache[cacheKey] = cached;
      continue;
    }

    enc ??= await encoders();
    if (!enc?.h264) {
      console.warn(`  skipped ${key}: needs ffmpeg with libx264 (brew install ffmpeg)`);
      continue;
    }

    const { entry, poster } = await buildVideo(file, key, enc);
    videos[key] = entry;
    manifest[entry.poster] = poster;
    nextCache[cacheKey] = { hash, entry, poster };
  }

  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  await writeFile(VIDEO_MANIFEST, JSON.stringify(videos, null, 2) + '\n');
  await mkdir(path.dirname(CACHE), { recursive: true });
  await writeFile(CACHE, JSON.stringify(nextCache));

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + 'MB';
  console.log(
    `\n${files.length} images: ${built} built, ${reused} cached.\n` +
      `${mb(bytesIn)} source → ${mb(bytesOut)} shipped ` +
      `(${(100 - (bytesOut / bytesIn) * 100).toFixed(0)}% smaller)`
  );
  if (videoFiles.length) {
    console.log(`${videoFiles.length} videos, ${Object.keys(videos).length} in the manifest.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
