import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import LiveVersionBadge from '../components/LiveVersionBadge';
import { adjacentProjects, getProject, statusLabels } from '../content/projects';
import { site } from '../content/site';
import manifest from '../generated/images.json';
import styles from './ProjectPage.module.css';

const ratios = manifest as Record<string, { aspectRatio: number }>;

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/404" replace />;

  const path = `/work/${project.slug}`;
  const primary = project.links.find((l) => l.primary) ?? project.links[0];
  const { prev, next } = adjacentProjects(project.slug);

  /**
   * A phone screenshot forced into a 16/9 hero is two thirds empty letterbox,
   * which is the widest, most visible dead space on the page. Portrait covers
   * keep their own ratio and sit centered at about a phone's width instead.
   * 0.9 is the same threshold `Img` uses to decide whether to letterbox.
   */
  const tallHero = (ratios[project.image]?.aspectRatio ?? 1.6) < 0.9;

  /* Shipped apps get the type Google actually associates with apps. No
     `aggregateRating`, deliberately: that is the half of the rich result that
     needs a star average, and a number on this site that can go stale is
     against the house rules whatever it would buy in search. */
  const isApp = project.links.some((l) =>
    /apps\.apple\.com|play\.google\.com/.test(l.href)
  );

  const schema = isApp
    ? {
        '@type': 'SoftwareApplication',
        name: project.name,
        description: project.summary,
        url: `${site.url}${path}`,
        applicationCategory: 'MobileApplication',
        operatingSystem: 'iOS, Android, Web',
        author: { '@type': 'Person', name: site.name, url: site.url },
      }
    : {
        '@type': 'CreativeWork',
        name: project.name,
        headline: project.tagline,
        description: project.summary,
        url: `${site.url}${path}`,
        dateCreated: project.year,
        author: { '@type': 'Person', name: site.name, url: site.url },
        keywords: project.tech.join(', '),
      };

  /**
   * Breadcrumbs.
   *
   * Worth the few lines: this is one of the handful of schema types that still
   * produces a visible result in Google, the path line under the blue link, and
   * every one of these pages genuinely sits under a parent.
   */
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Work', item: `${site.url}/work` },
      {
        '@type': 'ListItem',
        position: 2,
        name: project.name,
        item: `${site.url}${path}`,
      },
    ],
  };

  return (
    <>
      <Seo
        title={project.name}
        description={project.summary}
        path={path}
        jsonLd={[schema, breadcrumbs]}
      />

      <article className="container-wide">
        <Link to="/work" className={styles.back}>
          <ArrowLeft size={15} aria-hidden /> Work
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.status} data-status={project.status}>
              {statusLabels[project.status]}
            </span>
            <span>{project.year}</span>
            {project.liveVersion && (
              <LiveVersionBadge source={project.liveVersion} />
            )}
          </div>

          <h1>{project.name}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          {project.links.length > 0 && (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link === primary ? styles.linkPrimary : styles.link}
                >
                  {link.label}
                  <ExternalLink size={14} aria-hidden />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* The hero runs the full wide container rather than the reading
            column. Four blocks all clamped to 46rem, in the same order, was the
            single biggest reason every one of these pages read as the same
            page with different words in it. */}
        <Img
          name={project.image}
          alt={`${project.name}: ${project.tagline}`}
          className={`${styles.hero} ${tallHero ? styles.heroTall : ''}`}
          aspectRatio={tallHero ? undefined : '16 / 9'}
          sizes={
            tallHero
              ? '(min-width: 40rem) 22rem, 70vw'
              : '(min-width: 1100px) 68rem, 100vw'
          }
          priority
        />

        {/* Prose on the left, facts in a rail beside it. The rail is what stops
            "Built with" being a third list stacked under two other lists. It
            collapses under the prose below 60rem, where a rail is just a
            narrow column of chips. */}
        <div className={styles.split}>
          <div className={styles.body}>
            <p className={styles.summary}>{project.summary}</p>

            {project.story
              ?.split('\n\n')
              .map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
          </div>

          <aside className={styles.rail}>
            <h2 className={styles.railTitle}>Built with</h2>
            <ul className={styles.tech}>
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            {project.note && <p className={styles.note}>{project.note}</p>}
          </aside>
        </div>

        {project.highlights.length > 0 && (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>What it does</h2>
            <ul className={styles.highlights}>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className={styles.blockWide}>
            <h2 className={styles.blockTitle}>Screens</h2>
            <div className={styles.gallery}>
              {project.gallery.map((shot) => (
                <Img
                  key={shot.name}
                  name={shot.name}
                  alt={shot.alt}
                  className={styles.shot}
                  sizes="(min-width: 1100px) 21rem, (min-width: 700px) 45vw, 100vw"
                />
              ))}
            </div>
          </section>
        )}

        {(prev || next) && (
          <nav className={styles.pager} aria-label="More work">
            {prev ? (
              <Link to={`/work/${prev.slug}`} className={styles.pagerLink}>
                <span className={styles.pagerLabel}>
                  <ArrowLeft size={13} aria-hidden /> Previous
                </span>
                <span className={styles.pagerName}>{prev.name}</span>
                <span className={styles.pagerTagline}>{prev.tagline}</span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                to={`/work/${next.slug}`}
                className={`${styles.pagerLink} ${styles.pagerNext}`}
              >
                <span className={styles.pagerLabel}>
                  Next <ArrowRight size={13} aria-hidden />
                </span>
                <span className={styles.pagerName}>{next.name}</span>
                <span className={styles.pagerTagline}>{next.tagline}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </>
  );
}
