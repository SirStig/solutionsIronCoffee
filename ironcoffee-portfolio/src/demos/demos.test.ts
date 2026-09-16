import { describe, expect, it } from 'vitest';
import type { DemoConfig } from './types';
import { daysRemaining, demos, drafts, formatExpiry, fullAddress, isExpired, previews, showcases, telHref, todayName, getDemo, getAnyDemo } from './index';
import { TEMPLATES, TEMPLATE_BLURBS } from './templates';
import { iconNames } from './components/icons';
import { artName, pictureKind } from './index';
import { hasScene } from './components/artwork';
import { hasMotif } from './components/motifs';
import { openState } from './components/blocks';
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

  it('never puts invented words in a real mouth', () => {
    /*
     * A quote with no `source` is written copy. On a fictional sample that is
     * fine and the page says the business is invented; on a preview carrying a
     * real name it is the one mistake that cannot be walked back, because the
     * person best placed to catch it is the person being pitched.
     *
     * A quote with a `source` is a real review being repeated, and the source
     * is printed on the page so anyone can go and check it. That is allowed,
     * and it is the strongest thing a cold preview can carry.
     */
    for (const demo of all) {
      if (demo.showcase) continue;
      for (const quote of demo.testimonials ?? []) {
        expect(
          quote.source,
          `${demo.slug}: "${quote.quote.slice(0, 40)}" has no source. A quote on a preview must name where it was published.`
        ).toBeTruthy();
      }
    }
  });

  it('does not dress an invented quote up as a real review', () => {
    // The other direction, and the reason `source` is not decoration: citing a
    // sample's fictional customer to Google would make the one label that
    // means something mean nothing.
    for (const demo of showcases) {
      for (const quote of demo.testimonials ?? []) {
        expect(quote.source, `${demo.slug}: ${quote.name}`).toBeUndefined();
      }
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

  /*
   * Mixing drawings and photographs is allowed, but only when the page can say
   * so.
   *
   * This used to forbid the mix outright, for two reasons. One was that the
   * disclosure at the foot of the page had no true sentence to print: it chose
   * between "these are drawings" and "these are photographs" and either was
   * half wrong. That is fixed, and `pictureKind` now returns 'mixed' with
   * wording that covers both.
   *
   * The other reason was that a mix looks like a mistake rather than a
   * decision, and that one still holds if the mix is accidental. What makes it
   * a decision here is the split being the same on every preview and doing a
   * job: photographs carry the hero and the gallery, where a stranger decides
   * whether this is a real business with a real website, and one drawing sits
   * beside the story, where a stock photograph would be claiming to be a place
   * it is not.
   *
   * So the rule is now about honesty rather than uniformity. Mix if you like,
   * but a preview that mixes must carry `placeholderPhotos`, because that flag
   * is what makes the page admit the photographs are not theirs.
   */
  it('only mixes drawings and photographs on a page that admits it', () => {
    for (const demo of all) {
      const keys = [demo.hero.image, ...demo.gallery, demo.about.image].filter(
        (key): key is string => Boolean(key)
      );
      const drawn = keys.filter((key) => artName(key)).length;
      const mixed = drawn > 0 && drawn < keys.length;
      if (!mixed) continue;

      expect(
        demo.showcase || demo.placeholderPhotos,
        `${demo.slug} mixes ${drawn} drawings with ${keys.length - drawn} photos but does not set placeholderPhotos, so the disclosure cannot say the photographs are stand-ins`
      ).toBeTruthy();
    }
  });

  it('describes a mixed demo as mixed', () => {
    // The disclosure reads off this, so a preview that carries both must not
    // resolve to a kind whose sentence names only one of them.
    for (const demo of previews) {
      const keys = [demo.hero.image, ...demo.gallery, demo.about.image].filter(
        (key): key is string => Boolean(key)
      );
      const drawn = keys.filter((key) => artName(key)).length;
      if (drawn === 0 || drawn === keys.length) continue;
      expect(pictureKind(demo), demo.slug).toBe('mixed');
    }
  });
});

describe('open now', () => {
  /*
   * The badge makes a claim about a real business, so the only acceptable
   * failure mode is saying nothing. Everything below is one of the strings
   * that actually appears in these configs.
   */
  const week = (open: string) =>
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ].map((day) => ({ day, open }));

  // A Wednesday, so every day of the week table is reachable from it.
  const at = (hhmm: string) => new Date(`2026-09-16T${hhmm}:00`);

  it('is open between the two times', () => {
    expect(openState(week('10am to 6pm'), at('11:30'))).toEqual({
      open: true,
      note: 'Until 6pm',
    });
  });

  it('is closed before opening and says when', () => {
    expect(openState(week('10am to 6pm'), at('08:00'))).toEqual({
      open: false,
      note: 'Opens 10am',
    });
  });

  it('is closed after closing and points at the next day', () => {
    expect(openState(week('10am to 6pm'), at('19:00'))).toEqual({
      open: false,
      note: 'Opens Thursday',
    });
  });

  it('reads the minutes, not just the hour', () => {
    expect(openState(week('8:30am to 5:30pm'), at('08:15'))?.open).toBe(false);
    expect(openState(week('8:30am to 5:30pm'), at('08:45'))?.open).toBe(true);
  });

  it('puts noon and midnight on the right side of the clock', () => {
    // 12pm is noon and 12am is midnight, so the hour wraps rather than adds.
    expect(openState(week('12pm to 8pm'), at('13:00'))?.open).toBe(true);
    expect(openState(week('12am to 6am'), at('13:00'))?.open).toBe(false);
  });

  it('carries a closing time past midnight into the next day', () => {
    expect(openState(week('6pm to 1am'), at('23:00'))?.open).toBe(true);
  });

  it('skips a closed day when looking for the next one', () => {
    const hours = [
      { day: 'Sunday', open: 'Closed' },
      { day: 'Monday', open: 'Closed' },
      { day: 'Tuesday', open: '8am to 5pm' },
      { day: 'Wednesday', open: 'Closed' },
      { day: 'Thursday', open: 'Closed' },
      { day: 'Friday', open: '8am to 5pm' },
      { day: 'Saturday', open: 'Closed' },
    ];
    expect(openState(hours, at('12:00'))).toEqual({
      open: false,
      note: 'Opens Friday',
    });
  });

  it('says nothing at all about a day with no clock in it', () => {
    // These are real values in these configs. Guessing "Open now" from any of
    // them would put a false claim about a real business on its own page.
    for (const text of [
      'By appointment',
      'Call or message',
      'Emergency calls only',
      'Open until the brisket runs out',
    ]) {
      expect(openState(week(text), at('12:00')), text).toBeNull();
    }
  });

  it('says nothing when no row matches today', () => {
    expect(openState([{ day: 'Monday', open: '9am to 5pm' }], at('12:00'))).toBeNull();
  });

  it('never claims to be open on a week that is entirely closed', () => {
    expect(openState(week('Closed'), at('12:00'))).toEqual({
      open: false,
      note: 'Closed today',
    });
  });
});
