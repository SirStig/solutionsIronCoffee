import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import LiveVersionBadge from '../components/LiveVersionBadge';
import { getProject, statusLabels } from '../content/projects';
import { site } from '../content/site';
import styles from './ProjectPage.module.css';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/404" replace />;

  const path = `/work/${project.slug}`;
  const primary = project.links.find((l) => l.primary) ?? project.links[0];

  const schema = {
    '@type': 'CreativeWork',
    name: project.name,
    headline: project.tagline,
    description: project.summary,
    url: `${site.url}${path}`,
    dateCreated: project.year,
    author: { '@type': 'Person', name: site.name, url: site.url },
    keywords: project.tech.join(', '),
  };

  return (
    <>
      <Seo
        title={project.name}
        description={project.summary}
        path={path}
        jsonLd={schema}
      />

      <article className="container">
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
                  className={
                    link === primary ? styles.linkPrimary : styles.link
                  }
                >
                  {link.label}
                  <ExternalLink size={14} aria-hidden />
                </a>
              ))}
            </div>
          )}
        </header>

        <Img
          name={project.image}
          alt={`${project.name} — ${project.tagline}`}
          className={styles.hero}
          aspectRatio="16 / 10"
          sizes="(min-width: 800px) 46rem, 100vw"
          priority
        />

        <div className={styles.body}>
          <p className={styles.summary}>{project.summary}</p>

          {project.story
            ?.split('\n\n')
            .map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
        </div>

        {project.highlights.length > 0 && (
          <Reveal as="section" className={styles.block}>
            <h2 className={styles.blockTitle}>What it does</h2>
            <ul className={styles.highlights}>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal as="section" className={styles.block}>
          <h2 className={styles.blockTitle}>Built with</h2>
          <ul className={styles.tech}>
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        {project.gallery && project.gallery.length > 0 && (
          <Reveal as="section" className={styles.block}>
            <h2 className={styles.blockTitle}>Screens</h2>
            <div className={styles.gallery}>
              {project.gallery.map((shot) => (
                <Img
                  key={shot.name}
                  name={shot.name}
                  alt={shot.alt}
                  className={styles.shot}
                  sizes="(min-width: 700px) 22rem, 100vw"
                />
              ))}
            </div>
          </Reveal>
        )}

        {project.note && <p className={styles.note}>{project.note}</p>}
      </article>
    </>
  );
}
