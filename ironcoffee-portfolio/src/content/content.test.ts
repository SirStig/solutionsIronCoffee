import { describe, expect, it } from 'vitest';
import manifest from '../generated/images.json';
import {
  allProjects,
  featuredProjects,
  getProject,
  projectsIn,
  projects,
} from './projects';
import { formatDate, posts } from './blog';
import { nav, site, socials } from './site';

const images = manifest as Record<string, unknown>;

/**
 * These guard the things a typo breaks silently: an image key that no longer
 * exists renders nothing, a duplicate slug shadows a page, a bad date sorts the
 * blog wrongly. None of it is caught by the type checker.
 */
describe('projects', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('references images that exist in the manifest', () => {
    for (const project of projects) {
      expect(images, `${project.slug} cover`).toHaveProperty(project.image);
      for (const shot of project.gallery ?? []) {
        expect(images, `${project.slug} gallery`).toHaveProperty(shot.name);
      }
    }
  });

  it('keeps taglines short enough to read at a glance', () => {
    for (const project of projects) {
      expect(project.tagline.length, project.slug).toBeLessThanOrEqual(70);
    }
  });

  it('caps highlights and tech so cards stay scannable', () => {
    for (const project of projects) {
      expect(project.highlights.length, project.slug).toBeLessThanOrEqual(5);
      expect(project.tech.length, project.slug).toBeLessThanOrEqual(8);
    }
  });

  it('uses absolute URLs for every external link', () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.href, `${project.slug} → ${link.label}`).toMatch(
          /^https?:\/\//
        );
      }
    }
  });

  it('names at most one primary link per project', () => {
    for (const project of projects) {
      const primaries = project.links.filter((l) => l.primary);
      expect(primaries.length, project.slug).toBeLessThanOrEqual(1);
    }
  });

  it('sorts by weight and finds projects by slug', () => {
    const weights = allProjects.map((p) => p.weight);
    expect(weights).toEqual([...weights].sort((a, b) => a - b));
    expect(getProject('beyond25')?.name).toBe('Beyond25');
    expect(getProject('nope')).toBeUndefined();
  });

  it('fills every category page', () => {
    for (const category of ['apps', 'open-source', 'games'] as const) {
      expect(projectsIn(category).length, category).toBeGreaterThan(0);
    }
  });

  it('features enough projects for the home grid', () => {
    expect(featuredProjects.length).toBeGreaterThanOrEqual(4);
  });
});

describe('blog', () => {
  it('has unique slugs', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every post an ISO date and a title', () => {
    for (const post of posts) {
      expect(post.date, post.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.title.length, post.slug).toBeGreaterThan(0);
    }
  });

  it('orders newest first', () => {
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('derives an excerpt for search results and cards', () => {
    for (const post of posts) {
      expect(post.excerpt.length, post.slug).toBeGreaterThan(20);
      expect(post.excerpt, post.slug).not.toContain('#');
    }
  });

  it('formats dates in a fixed timezone', () => {
    expect(formatDate('2026-08-22')).toBe('22 August 2026');
  });
});

describe('site', () => {
  it('has no trailing slash on the origin, so canonicals do not double up', () => {
    expect(site.url).not.toMatch(/\/$/);
  });

  it('points every nav item at an absolute path', () => {
    for (const item of nav) {
      expect(item.href, item.label).toMatch(/^\//);
    }
  });

  it('keeps the meta description within what search results show', () => {
    expect(site.description.length).toBeLessThanOrEqual(160);
  });

  it('gives every social link a usable href', () => {
    for (const social of socials) {
      expect(social.href, social.label).toMatch(/^(https?:\/\/|mailto:)/);
    }
  });
});
