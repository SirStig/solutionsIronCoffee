/**
 * Full post bodies, including rendered HTML.
 *
 * Imported only by the BlogPost route, which is lazy — so Rollup keeps every
 * post body out of the entry chunk and ships it with the post page instead.
 * The prerenderer resolves that lazy route, so the HTML still lands in the
 * static file crawlers read.
 */
import type { PostMeta } from './blog';

export interface FullPost extends PostMeta {
  html: string;
  headings: { id: string; text: string; depth: number }[];
}

const modules = import.meta.glob<{ default: FullPost }>('./blog/*.md', {
  eager: true,
});

const bySlug = new Map<string, FullPost>(
  Object.values(modules).map((m) => [
    m.default.slug,
    { ...m.default, tags: m.default.tags ?? [], headings: m.default.headings ?? [] },
  ])
);

export const getFullPost = (slug: string) => bySlug.get(slug);
