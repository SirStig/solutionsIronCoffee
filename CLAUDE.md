# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Personal site for Joshua Kac at `solutions.ironcoffee.com` — work, writing, and
contact. React 18 + TypeScript, built with Vite, **prerendered to static HTML**,
deployed to Dreamhost as plain files.

The app lives entirely in `ironcoffee-portfolio/`. Run every command from there.

## Commands

```bash
cd ironcoffee-portfolio

npm run dev             # Vite dev server (5173)
npm run build           # optimize media → client build → SSR build → prerender
npm run serve           # serve build/ the way Apache does — NOT vite preview
npm test                # Vitest
npm run typecheck       # tsc --noEmit
npm run optimize:media  # rebuild public/img from assets/images (cached)
npm run generate:brand  # rebuild favicons + og-image.png from vector source
```

**Never verify a build with `vite preview`.** It serves `index.html` for every
unknown path, so `/about` renders the home page's markup and re-renders on the
client — which looks identical to a hydration bug that isn't real. Use
`npm run serve`.

## Architecture

**Entry points.** `src/main.tsx` hydrates the prerendered HTML (or mounts fresh
if there is none). `src/entry-server.tsx` renders a route to a string for the
prerenderer and re-exports the content modules so `scripts/prerender.mjs` never
has to guess at generated chunk filenames. `src/App.tsx` holds providers,
chrome and the route table.

**Routing.** React Router v7. Route components come from `src/routes.ts`, which
wraps `React.lazy` so a chunk can be resolved *before* hydration — see the
comment in that file; plain `lazy` makes React discard the prerendered DOM and
re-render the route on a warm cache.

**Content is data.** `src/content/site.ts` (identity, nav, socials),
`src/content/projects.ts` (every project — copy limits are documented at the top
of the file and enforced by tests), `src/content/blog/*.md` (one file per post).

**Markdown.** `plugins/vite-plugin-markdown.mjs` compiles `.md` to a plain
object at build time, running Marked and Shiki in Node so neither ships to the
browser. `./post.md?meta` yields everything except the rendered HTML; index
pages import that variant so post bodies stay out of the entry chunk.
`src/content/blog.ts` is metadata only; `src/content/blogPosts.ts` has the HTML
and is imported only by the lazy `BlogPost` route.

**Prerendering.** `scripts/prerender.mjs` renders every route to real HTML with
its own head tags, writes `build/<route>/index.html`, injects a modulepreload
for that route's chunk, and generates `sitemap.xml` and `rss.xml` from the same
data. Note that `<Helmet prioritizeSeoTags>` puts title/description/canonical/og
into `helmet.priority`, not `helmet.meta` — both are read.

**Images.** Sources live in `assets/` and are never served.
`scripts/optimize-media.mjs` emits AVIF + WebP at four widths plus an inline
blur placeholder into `public/img/`, and writes `src/generated/images.json`.
Both outputs are gitignored and regenerated on demand. Use
`<Img name="projects/ourlee/home" />` — it reads the manifest and renders a
`<picture>` with intrinsic dimensions. Portrait sources in a wider frame are
letterboxed rather than cropped.

**Styling.** CSS Modules over custom properties. `src/styles/tokens.css` is the
whole design system — palette, fluid type scale, spacing, motion — with light as
the base and dark overriding only what changes. `src/styles/base.css` is the
reset plus a few layout utilities. There is no CSS-in-JS and no component
library; do not reintroduce one.

**Theme.** An inline script in `index.html` resolves the theme and adds a `js`
class to `<html>` before first paint. Reveal-on-scroll is opt-in from that class
so content is never stuck at `opacity: 0` without JavaScript. Nothing in React
may branch its *markup* on the resolved theme — that is a hydration mismatch;
render both states and let CSS choose (see `ThemeToggle`).

## Conventions

- Copy is short on purpose. Taglines ≤ 70 characters, ≤ 5 highlights, ≤ 8
  technologies per project. Tests enforce this.
- Never put a number on the site that can go stale — no download or star counts.
  Version badges are fetched live and render nothing on failure.
- Analytics and Sentry load from an idle callback, production only, and are
  never load-bearing.
- Keep `public/` for real static files only. Generated media belongs in
  `public/img/`, which is gitignored.

## Key Dependencies

React 18.2, React Router 7, Vite 6, TypeScript 5.9, `lucide-react` (icons),
`react-helmet-async` (head tags), `@emailjs/browser` (contact form, lazy),
`react-ga4`, `@sentry/react` (lazy). Build-only: `sharp`, `marked`, `shiki`.
