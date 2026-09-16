# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Personal site for Joshua Kac at `solutions.ironcoffee.com`, covering work,
writing and contact. React 18 + TypeScript, built with Vite, **prerendered to static HTML**,
deployed to Dreamhost as plain files.

The app lives entirely in `ironcoffee-portfolio/`. Run every command from there.

## Commands

```bash
cd ironcoffee-portfolio

npm run dev             # Vite dev server (5173)
npm run build           # optimize media → client build → SSR build → prerender
npm run serve           # serve build/ the way Apache does, NOT vite preview
npm run deploy          # build, diff against Dreamhost, confirm, rsync over SSH, verify
npm test                # Vitest
npm run typecheck       # tsc --noEmit
npm run optimize:media  # rebuild public/img from assets/images (cached)
npm run generate:brand  # rebuild favicons + share cards from vector source
npm run capture:samples # screenshot the gallery samples (needs a build first)
npm run audit:ui        # drive the build across 2 engines x 8 viewports
```

`capture:samples` is deliberately not part of `npm run build`: it photographs
the finished build, so wiring it in would be circular. Re-run it only when a
template changes, and in this order:

```bash
npm run build && npm run capture:samples && npm run build
```

**Never verify a build with `vite preview`.** It serves `index.html` for every
unknown path, so `/about` renders the home page's markup and re-renders on the
client, which looks identical to a hydration bug that isn't real. Use
`npm run serve`.

## Architecture

**Entry points.** `src/main.tsx` hydrates the prerendered HTML (or mounts fresh
if there is none). `src/entry-server.tsx` renders a route to a string for the
prerenderer and re-exports the content modules so `scripts/prerender.mjs` never
has to guess at generated chunk filenames. `src/App.tsx` holds providers,
chrome and the route table.

**Routing.** React Router v7. Route components come from `src/routes.ts`, which
wraps `React.lazy` so a chunk can be resolved *before* hydration. See the
comment in that file; plain `lazy` makes React discard the prerendered DOM and
re-render the route on a warm cache.

**Content is data.** `src/content/site.ts` (identity, nav, socials),
`src/content/projects.ts` (every project; copy limits are documented at the top
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
into `helmet.priority`, not `helmet.meta`. Both are read.

Chunk hints follow the whole import graph, not just the page chunk. Rollup
hoists CSS imported by shared components into a shared chunk, and linking only
`chunk.css` left those pages with no stylesheet in their static HTML: unstyled
without JavaScript, and a large layout shift with it. `verifyStyles()` fails the
build if any page renders a CSS-module class no linked stylesheet defines, so
that cannot come back quietly.

**Demos.** A second product lives in `src/demos/`: complete sample websites for
small businesses, served at `/templates/<slug>` (public, indexed) and
`/demo/<slug>` (noindexed, expires after 60 days, also reachable at
`<slug>.ironcoffee.com`).

A demo is data. `src/demos/configs/<slug>.ts` exports one `DemoConfig`,
`src/demos/index.ts` imports it, and that is the whole checklist. Adding a
business must never require editing a template or a component; if a template
cannot express something, give it an option rather than special-casing a slug.
Five templates in `src/demos/templates/` compose shared blocks from
`src/demos/components/`, and `src/demos/Demo.module.css` is the entire demo
design system. Brand colors arrive as inline custom properties on the shell.

**The five samples must not look like five copies of one template.** Two things
enforce that and both are easy to undo by accident.

`brand.font` picks one of five real display faces, self-hosted and declared in
`tokens.css`: Fraunces, Playfair, Archivo, Outfit, Bricolage Grotesque. Only
headings use them, body copy is Inter everywhere, and a browser only downloads
a face an element actually renders in, so a sample costs exactly one woff2.
Each pairing also carries its own weight, tracking and casing, because Archivo
at 900 in caps reads as a contractor's truck and Playfair given the same
treatment reads as a ransom note. Pick by trade, not by taste.

And `SectionHead` defaults to left. Centered eyebrow over centered title over
centered sentence, ten times down a page, is the single loudest "bought a
template" signal there is. `align="center"` is for a heading meant to land as
an announcement: once per page, twice at the outside. `Booking` is the one
sample that centers throughout, on purpose, so that reads as a house style
rather than as the only trick the system knows.

`Bleed`, `PullQuote` and `Marquee` exist to break the rhythm. A page made
entirely of contained sections reads as one long column whatever is in it.

Demo pages are standalone: `App.tsx` drops the portfolio header and footer for
them, since a demo stands in for someone else's business. They also pin
themselves to a light palette regardless of the site theme.

Demo images are manifest keys, not paths. Put sources in
`assets/images/demos/<slug>/` and reference `demos/<slug>/hero`. Any key the
optimizer has not produced yet renders a branded gradient, so a config can be
written and reviewed before the photos exist.

A config marked `draft: true` is typechecked and validated by the tests but
never prerendered, so a half-written business cannot become a link that gets
sent by accident. Clear the flag when the content is actually gathered. Drafts
still render on the dev server, so `npm run dev` is how you look at one.

Two rules that exist because of how these get used. `business.phone` is
optional, since some businesses publish only a Facebook page and a booking
link, and every template degrades to the next best action rather than letting
anyone invent a number. And `placeholderPhotos: true` prints a line on the page
admitting the photography is generic, which is what you set on a preview for a
real business until they hand over their own pictures. Never generate a
storefront, an exterior or anything with signage for a real business: a generic
interior reads as a layout, a building reads as a claim about their premises.

**The gallery and the pricing page.** `/templates` illustrates itself with
real screenshots of the real samples, captured by `scripts/capture-samples.mjs`
into `assets/images/templates/` and referenced as ordinary manifest keys. It
used to show each sample's hero photograph, which meant a page selling websites
was illustrated with pictures of brisket and haircuts while every competitor's
showcase shows screens.

`/services` is ordered as an argument, and the order matters more than the
words: the Wix objection comes *before* the prices, because a reader who has
not been given a reason to stop comparing this to a thirty dollar subscription
will do exactly that the moment they hit a number. Two rules hold it together.
Never put a build price next to a monthly price, because $1,800 against $204 a
year loses on arithmetic every time and printing that comparison just teaches
the reader to run it; the care plan is the only thing that belongs beside a
subscription. And keep every line short. A pricing page that has to be read
twice has already lost.

**Checking the demos.** `npm run build` then `npm run serve`, never `vite
preview`. `npm run audit:ui` drives Chromium and WebKit across eight viewports
and checks five things: horizontal overflow, tap target size, duplicate ids and
dead in-page anchors, console and hydration errors, and text contrast against
its computed backdrop. It exits non-zero on any finding. Set
`PRERENDER_DRAFTS=1` on the build to include the drafts, since a page that is
never built is a page nobody ever checks.

Two things about that script are worth knowing before trusting or changing it.
The contrast check exists because a component that paints a light surface but
leaves `color` to inheritance renders white on white inside a dark section, and
every other check passes while it does. And it flattens alpha before measuring
anything: CSS Color 4 serializes as `color(srgb r g b / a)` with channels in
0..1 rather than 0..255, and a 7% brand tint on a white card is a pale pink
rather than the full brand color. Getting either of those wrong produced several
hundred contrast failures that were not real, twice.

Firefox is not covered. Playwright's bundled build will not launch on this
machine in any mode, so the script runs two engines rather than pretending to
run three. Chromium covers Chrome and Edge; WebKit covers Safari and every
browser on iOS.

Three separate things keep previews out of search: the `noindex, nofollow` tag
the page renders, the `Disallow: /demo/` in `public/robots.txt`, and the
prerenderer marking them `skipSitemap`.

**Images.** Sources live in `assets/` and are never served.
`scripts/optimize-media.mjs` emits AVIF + WebP at four widths plus an inline
blur placeholder into `public/img/`, and writes `src/generated/images.json`.
Both outputs are gitignored and regenerated on demand. Use
`<Img name="projects/ourlee/home" />`, which reads the manifest and renders a
`<picture>` with intrinsic dimensions. Portrait sources in a wider frame are
letterboxed rather than cropped.

**Styling.** CSS Modules over custom properties. `src/styles/tokens.css` is the
whole design system: palette, fluid type scale, spacing and motion, with light
as the base and dark overriding only what changes. `src/styles/base.css` is the
reset plus a few layout utilities. There is no CSS-in-JS and no component
library; do not reintroduce one.

**Theme.** An inline script in `index.html` resolves the theme and adds a `js`
class to `<html>` before first paint. Reveal-on-scroll is opt-in from that class
so content is never stuck at `opacity: 0` without JavaScript. Nothing in React
may branch its *markup* on the resolved theme. That is a hydration mismatch;
render both states and let CSS choose (see `ThemeToggle`).

## Conventions

- Copy is short on purpose. Taglines ≤ 70 characters, ≤ 5 highlights, ≤ 8
  technologies per project. Tests enforce this.
- Never put a number on the site that can go stale. No download or star counts.
  Version badges are fetched live and render nothing on failure.
- Analytics and Sentry load from an idle callback, production only, and are
  never load-bearing.
- Keep `public/` for real static files only. Generated media belongs in
  `public/img/`, which is gitignored.
- Never invent a price, an opening time or a claim for a real business in a demo
  config. Leave the field out, or write "Call for pricing". Getting a detail
  wrong in a preview is worse than omitting it.
- No em dashes anywhere, in copy or in comments. Use a comma, a colon or a full
  stop. American spelling throughout.

## Key Dependencies

React 18.2, React Router 7, Vite 6, TypeScript 5.9, `lucide-react` (icons),
`react-helmet-async` (head tags), `@emailjs/browser` (contact form, lazy),
`react-ga4`, `@sentry/react` (lazy). Build-only: `sharp`, `marked`, `shiki`.
