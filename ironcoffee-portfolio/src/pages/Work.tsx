import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Archive } from 'lucide-react';
import Seo from '../components/Seo';
import ProjectCard from '../components/ProjectCard';
import { CategoryField, CategoryMark } from '../components/CategoryMark';
import {
  ARCHIVE_WEIGHT,
  allProjects,
  type Category,
} from '../content/projects';
import styles from './Work.module.css';

/**
 * Work is the union of every category, so it groups rather than listing flat.
 * otherwise a library sitting next to an app reads as miscategorised.
 *
 * A project's first category is its primary one, which keeps anything tagged
 * twice (NovaSwift is both a game and open source) in exactly one group here.
 */
const groups: {
  key: Category;
  title: string;
  /** One line under the heading. What this pile is, not what is in it. */
  blurb: string;
  href?: string;
}[] = [
  {
    key: 'apps',
    title: 'Apps',
    blurb: 'Consumer products, taken from an idea to something installable.',
    href: '/apps',
  },
  {
    key: 'open-source',
    title: 'Open source',
    blurb: 'Tools I needed, published so somebody else does not have to write them.',
    href: '/open-source',
  },
  {
    key: 'games',
    title: 'Games',
    blurb: 'Where this started, and what it keeps coming back to.',
    href: '/games',
  },
  {
    key: 'client',
    title: 'Client work',
    blurb: 'Built to a brief, for a business that is not mine.',
  },
];

const primary = (key: Category) =>
  allProjects.filter((p) => p.categories[0] === key);

/** Chip counts, computed rather than typed, so they cannot drift from the data. */
const counts: Record<string, number> = groups.reduce(
  (acc, group) => ({ ...acc, [group.key]: primary(group.key).length }),
  { all: allProjects.length }
);

type Filter = Category | 'all';

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Everything' },
  ...groups
    .filter((group) => counts[group.key] > 0)
    .map((group) => ({ key: group.key as Filter, label: group.title })),
];

export default function Work() {
  /**
   * Filter state is deliberately not in the URL. This page is prerendered
   * unfiltered, so reading a query parameter during hydration would let
   * /work?filter=games render markup React never saw in the static HTML, and
   * the whole route gets thrown away and rebuilt. The three category routes
   * are what a deep link is for; this is a control for somebody already here.
   */
  const [filter, setFilter] = useState<Filter>('all');

  const shown = allProjects.filter(
    (p) => filter === 'all' || p.categories[0] === filter
  );
  const current = shown.filter((p) => p.weight < ARCHIVE_WEIGHT);
  const archive = shown.filter((p) => p.weight >= ARCHIVE_WEIGHT);

  return (
    <>
      <Seo
        title="Work"
        description="Projects by Joshua Kac: apps, open-source libraries, games and client work."
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

        <div className={styles.filters} role="group" aria-label="Filter by kind">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              className={styles.chip}
              aria-pressed={filter === item.key}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
              <span className={styles.chipCount}>{counts[item.key]}</span>
            </button>
          ))}
        </div>

        {/* The chips are buttons, not links, so nothing announces the result
            on its own. */}
        <p className="visually-hidden" aria-live="polite">
          Showing {shown.length} of {allProjects.length} projects.
        </p>

        {groups.map((group) => {
          const items = current.filter((p) => p.categories[0] === group.key);
          if (items.length === 0) return null;

          /**
           * The first card in a section runs full width, which stops four
           * sections of identical two-column grid from reading as one grid
           * with headings dropped into it.
           *
           * Not at exactly two, where it would leave a single half-width card
           * stranded beside empty space.
           */
          const lead = items.length === 2 ? -1 : 0;

          return (
            <section
              key={group.key}
              className={styles.group}
              aria-labelledby={`group-${group.key}`}
            >
              <div className={styles.groupHead}>
                <CategoryField
                  category={group.key}
                  className={styles.groupField}
                />
                <span className={styles.groupBadge}>
                  <CategoryMark
                    category={group.key}
                    className={styles.groupMark}
                  />
                </span>

                <div className={styles.groupText}>
                  <h2 id={`group-${group.key}`} className={styles.groupTitle}>
                    {group.title}
                  </h2>
                  <p className={styles.groupBlurb}>{group.blurb}</p>
                </div>

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
                    variant={i === lead ? 'wide' : 'feature'}
                    priority={group.key === 'apps' && i === 0}
                  />
                ))}
              </ul>
            </section>
          );
        })}

        {archive.length > 0 && (
          <section className={styles.group} aria-labelledby="group-older">
            <div className={styles.groupHead}>
              <span className={`${styles.groupBadge} ${styles.groupBadgeMuted}`}>
                <Archive size={20} aria-hidden />
              </span>
              <div className={styles.groupText}>
                <h2 id="group-older" className={styles.groupTitle}>
                  Older
                </h2>
                <p className={styles.groupBlurb}>
                  Kept for the record rather than for the pitch.
                </p>
              </div>
            </div>

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
