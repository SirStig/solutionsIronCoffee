import { Helmet } from 'react-helmet-async';
import { site } from '../content/site';

export interface SeoProps {
  /** Page title without the site suffix. Omit on the home page. */
  title?: string;
  description?: string;
  /** Path only, e.g. `/blog/hello`. Combined with the site origin. */
  path: string;
  /** Absolute path to a share image, e.g. `/img/projects/foo-1280.webp`. */
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /** ISO date; emitted as article:published_time when type is 'article'. */
  publishedTime?: string;
  modifiedTime?: string;
  tags?: readonly string[];
  /** Keeps a page out of the index (404, thank-you pages). */
  noindex?: boolean;
  /** Extra schema.org graph nodes merged into the page's JSON-LD. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const abs = (p: string) => (p.startsWith('http') ? p : `${site.url}${p}`);

export default function Seo({
  title,
  description = site.description,
  path,
  image = site.ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${site.name}` : site.title;
  const url = abs(path);
  const imageUrl = abs(image);

  const graph = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={site.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && <meta property="article:author" content={site.name} />}
      {tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {graph.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(
            graph.length === 1
              ? { '@context': 'https://schema.org', ...graph[0] }
              : { '@context': 'https://schema.org', '@graph': graph }
          )}
        </script>
      )}
    </Helmet>
  );
}
