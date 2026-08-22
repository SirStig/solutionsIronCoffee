# solutions.ironcoffee.com

Personal site for Joshua Kac — work, writing, and a way to get in touch.

React 18 + TypeScript, built with Vite, prerendered to static HTML, deployed to
Dreamhost as plain files.

Everything lives in `ironcoffee-portfolio/`.

```bash
cd ironcoffee-portfolio
npm install
npm run dev          # http://localhost:5173
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server. Regenerates images first if needed. |
| `npm run build` | Optimises media → client build → SSR build → prerender. Output in `build/`. |
| `npm run serve` | Serves `build/` the way Apache does. **Use this, not `vite preview`** — see below. |
| `npm test` | Vitest. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run optimize:media` | Rebuilds `public/img/` from `assets/images/`. Cached; only changed files are re-encoded. |
| `npm run generate:brand` | Rebuilds the favicon set and `og-image.png` from vector source. |

> `vite preview` treats the build as a single-page app and serves `index.html`
> for every unknown path, so `/about` renders the **home page's** markup and then
> re-renders on the client. That looks exactly like a hydration bug that does not
> exist in production. `npm run serve` resolves `/about` → `/about/index.html`
> the way `.htaccess` does.

## How it fits together

**Content is data.** Three files, and nothing else needs touching to publish:

- `src/content/site.ts` — name, bio, socials, nav.
- `src/content/projects.ts` — every project. Copy rules are documented at the
  top of the file; they exist to stop it bloating again.
- `src/content/blog/*.md` — one file per post. Drop it in and it appears in the
  index, the sitemap and the RSS feed.

**Markdown is compiled at build time.** `plugins/vite-plugin-markdown.mjs` turns
each `.md` into a plain object, running Marked and Shiki in Node so neither
reaches the browser. Importing `./post.md?meta` gives everything except the
rendered HTML — index pages use that variant so post bodies ship with the post's
own chunk instead of the entry bundle.

**Every route is prerendered.** `scripts/prerender.mjs` renders each URL to real
HTML with its own `<title>`, meta, canonical and JSON-LD, and writes
`build/work/beyond25/index.html` and so on. Crawlers and link unfurlers get full
content with no JavaScript; visitors get a painted page before hydration. It
also emits `sitemap.xml` and `rss.xml` from the same data, so they cannot drift
from what exists.

**Images are generated, not committed.** Sources live in `assets/` and are never
served. `scripts/optimize-media.mjs` emits AVIF + WebP at four widths plus an
inline blur placeholder into `public/img/`, and writes
`src/generated/images.json`. Both are gitignored and rebuilt on demand
(35.8 MB of source → 6.6 MB of derivatives, of which any one page loads a
fraction). `<Img name="projects/ourlee/home">` looks up that manifest and
renders a `<picture>` with correct intrinsic dimensions, so nothing shifts while
loading.

**Styling is CSS Modules over custom properties.** `src/styles/tokens.css` holds
the whole palette, type scale and spacing; light is the base and dark overrides
only what changes. There is no CSS-in-JS and no component library.

## Adding things

**A blog post** — create `src/content/blog/my-post.md`:

```markdown
---
title: "What I learned"
date: "2026-09-01"
tags: [swift, ios]
draft: false
---

Body goes here.
```

Drafts are visible in dev and excluded from production builds.

**A project** — add an entry to `src/content/projects.ts`, put its screenshots in
`assets/images/projects/<slug>/`, and run `npm run optimize:media`. Set
`categories` to control which hub pages it appears on, and `weight` to control
ordering. Tests will fail if an image key doesn't resolve or the copy limits are
exceeded.

**Photos of Joshua** — replace `assets/images/profile.JPEG` and re-run
`npm run optimize:media`. Anything roughly square at 1200px or wider works; it is
rendered as a circle at 112px on the home page and 88–112px on About, so the
crop wants the face centred.

## Deploying

`npm run build`, then upload the contents of `build/` to the Dreamhost web root.
`.htaccess` must go up too — enable hidden files in your SFTP client. It handles
HTTPS, the `www` redirect, `/portfolio/*` → `/work/*` moves from the old site,
clean URLs, caching (immutable for hashed assets, revalidate for HTML) and the
security headers.

`npm run verify` checks the live deployment afterwards.

## Environment

All optional — the site builds and runs without any of them.

| Variable | Used for |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | GA4. Loaded lazily, production only. |
| `VITE_SENTRY_DSN` | Sentry. Loaded lazily, production only. |
| `VITE_EMAILJS_PUBLIC_KEY` | Contact form. Without it the form is replaced by a mailto link. |
| `VITE_EMAILJS_SERVICE_ID` | " |
| `VITE_EMAILJS_TEMPLATE_ID` | " |
