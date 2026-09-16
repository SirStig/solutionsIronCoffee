import { describe, expect, it } from 'vitest';
import type { DemoConfig } from './types';
import { daysRemaining, demos, drafts, formatExpiry, fullAddress, isExpired, previews, showcases, telHref, todayName, getDemo, getAnyDemo } from './index';
import { TEMPLATES, TEMPLATE_BLURBS } from './templates';
import { iconNames } from './components/icons';
import { artName } from './index';
import { hasScene } from './components/artwork';
import { hasMotif } from './components/motifs';
import './components/scenes';

const all = Object.values(demos);

/**
 * A demo is data, so these are the guards a type checker cannot give: a slug
 * that collides shadows another business's page, a malformed hex quietly paints
 * a page black, and a price invented rather than confirmed is the one mistake
 * that cannot be walked back in front of a prospect.
 */
describe('demo configs', () => {
  it('has at least one of each', () => {
    expect(showcases.length).toBeGreaterThanOrEqual(4);
    expect(previews.length).toBeGreaterThanOrEqual(1);
  });

  it('keeps drafts out of the built previews', () => {
    for (const demo of drafts) {
      expect(previews, `${demo.slug} is a draft`).not.toContain(demo);
    }
    // Drafts are still validated by every rule below, which is the point.
    expect(all).toEqual(expect.arrayContaining(drafts));
  });

  it('keys every demo by its own slug', () => {
    for (const [key, demo] of Object.entries(demos)) {
      expect(demo.slug).toBe(key);
    }
  });

  it('uses slugs that are legal as a subdomain label', () => {
    for (const demo of all) {
      expect(demo.slug, demo.slug).toMatch(/^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/);
    }
  });

  it('names a template that exists', () => {
    for (const demo of all) {
      expect(TEMPLATES, demo.slug).toHaveProperty(demo.template);
      expect(TEMPLATE_BLURBS, demo.template).toHaveProperty(demo.template);
    }
  });

  it('covers every template between the gallery and the previews', () => {
    const used = new Set(all.map((d) => d.template));
    for (const name of Object.keys(TEMPLATES)) {
      expect(used, `${name} has no config exercising it`).toContain(name);
    }
  });

  it('gives every brand three valid hex colors', () => {
    for (const demo of all) {
      for (const key of ['primary', 'secondary', 'accent'] as const) {
        expect(demo.brand[key], `${demo.slug} ${key}`).toMatch(
          /^#[0-9a-fA-F]{6}$/
        );
      }
    }
  });

  it('keeps taglines short enough to read at a glance', () => {
    for (const demo of all) {
      expect(demo.business.tagline.length, demo.slug).toBeLessThanOrEqual(70);
    }
  });

  it('lists all seven days of opening hours', () => {
    const week = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    for (const demo of all) {
      expect(demo.hours.map((h) => h.day).sort(), demo.slug).toEqual(
        [...week].sort()
      );
      for (const row of demo.hours) {
        expect(row.open.length, `${demo.slug} ${row.day}`).toBeGreaterThan(0);
      }
    }
  });

  it('writes an ISO createdAt', () => {
    for (const demo of all) {
      expect(demo.createdAt, demo.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(demo.createdAt).getTime())).toBe(false);
    }
  });

  it('never states a bare price without a currency or a plain instruction', () => {
    const acceptable = /(\$|call|quote|free|consultation|from|\/|24\/7)/i;
    for (const demo of all) {
      for (const service of demo.services) {
        if (service.price === undefined) continue;
        expect(service.price, `${demo.slug}: ${service.title}`).toMatch(
          acceptable
        );
      }
    }
  });

  it('never puts words in a real customer\u2019s mouth', () => {
    // Testimonials are invented copy. On a fictional sample that is fine and
    // labeled; on a preview carrying a real business\u2019s name it is not.
    for (const demo of all) {
      if (demo.showcase) continue;
      expect(demo.testimonials ?? [], demo.slug).toHaveLength(0);
    }
  });

  it('only claims numbers for businesses that are invented', () => {
    for (const demo of all) {
      if (demo.showcase) continue;
      expect(demo.stats ?? [], demo.slug).toHaveLength(0);
    }
  });

  it('names an icon that exists', () => {
    const named = all.flatMap((d) => [
      ...d.services.map((x) => x.icon),
      ...(d.products ?? []).map((g) => g.icon),
      ...(d.stats ?? []).map((x) => x.icon),
    ]);
    for (const icon of named) {
      if (!icon) continue;
      expect(iconNames, `unknown icon "${icon}"`).toContain(icon);
    }
  });

  it('gives the gallery samples the copy their cards need', () => {
    for (const demo of showcases) {
      expect(demo.gallery.length, demo.slug).toBeGreaterThan(0);
      expect(demo.about.body.length, demo.slug).toBeGreaterThan(80);
      expect(demo.hero.ctaLabel.length, demo.slug).toBeGreaterThan(0);
    }
  });
});

describe('expiry', () => {
  const preview = previews[0];

  it('never expires a gallery sample', () => {
    const ancient = { ...showcases[0], createdAt: '2000-01-01' };
    expect(isExpired(ancient)).toBe(false);
  });

  it('expires a preview once it is past sixty days', () => {
    const day = 24 * 60 * 60 * 1000;
    const made = new Date(preview.createdAt).getTime();

    expect(isExpired(preview, made + 59 * day)).toBe(false);
    expect(isExpired(preview, made + 61 * day)).toBe(true);
    expect(daysRemaining(preview, made + 10 * day)).toBe(50);
  });

  it('formats an expiry date without reading the clock', () => {
    const first = formatExpiry(preview);
    const second = formatExpiry(preview);
    expect(first).toBe(second);
    expect(first).toMatch(/^\d{1,2} \w+ \d{4}$/);
  });
});

describe('formatting helpers', () => {
  it('builds a dialable tel href from a formatted number', () => {
    expect(telHref('(303) 555-0142')).toBe('tel:+13035550142');
    expect(telHref('303.555.0142')).toBe('tel:+13035550142');
    expect(telHref('+1 303 555 0142')).toBe('tel:+13035550142');
  });

  it('joins an address only from the parts that exist', () => {
    const demo = showcases[0];
    expect(fullAddress(demo)).toContain(demo.business.city);
    expect(
      fullAddress({ ...demo, business: { ...demo.business, address: undefined } })
    ).toBe(`${demo.business.city}, ${demo.business.state}`);
  });

  it('names the current day the way the hours rows do', () => {
    expect(todayName(new Date('2026-09-15T12:00:00Z'))).toBe('Tuesday');
  });

  /* Regression test for a hole that shipped.
   *
   * The prerenderer refused to build drafts, so `/demo/<draft>` had no file and
   * the server answered 404. The 404 body is the app shell though, so React
   * hydrated over it, the client router matched, and `getDemo` handed back the
   * draft: a full preview of a real business, live at a URL anybody could
   * send, under a status code that claimed it was gone.
   *
   * Vitest runs with DEV false and no PRERENDER_DRAFTS, which is exactly the
   * condition a deployed build has. */
  it('never hands a draft to a route in a deployed build', () => {
    /*
     * Tested with a fixture rather than with whatever business happens to be
     * half-written today.
     *
     * This used to assert `drafts.length > 0` first, so that it could not pass
     * vacuously. That guard was right about the danger and wrong about the
     * mechanism: the day the last real draft went live the test failed, and
     * the only ways to fix it are to leave a business permanently unfinished
     * or to delete the check. The gate deserves its own subject.
     */
    const fixture: DemoConfig = { ...all[0], slug: '__draft_fixture__', draft: true };
    demos[fixture.slug] = fixture;
    try {
      expect(getDemo(fixture.slug)).toBeUndefined();
      // Still in the registry, still typechecked, still testable.
      expect(getAnyDemo(fixture.slug)).toBeDefined();
    } finally {
      delete demos[fixture.slug];
    }

    // And any real draft in the repo is held by the same gate.
    for (const draft of drafts) {
      expect(getDemo(draft.slug)).toBeUndefined();
      expect(getAnyDemo(draft.slug)).toBeDefined();
    }
  });

  it('still serves everything that is not a draft', () => {
    for (const demo of [...showcases, ...previews]) {
      expect(getDemo(demo.slug)).toBeDefined();
    }
  });

  /* --- Drawings ---------------------------------------------------------- *

   * An `art:` key naming a scene that does not exist does not throw. It falls
   * through to the gradient stand-in, so the page still renders, still passes
   * the browser audit, and quietly shows a colored rectangle where a drawing
   * was meant to be. A typo in a scene name is therefore invisible until
   * somebody looks at the page, which is exactly the class of mistake worth
   * spending a test on. */
  it('names a scene that exists for every art: key', () => {
    for (const demo of all) {
      const keys = [demo.hero.image, ...demo.gallery, demo.about.image];
      for (const key of keys) {
        const scene = artName(key);
        if (!scene) continue;
        expect(hasScene(scene), `${demo.slug} -> ${key}`).toBe(true);
      }
    }
  });

  it('names a motif that exists, when it names one at all', () => {
    for (const demo of all) {
      const { motif } = demo.brand;
      if (!motif) continue;
      expect(hasMotif(motif), `${demo.slug} -> ${motif}`).toBe(true);
    }
  });

  /* A preview for a real business is either drawn or photographed, never the
   * two at once. Mixing them is the one combination that looks like a mistake
   * rather than like a decision, and it also makes the disclosure at the foot
   * of the page wrong whichever sentence it picks. */
  it('does not mix drawings and photographs in one demo', () => {
    for (const demo of all) {
      const keys = [demo.hero.image, ...demo.gallery, demo.about.image].filter(
        (key): key is string => Boolean(key)
      );
      const drawn = keys.filter((key) => artName(key));
      expect(
        drawn.length === 0 || drawn.length === keys.length,
        `${demo.slug} mixes ${drawn.length} drawings with ${keys.length - drawn.length} photos`
      ).toBe(true);
    }
  });
});