import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { formatDate, posts } from '../content/blog';
import { site } from '../content/site';
import styles from './Blog.module.css';

export default function Blog() {
  const schema = {
    '@type': 'Blog',
    name: `${site.name} — Writing`,
    url: `${site.url}/blog`,
    author: { '@type': 'Person', name: site.name, url: site.url },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <Seo
        title="Writing"
        description="Notes on shipping software — mobile, backend, games and the things that went wrong."
        path="/blog"
        jsonLd={schema}
      />

      <div className="container-wide">
        <header className={styles.header}>
          <h1>Writing</h1>
          <p className={styles.intro}>
            Notes on things I actually hit while building. Short, and only when
            there&rsquo;s something worth saying.
          </p>
          <a href="/rss.xml" className={styles.rss}>
            Subscribe via RSS
          </a>
        </header>

        {posts.length === 0 ? (
          <p className={styles.empty}>First post coming soon.</p>
        ) : (
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className={styles.post}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <p className={styles.meta}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden> · </span>
                    {post.readingTime} min read
                    {post.draft && (
                      <span className={styles.draft}>Draft</span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
