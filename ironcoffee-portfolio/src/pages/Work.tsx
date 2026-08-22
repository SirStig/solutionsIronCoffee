import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import ProjectCard from '../components/ProjectCard';
import { allProjects, type Category } from '../content/projects';
import styles from './Work.module.css';

/**
 * Work is the union of every category, so it groups rather than listing flat —
 * otherwise a library sitting next to an app reads as miscategorised.
 *
 * A project's first category is its primary one, which keeps anything tagged
 * twice (NovaSwift is both a game and open source) in exactly one group here.
 */
const groups: { key: Category; title: string; href?: string }[] = [
  { key: 'apps', title: 'Apps', href: '/apps' },
  { key: 'open-source', title: 'Open source', href: '/open-source' },
  { key: 'games', title: 'Games', href: '/games' },
  { key: 'client', title: 'Client work' },
];

/** Everything at or past this weight drops to the compact list at the bottom. */
const ARCHIVE_WEIGHT = 20;

export default function Work() {
  const current = allProjects.filter((p) => p.weight < ARCHIVE_WEIGHT);
  const archive = allProjects.filter((p) => p.weight >= ARCHIVE_WEIGHT);

  return (
    <>
      <Seo
        title="Work"
        description="Projects by Joshua Kac — apps, open-source libraries, games and client work."
        path="/work"
      />

      <div className="container-wide">
        <header className={styles.header}>
          <h1>Work</h1>
          <p className={styles.intro}>
            Everything worth showing, grouped by what it is. Newest and most
            active first.
          </p>
        </header>

        {groups.map((group) => {
          const items = current.filter((p) => p.categories[0] === group.key);
          if (items.length === 0) return null;

          return (
            <section key={group.key} className={styles.group}>
              <div className={styles.groupHead}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                {group.href && (
                  <Link to={group.href} className={styles.groupLink}>
                    Just {group.title.toLowerCase()}{' '}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                )}
              </div>

              <ul className={styles.grid}>
                {items.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    priority={group.key === 'apps' && i === 0}
                  />
                ))}
              </ul>
            </section>
          );
        })}

        {archive.length > 0 && (
          <section className={styles.group}>
            <h2 className={styles.groupTitle}>Older</h2>
            <ul className={styles.archiveList}>
              {archive.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="compact"
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
