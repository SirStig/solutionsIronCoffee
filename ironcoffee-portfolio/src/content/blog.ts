/**
 * Blog index metadata, assembled at build time.
 *
 * Imports the `?meta` variant deliberately: index pages need titles and dates,
 * not rendered bodies, and pulling the HTML in here would drag every post into
 * the entry chunk. Post bodies live in ./blogPosts.ts, which only the post
 * route imports.
 *
 * Adding a post means dropping a file into src/content/blog/ and nothing else.
 */

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  tags: string[];
  /** Manifest key for an optional header image. */
  image?: string;
  /** Hides the post from production builds without deleting it. */
  draft?: boolean;
}

const modules = import.meta.glob<{ default: PostMeta }>('./blog/*.md', {
  eager: true,
  query: 'meta',
});

const parsed: PostMeta[] = Object.values(modules).map((m) => ({
  ...m.default,
  tags: m.default.tags ?? [],
}));

/** Newest first. Drafts show in dev so they can be previewed. */
export const posts: PostMeta[] = parsed
  .filter((p) => (import.meta.env.PROD ? !p.draft : true))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

export const postsWithTag = (tag: string) =>
  posts.filter((p) => p.tags.includes(tag));

/** `2026-08-22` → `22 August 2026`, stable across locales. */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
