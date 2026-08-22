import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { formatDate, posts } from '../content/blog';
import { getFullPost } from '../content/blogPosts';
import { site } from '../content/site';
import styles from './BlogPost.module.css';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getFullPost(slug) : undefined;

  if (!post) return <Navigate to="/404" replace />;

  const path = `/blog/${post.slug}`;
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  const schema = {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${site.url}${path}`,
    wordCount: post.readingTime * 220,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: site.name, url: site.url },
    publisher: { '@type': 'Person', name: site.name, url: site.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}${path}` },
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={path}
        type="article"
        publishedTime={post.date}
        tags={post.tags}
        jsonLd={schema}
      />

      <article className="container-wide">
        <Link to="/blog" className={styles.back}>
          <ArrowLeft size={15} aria-hidden /> Writing
        </Link>

        <header className={styles.header}>
          <h1>{post.title}</h1>
          <p className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden> · </span>
            {post.readingTime} min read
          </p>
          {post.tags.length > 0 && (
            <ul className={styles.tags}>
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </header>

        {/* Markdown is compiled and sanitised at build time from files in this
            repo — there is no user-supplied content path into this. */}
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <nav className={styles.pager} aria-label="More posts">
          {older ? (
            <Link to={`/blog/${older.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>Older</span>
              <span>{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              to={`/blog/${newer.slug}`}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={styles.pagerLabel}>Newer</span>
              <span>{newer.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
