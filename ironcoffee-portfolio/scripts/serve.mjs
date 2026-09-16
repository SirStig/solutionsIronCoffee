/**
 * Static server that mirrors what .htaccess does in production.
 *
 * `vite preview` treats the build as a single-page app and rewrites every
 * unknown path to /index.html, so it serves the home page's markup for
 * /about, which then looks like a hydration bug that does not exist on the
 * real host. This resolves /about to /about/index.html the way Apache does,
 * so what you test is what ships.
 *
 * Run: npm run serve
 */
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(root, process.env.SERVE_DIR ?? 'build');
const PORT = Number(process.env.PORT ?? 4200);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

/** The permanent moves .htaccess performs, mirrored so `npm run verify` and
    manual testing behave the same locally as in production. */
const redirects = [
  [/^\/portfolio\/(.+)$/, (m) => `/work/${m[1]}`],
  [/^\/portfolio$/, () => '/work'],
];

/**
 * Whether the path is a file we can serve.
 *
 * The distinction between "not there" and "could not tell" is the whole point,
 * and this used to swallow both.
 *
 * ENOENT and ENOTDIR mean the file genuinely does not exist, which is a 404.
 * Every other errno means the lookup failed for a reason that has nothing to
 * do with the file: EMFILE when the process runs out of descriptors, EACCES,
 * EIO. Answering "no" to those is how a static server ends up reporting 404
 * for a file sitting right there on disk.
 *
 * That is not hypothetical. Running two UI audits at once, four browser
 * engines against two of these servers, produced a scatter of 404s at about
 * one in a hundred page loads, on a different page every run, none of them
 * reproducible afterwards. Two sessions each spent a while hunting for a
 * missing asset that was never missing.
 */
const exists = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch (err) {
    if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return false;
    throw err;
  }
};

/** Mirrors the .htaccess lookup order: exact file, then directory index. */
async function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '');
  const candidates = [
    path.join(DIR, clean),
    path.join(DIR, clean, 'index.html'),
    path.join(DIR, '404.html'),
  ];

  for (const candidate of candidates) {
    // Refuse anything that escapes the build directory.
    if (!candidate.startsWith(DIR)) continue;
    if (await exists(candidate)) {
      return { file: candidate, status: candidate.endsWith('404.html') ? 404 : 200 };
    }
  }

  return null;
}

createServer(async (req, res) => {
  const url = (req.url ?? '/').split('?')[0].replace(/\/+$/, '') || '/';

  for (const [pattern, target] of redirects) {
    const m = pattern.exec(url);
    if (m) {
      res.writeHead(301, { location: target(m) });
      res.end();
      return;
    }
  }

  let match;
  try {
    match = await resolve(req.url ?? '/');
  } catch (err) {
    /* Say so loudly rather than quietly serving a 404.
     *
     * A 503 with the errno in it is something a person can act on. A 404 for a
     * file that exists is a ghost, and it costs whoever finds it an hour. */
    console.error(`serve: ${url} lookup failed: ${err.code ?? err.message}`);
    res.writeHead(503, { 'content-type': 'text/plain' });
    res.end(`Lookup failed: ${err.code ?? 'unknown'}`);
    return;
  }

  if (!match) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const type = TYPES[path.extname(match.file)] ?? 'application/octet-stream';

  /* Compress what Apache compresses, and nothing else.
   *
   * This server exists so a build can be checked the way it will actually be
   * served, and for a long time it got this wrong: it sent every file
   * uncompressed while production runs mod_deflate. Measuring a sample site
   * over a throttled connection here therefore reported eighteen seconds to
   * largest contentful paint against roughly four in reality, and the gap was
   * entirely this function.
   *
   * woff2, AVIF and WebP are already compressed and are deliberately left
   * alone, which is also what the .htaccess does. */
  const compressible =
    /^(text\/|application\/(javascript|json|xml|rss\+xml|manifest\+json)|image\/svg)/.test(
      type
    );
  const wantsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');

  res.writeHead(match.status, {
    'content-type': type,
    'cache-control': match.file.endsWith('.html')
      ? 'no-cache'
      : 'public, max-age=31536000, immutable',
    ...(compressible && wantsGzip
      ? { 'content-encoding': 'gzip', vary: 'Accept-Encoding' }
      : {}),
  });

  const file = createReadStream(match.file);
  if (compressible && wantsGzip) file.pipe(createGzip()).pipe(res);
  else file.pipe(res);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Serving ${path.relative(root, DIR)} at http://127.0.0.1:${PORT}`);
});
