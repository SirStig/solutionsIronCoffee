/**
 * The demo registry.
 *
 * Every config is imported here and nowhere else. `scripts/prerender.mjs` reads
 * these same exports through the SSR bundle, so the pages that get built and
 * the pages that render can never disagree about which demos exist.
 *
 * To add a business: write `configs/<slug>.ts`, import it below, add it to the
 * array. That is the entire checklist.
 */
import type { DemoConfig } from './types';

import barrBear from './configs/barr-bear';
import copperAndComb from './configs/copper-and-comb';
import familyLawnCare from './configs/family-lawn-care';
import franktownDental from './configs/franktown-dental';
import hairGenius from './configs/hair-genius';
import jillsFeed from './configs/jills-feed';
import mkLiquors from './configs/mk-liquors';
import ninebarkGarden from './configs/ninebark-garden';
import ridgelineSmokehouse from './configs/ridgeline-smokehouse';
import summitRidge from './configs/summit-ridge';
import wrenHollow from './configs/wren-hollow';
import test from './configs/test';

const all: DemoConfig[] = [
  wrenHollow,
  ridgelineSmokehouse,
  copperAndComb,
  summitRidge,
  franktownDental,
  ninebarkGarden,
  test,
  jillsFeed,
  barrBear,
  hairGenius,
  familyLawnCare,
  mkLiquors,
];

export const demos: Record<string, DemoConfig> = Object.fromEntries(
  all.map((demo) => [demo.slug, demo])
);

/**
 * Whether a draft config is reachable at all.
 *
 * True while developing, and in the one build that exists so the browser audit
 * can see the drafts. False in every build that gets deployed.
 *
 * Set PRERENDER_DRAFTS=1 to build the drafts too. That is only ever used to
 * point the browser audit at them, since a page that is never built is a page
 * that never gets checked for overflow or contrast. Unset, which is every real
 * build, drafts stay out of the output entirely.
 *
 * The mode check is what keeps `npm run dev` useful: drafts are meant to render
 * there, because looking at one is the whole reason to write it before the
 * details are confirmed.
 *
 * `MODE`, not `DEV`. Vitest sets `DEV` to true, so using it here opened the
 * gate during tests and the regression test for this very hole passed by
 * rendering the thing it was meant to forbid. `MODE` is 'development' only
 * under the dev server: 'test' under Vitest, 'production' in a real build.
 */
const INCLUDE_DRAFTS =
  // eslint-disable-next-line no-undef
  (typeof process !== 'undefined' && process.env?.PRERENDER_DRAFTS === '1') ||
  import.meta.env?.MODE === 'development';

/** Fictional businesses in the public gallery. Indexed, permanent. */
export const showcases: DemoConfig[] = all.filter((d) => d.showcase);

/**
 * Real previews built for a named owner. Noindexed, expiring, and built.
 *
 * Drafts are excluded deliberately. A half-written config should be under
 * version control and under test, but it must not become a URL that can be
 * pasted into a message to the business it names.
 */
export const previews: DemoConfig[] = all.filter(
  (d) => !d.showcase && (!d.draft || INCLUDE_DRAFTS)
);

/** Configs still being filled in. In the repo, never reachable once deployed. */
export const drafts: DemoConfig[] = all.filter((d) => d.draft);

/**
 * A demo by slug, or nothing.
 *
 * The draft check lives here rather than in the page, and it is the whole
 * point of this function.
 *
 * Leaving it out was a real hole, and it hid well. The prerenderer correctly
 * refused to build a draft, so `/demo/jills-feed` had no file and the server
 * answered 404. But the 404 body is the app shell, React hydrated over it, the
 * client router matched the route, and this function cheerfully handed back
 * the draft config from the bundle: a complete, unverified preview of a real
 * business, rendered under a 404 status, at a URL anybody could send.
 *
 * Checking the status code says the page is gone. Opening it in a browser says
 * otherwise. Only one of those is the truth.
 */
export const getDemo = (slug: string): DemoConfig | undefined => {
  const demo = demos[slug];
  if (!demo) return undefined;
  if (demo.draft && !INCLUDE_DRAFTS) return undefined;
  return demo;
};

/** Ignores the draft gate. For tests and tooling, never for a route. */
export const getAnyDemo = (slug: string): DemoConfig | undefined => demos[slug];

/** Outreach previews go stale after this long. Showcases never do. */
export const PREVIEW_DAYS = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days a preview has left. Negative once it has lapsed. */
export function daysRemaining(demo: DemoConfig, now = Date.now()): number {
  const age = now - new Date(demo.createdAt).getTime();
  return PREVIEW_DAYS - Math.floor(age / DAY_MS);
}

/**
 * The calendar date a preview goes dark, derived only from `createdAt`.
 *
 * Deliberately independent of the current clock so it renders identically
 * during the build and in the browser, which is what lets it be printed in the
 * banner without breaking hydration.
 */
export function expiryDate(demo: DemoConfig): Date {
  return new Date(new Date(demo.createdAt).getTime() + PREVIEW_DAYS * DAY_MS);
}

/** 'November 14, 2026'. Fixed locale and timezone so every render agrees. */
export function formatExpiry(demo: DemoConfig): string {
  return expiryDate(demo).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function isExpired(demo: DemoConfig, now = Date.now()): boolean {
  if (demo.showcase) return false;
  return daysRemaining(demo, now) <= 0;
}

/* --- Drawings ------------------------------------------------------------ */

/**
 * The prefix that asks an image slot for a drawing instead of a photograph.
 *
 * `art:feed-sacks` resolves to a scene in `components/artwork.tsx`; anything
 * else is a manifest key and resolves to a photograph. Kept here rather than
 * with the drawings because it is a fact about the shape of a config, and
 * because templates need to ask the question without importing any SVG.
 */
export const ART_PREFIX = 'art:';

/** The scene name inside an `art:` key, or nothing for a photo key. */
export function artName(key: string | undefined): string | undefined {
  if (!key || !key.startsWith(ART_PREFIX)) return undefined;
  return key.slice(ART_PREFIX.length);
}

/** Every image key a demo renders, in the order the page uses them. */
export function imageKeys(demo: DemoConfig): string[] {
  return [demo.hero.image, ...demo.gallery, demo.about.image].filter(
    (key): key is string => Boolean(key)
  );
}

/**
 * Whether this demo is illustrated rather than photographed.
 *
 * Templates ask because several of them had a sentence like "photographed the
 * day we finished" sitting over a set of drawings. Small, and exactly the kind
 * of wrong detail that costs a sale: an owner who catches the page describing
 * its own pictures inaccurately has no reason to trust the opening times.
 */
export function isDrawn(demo: DemoConfig): boolean {
  return imageKeys(demo).every((key) => Boolean(artName(key)));
}

/**
 * How this demo's pictures should be described on the page.
 *
 * Four states, and getting the wrong one printed is a small error that costs
 * a sale. The trades template used to choose between "drawn for this preview"
 * and "photographed the day we finished", which is a correct pair right up
 * until a preview carries generic stock: then a page about somebody's business
 * claims their own work is pictured when it is not, and an owner who catches
 * that has no reason to believe the opening times either.
 */
export type PictureKind =
  /** Illustrations made for this preview, and nothing else. */
  | 'drawn'
  /** Both: photographs of the trade, with drawings beside them. */
  | 'mixed'
  /** Real photographs, but of the trade rather than of this business. */
  | 'placeholder'
  /** This business's own pictures. */
  | 'own';

/**
 * `keys` narrows the question to part of the page.
 *
 * The trades template's "Recent jobs" heading is about the gallery and only
 * the gallery, so asking about the whole page would have it describing an
 * illustration three sections further down.
 */
export function pictureKind(
  demo: DemoConfig,
  keys: string[] = imageKeys(demo)
): PictureKind {
  const anyDrawn = keys.some((key) => Boolean(artName(key)));
  const anyPhoto = keys.some((key) => !artName(key));

  if (anyDrawn && anyPhoto) return demo.placeholderPhotos ? 'mixed' : 'own';
  if (anyDrawn) return 'drawn';
  return demo.placeholderPhotos ? 'placeholder' : 'own';
}

/* --- Formatting helpers shared by every template ------------------------ */

/** '303-555-0142' → 'tel:+13035550142'. Assumes US. */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+${digits.length === 10 ? '1' : ''}${digits}`;
}

/** The one-line address a person would read aloud. */
export function fullAddress(demo: DemoConfig): string {
  const { address, city, state } = demo.business;
  return [address, `${city}, ${state}`].filter(Boolean).join(', ');
}

/**
 * Where this demo lives.
 *
 * Gallery samples are public at /templates/<slug>; previews are noindexed at
 * /demo/<slug>. Every internal link is built from this, so a config never has
 * to know which of the two it is.
 */
export function demoBase(demo: DemoConfig): string {
  return demo.showcase ? `/templates/${demo.slug}` : `/demo/${demo.slug}`;
}

/** Every URL this demo owns, home page first. Used by the prerenderer. */
export function demoRoutes(demo: DemoConfig): string[] {
  const base = demoBase(demo);
  return [base, ...(demo.pages ?? []).map((page) => `${base}/${page.slug}`)];
}

/** Google Maps link: a place search by name and address, or by coordinates. */
export function directionsHref(demo: DemoConfig): string {
  const query = demo.map
    ? `${demo.map.lat},${demo.map.lng}`
    : `${demo.business.name}, ${fullAddress(demo)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Today's row, so a template can mark it. Sunday-indexed like `hours` should be. */
export function todayName(now = new Date()): string {
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][now.getDay()];
}

/**
 * What a sample actually demonstrates, read off the config.
 *
 * The gallery needs to say more than "a nice looking page", because every
 * competitor's showcase says that. It needs to name the working parts, and
 * the only way to keep those honest as the samples change is to derive them
 * from the same data the page renders from rather than typing a list next to
 * a slug and letting it rot.
 */
export function sampleFeatures(demo: DemoConfig): string[] {
  const out: string[] = [];

  // The venue sample is the odd one out and says so first, because its whole
  // reason for existing is the part no other sample has.
  if (demo.template === 'venue') {
    // "No JavaScript" used to be the third, and it was false: the same page
    // carries a seating planner and a date picker. The motion is what is
    // CSS-only, so that is what it says.
    out.push('Scroll-driven', 'Pinned gallery', 'CSS-only motion');
  }
  if (demo.pages?.length) out.push(`${demo.pages.length + 1} pages`);
  if (demo.menu?.length) out.push('Priced menu');
  if (demo.products?.length) {
    out.push(demo.template === 'venue' ? 'Priced packages' : 'Stock list');
  }
  if (demo.pages?.some((p) => p.kind === 'order')) out.push('Pickup ordering');
  if (demo.template === 'trades' || demo.template === 'professional') {
    out.push(demo.template === 'trades' ? 'Quote form' : 'Booking form');
  }
  if (demo.team?.length) out.push('Staff profiles');
  if (demo.insurance?.length) out.push('Insurance list');
  if (demo.serviceAreas?.length) out.push('Service areas');
  if (demo.gallery.length >= 4) out.push('Photo gallery');
  if (demo.faq?.length) out.push('FAQ');

  // Long enough to look substantial, short enough to read in one pass.
  return out.slice(0, 6);
}

export type { DemoConfig } from './types';
