import { describe, expect, it } from 'vitest';
import {
  daysRemaining,
  demos,
  formatExpiry,
  fullAddress,
  isExpired,
  previews,
  showcases,
  telHref,
  todayName,
} from './index';
import { TEMPLATES, TEMPLATE_BLURBS } from './templates';

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
});
