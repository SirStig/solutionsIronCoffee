import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { statusLabels, type Project } from '../content/projects';
import Img from './Img';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
  /** `feature` gives the card an image; `compact` is a text-only row. */
  variant?: 'feature' | 'compact';
  /** Set on the first card of the first screen so its image loads eagerly. */
  priority?: boolean;
}

export default function ProjectCard({
  project,
  variant = 'feature',
  priority = false,
}: Props) {
  const to = `/work/${project.slug}`;

  if (variant === 'compact') {
    return (
      <li className={styles.compact}>
        <Link to={to} className={styles.compactLink}>
          <span className={styles.compactName}>{project.name}</span>
          <span className={styles.compactTagline}>{project.tagline}</span>
          <span className={styles.compactYear}>{project.year}</span>
          <ArrowUpRight size={16} className={styles.arrow} aria-hidden />
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.card}>
      <Link to={to} className={styles.link}>
        <Img
          name={project.image}
          alt={`${project.name} — ${project.tagline}`}
          className={styles.image}
          aspectRatio="16 / 10"
          sizes="(min-width: 900px) 34rem, 100vw"
          priority={priority}
        />

        <div className={styles.body}>
          <div className={styles.head}>
            <h3 className={styles.name}>{project.name}</h3>
            <span
              className={styles.status}
              data-status={project.status}
            >
              {statusLabels[project.status]}
            </span>
          </div>

          <p className={styles.tagline}>{project.tagline}</p>

          <ul className={styles.tech}>
            {project.tech.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
