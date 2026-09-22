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
npm run audit:ui        # drive the build across 2 engines x 10 viewports
npm run demos           # list every demo site and its URL
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

**A preview for a real business carries both, and the split is deliberate.**
A key written `art:<scene>` resolves to an original illustration in
`src/demos/components/artwork.tsx` instead of a photograph. Photographs take
the hero and the gallery; one drawing sits beside the story in the about block.

This used to be drawings only, on the argument that an interior which is not
their interior is a small lie an owner spots instantly. That argument is right
about the hero of a *place* and wrong about everything else, and following it
all the way produced five previews with no photography on them at all, which
reads as a wireframe rather than as a website. The fix is not to stop
disclosing, it is to disclose and then show something worth looking at:
`placeholderPhotos: true` puts a line on the page saying the photographs are of
the trade rather than of their place. Never a storefront, an exterior or
anything with signage: a generic interior reads as a layout, a building reads
as a claim about their premises.

The drawing in the about block is what keeps five previews from reading as five
stock sets, and it is the one slot where a photograph would be claiming to be
somewhere it is not. The gradient fallback is honest about having no picture
and says nothing else, so it is a placeholder, never a design.

Scenes live in `components/scenes/<trade>.tsx`, are drawn on a 1200x900 grid,
and paint with five CSS variables rather than literal colors, so one drawing
serves an olive feed store and a wine-red bottle shop. `.artFill` declares the
daylight colorway and `.artDark` the light-on-deep one; anywhere copy sits over
the media the dark version is used and the scrim drops to almost nothing,
because a scrim heavy enough to rescue white text from a bright photograph
flattens an illustration into a silhouette.

Three things that are easy to get wrong. A hero band is nearer 3:1 than 4:3, so
`slice` shows roughly y 250 to 650 of the artboard and a subject drawn outside
that stripe is not in the picture. Every scene carries its own alt sentence,
because the only alt text a template can write on its own is "photo 3", which
is both uninformative and wrong about the medium. And ids inside a scene are
namespaced with `useId`, since a gallery renders four scenes into one document
and the UI audit fails the build on a duplicate id, rightly.

`brand.motif` names a tile in `components/motifs.tsx` that repeats behind the
deep bands. It exists because the statement band runs at about 4:1 and cropping
a 4:3 scene to that gives you a detail of itself: the lawn sample showed the
middle nine inches of a mower. That band never wanted a picture, it wanted a
surface.

Templates ask `pictureKind(config)` rather than assuming, and it answers with
four states: `drawn`, `mixed`, `placeholder` or `own`. The trades template used
to print "Photographed the day we finished" over a set of drawings, which is
exactly the kind of wrong detail that costs a sale: an owner who catches the
page describing its own pictures inaccurately has no reason to believe the
opening times. It had the same bug again in the other direction the moment
previews carried stock, which is why the two-state version is gone.

Pass a narrower list to ask about part of the page: the trades gallery heading
is about those pictures, so it asks `pictureKind(config, config.gallery)` and
does not describe a drawing three sections further down. A preview that mixes
must set `placeholderPhotos`, and a test enforces it, because that flag is the
only thing that gives the disclosure a true sentence to print.

A config marked `draft: true` is typechecked and validated by the tests but
never prerendered, so a half-written business cannot become a link that gets
sent by accident. Clear the flag when the content is actually gathered. Drafts
still render on the dev server, so `npm run dev` is how you look at one.

**Not prerendering a draft is not the same as it being unreachable, and for a
while this repo confused the two.** The prerenderer correctly skipped drafts,
so `/demo/jills-feed` had no file and Apache answered 404. But the 404 body is
the app shell: React hydrated over it, the client router matched the route, and
`getDemo` handed back the draft config from the bundle. The result was a
complete, unverified preview of a real business, live at a URL anybody could
send, under a status code claiming it was gone. `curl -o /dev/null -w
"%{http_code}"` reported 404 and the page rendered perfectly in a browser.

So the gate lives in `getDemo`, which is the only way a route reaches a config,
and two tests hold it there. The lesson generalizes: **a status code is not a
verification.** Open the page.

The gate reads `import.meta.env.MODE === 'development'`, not `DEV`. Vitest sets
`DEV` to true, so using it opens the gate during tests and the regression test
for this hole passes by rendering the thing it forbids.

Two rules that exist because of how these get used. `business.phone` is
optional, since some businesses publish only a Facebook page and a booking
link, and every template degrades to the next best action rather than letting
anyone invent a number. And `placeholderPhotos: true` prints a line on the page
admitting the photography is generic, which is what you set on a preview for a
real business until they hand over their own pictures.

**A preview has to carry proof, and the honesty rules are not an excuse not
to.** Every slot that makes a page persuasive, the stats band, the quotes, the
team grid, the extra pages, is conditional in the templates: no data, no
section. So "never invent a stat for a real business" got implemented as
*leave the section out*, and five previews came out as the same eight sections
in the same order with twice the white space, which is not a page anybody pays
a few hundred dollars for. The rule is right. The conclusion drawn from it was
wrong. Fill the slot with something true instead.

The strongest of those is a review the business already has in public.
`DemoTestimonial.source` is what separates the two things that share that
shape: without it the quote is written copy, fine on a fictional sample and
forbidden on a preview; with it the quote is theirs, copied word for word, with
the platform printed on the page so anyone can go and check. Two tests hold the
line in both directions, and `name` is optional because several aggregators
publish the words and drop the name. **Never cite a platform you have not
confirmed.** Inventing the citation is the same failure as inventing the quote
and it is harder to spot, so a review whose source cannot be established stays
in a comment in the config until the call settles it. Of the five previews, two
carry reviews, two carry a note naming the unattributed text, and one has
nothing to quote at all, which is also why they no longer look alike.

**Motion is CSS only and it now runs everywhere.** `components/motion.tsx` and
the `@supports (animation-timeline: view())` blocks in `Demo.module.css` were
written for the venue sample and imported by exactly one file, so every other
template, which is every preview, had no motion of any kind. `SectionHead`
lifts in on every template now, and `.stagger` on a grid brings its children in
one after another rather than as one slab. Verified running in both Chromium
and WebKit, so Safari and iOS included. All of it is additive: delete it and
the pages still read.

A screenshot of one of these pages needs `reducedMotion: 'reduce'`, or
everything below the fold photographs at `opacity: 0` and the page looks
broken. Scroll it first as well, or the lazy images below the fold stay as blur
placeholders. Neither is a bug in the page and both look exactly like one.

**`<OpenNow>` is the cheapest thing on the page and the one owners react to.**
It works out open or closed from the same hours table printed below it, so the
two can never disagree, and it renders nothing at all for a day it cannot
parse: "By appointment", "Call or message" and "Emergency calls only" are real
values in these configs and none of them is a time. Guessing from a string the
parser did not understand would put a false claim about a real business on a
page with that business's name at the top. It reads the clock in an effect, not
during render, for the same reason `<HoursList>` does.

**Finding them again.** `npm run demos` prints every sample and every preview
with its URL, its extra pages, its subdomain and how many days a preview has
left. `--urls` gives bare URLs to pipe somewhere, `--json` gives the lot,
`--local` points them at the dev server. It reads the configs through esbuild
rather than the SSR bundle, so it needs no build and answers instantly.

It is a terminal command and not a page on the site on purpose. A public index
of every preview would undo all three things that keep them out of search at
once, and these are pages built for one business to look at rather than a
directory.

**The gallery and the pricing page.** `/templates` illustrates itself with
real screenshots of the real samples, captured by `scripts/capture-samples.mjs`
into `assets/images/templates/` and referenced as ordinary manifest keys. It
used to show each sample's hero photograph, which meant a page selling websites
was illustrated with pictures of brisket and haircuts while every competitor's
showcase shows screens.

`/services` puts the price a visitor will actually pay where they cannot miss
it. The hero states the entry tier in one bold line, the tiers come straight
after, and the $200 tier carries the highlight and the biggest number, while
the higher tiers print smaller. It used to lead with a Wix comparison and put
the highlight on the $1,800 card, so a skimming reader met that number first,
took it for the price, and left before reaching the one meant for them. The
Wix comparison now follows the samples, at four rows that stack on a phone
rather than a table that scrolls sideways, since nobody swipes a table to
read the column making the case. Never put the $1,800
build price next to a monthly price, because it loses to $204 a year on
arithmetic; the entry tier costs about a year of a builder, which is a
comparison worth inviting. And keep every line short. A pricing page that has
to be read twice has already lost.

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

A clean audit means something now, which it did not before. `scripts/serve.mjs`
answered "file not found" to every error `stat()` could raise, so under load,
when the process ran out of file descriptors, it served 404s for files sitting
on disk. Two audits at once produced about one phantom 404 per hundred page
loads, on a different page every run and never reproducible afterwards. It now
distinguishes ENOENT from everything else and returns 503 with the errno for
the rest. **If the audit reports a 404 you cannot reproduce, look at the load
on the machine before you look at the page.**

`npm run audit:ui` binds port 4200. Two of them at once, or one alongside
`npm run serve`, and the loser silently uses the winner's server until the
winner exits and kills it: the survivor then reports several hundred `nav`
findings that look like a site which broke everywhere at once. Set `PORT` to
run a second one. The script now says so rather than letting you hunt for the
layout bug that does not exist.

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
