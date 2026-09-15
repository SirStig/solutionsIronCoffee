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

import copperAndComb from './configs/copper-and-comb';
import franktownDental from './configs/franktown-dental';
import ridgelineSmokehouse from './configs/ridgeline-smokehouse';
import summitRidge from './configs/summit-ridge';
import test from './configs/test';

const all: DemoConfig[] = [
  ridgelineSmokehouse,
  copperAndComb,
  summitRidge,
  franktownDental,
  test,
];

export const demos: Record<string, DemoConfig> = Object.fromEntries(
  all.map((demo) => [demo.slug, demo])
);

/** Fictional businesses in the public gallery. Indexed, permanent. */
export const showcases: DemoConfig[] = all.filter((d) => d.showcase);

/** Real previews built for a named owner. Noindexed, expiring. */
export const previews: DemoConfig[] = all.filter((d) => !d.showcase);

export const getDemo = (slug: string): DemoConfig | undefined => demos[slug];

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

/** '14 November 2026'. Fixed locale and timezone so every render agrees. */
export function formatExpiry(demo: DemoConfig): string {
  return expiryDate(demo).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function isExpired(demo: DemoConfig, now = Date.now()): boolean {
  if (demo.showcase) return false;
  return daysRemaining(demo, now) <= 0;
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

export type { DemoConfig } from './types';
