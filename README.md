# solutions.ironcoffee.com

Personal site for Joshua Kac: work, writing, and a way to get in touch.

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
| `npm run serve` | Serves `build/` the way Apache does. **Use this, not `vite preview`**. See below. |
| `npm run deploy` | Builds, then rsyncs `build/` to Dreamhost over SSH. Previews the diff first. |
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

- `src/content/site.ts` holds name, bio, socials and nav.
- `src/content/projects.ts` holds every project. Copy rules are documented at the
  top of the file; they exist to stop it bloating again.
- `src/content/blog/*.md` is one file per post. Drop it in and it appears in the
  index, the sitemap and the RSS feed.

**Markdown is compiled at build time.** `plugins/vite-plugin-markdown.mjs` turns
each `.md` into a plain object, running Marked and Shiki in Node so neither
reaches the browser. Importing `./post.md?meta` gives everything except the
rendered HTML, and index pages use that variant so post bodies ship with the post's
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

**A blog post.** Create `src/content/blog/my-post.md`:

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

**A project.** Add an entry to `src/content/projects.ts`, put its screenshots in
`assets/images/projects/<slug>/`, and run `npm run optimize:media`. Set
`categories` to control which hub pages it appears on, and `weight` to control
ordering. Tests will fail if an image key doesn't resolve or the copy limits are
exceeded.

**A client demo.** Write `ironcoffee-portfolio/src/demos/configs/<slug>.ts`,
import it in `src/demos/index.ts`, drop photos in
`assets/images/demos/<slug>/`, and build. That is the whole job; no component
should need touching. The page appears at `/demo/<slug>`, is noindexed, and
retires itself 60 days after `createdAt`.

Mark it `draft: true` while you are still gathering hours and photos. A draft
is kept under test but is never built, so there is no page and no link to send
by mistake. `src/demos/configs/jills-feed.ts` is one, and it lists exactly what
is still missing.

To serve it at `<slug>.ironcoffee.com`, add the subdomain in the Dreamhost panel
pointing at the same directory and issue its certificate. `.htaccess` already
maps any non-reserved subdomain to `/demo/<label>/` and returns 404 for a
subdomain with no demo behind it, so an unknown name never falls through to the
portfolio.

Photos are optional to start with. Any image key the optimizer has not seen
renders a gradient built from the business's own brand colors, so the config
can be written and reviewed first.

**Photos of Joshua.** Replace `assets/images/profile.JPEG` and re-run
`npm run optimize:media`. Anything roughly square at 1200px or wider works; it is
rendered as a circle at 112px on the home page and 88–112px on About, so the
crop wants the face centered.

## Deploying

```bash
cp .env.deploy.example .env.deploy   # once: SSH user, host, domain directory
npm run deploy
```

That builds, compares `build/` against the server, prints what it would upload
and delete, asks for a yes, uploads, and then runs `npm run verify` against the
live site. `.env.deploy` is gitignored.

| Flag | |
| --- | --- |
| `npm run deploy -- -n` | Dry run. Shows the diff and changes nothing. |
| `npm run deploy -- --skip-build` | Ship `build/` as it stands. |
| `npm run deploy -- --yes` | No confirmation prompt. |
| `npm run deploy -- --no-prune` | Leave files the build no longer produces. |

The upload is an rsync, so only changed files go over the wire and `.htaccess`
goes up with everything else. `--delete` is on by default, which is what stops
old hashed assets and removed routes from accumulating. Paths the server owns
are excluded from both the upload and the prune: `.well-known/acme-challenge/`
(cert renewal), `cgi-bin/`, `stats/`, `logs/`, `.htpasswd`. The script refuses
to run if `DEPLOY_PATH` resolves to the home directory, and warns before a
prune large enough to suggest the path is wrong.

Password logins work, and only ask once per run because the SSH connection is
shared. `ssh-copy-id dh_user@host` stops the asking.

macOS ships openrsync rather than GNU rsync. It normally talks to the server
fine; if a transfer dies with a protocol tag error, `brew install rsync` and the
script picks the newer binary up on its own. `DEPLOY_RSYNC` forces a specific
one.

Uploading by hand still works: copy the contents of `build/` to the web root
with hidden files enabled, since `.htaccess` carries HTTPS, the `www` redirect,
the `/portfolio/*` → `/work/*` moves from the old site, clean URLs, caching and
the security headers. `npm run verify` checks a deployment either way.

## Environment

All optional. The site builds and runs without any of them.

| Variable | Used for |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | GA4. Loaded lazily, production only. |
| `VITE_SENTRY_DSN` | Sentry. Loaded lazily, production only. |
| `VITE_EMAILJS_PUBLIC_KEY` | Contact form. Without it the form is replaced by a mailto link. |
| `VITE_EMAILJS_SERVICE_ID` | " |
| `VITE_EMAILJS_TEMPLATE_ID` | " |
