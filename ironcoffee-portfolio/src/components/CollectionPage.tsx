import Seo from './Seo';
import ProjectCard from './ProjectCard';
import type { Project } from '../content/projects';
import styles from './CollectionPage.module.css';

interface Props {
  title: string;
  /** One or two sentences under the heading. Keep it short. */
  intro: string;
  path: string;
  projects: Project[];
  /** Meta description; falls back to the intro. */
  description?: string;
  /** Projects below this line render as compact rows rather than cards. */
  archiveAfter?: number;
}

export default function CollectionPage({
  title,
  intro,
  path,
  projects,
  description,
  archiveAfter,
}: Props) {
  const cut = archiveAfter ?? projects.length;
  const featured = projects.slice(0, cut);
  const archive = projects.slice(cut);

  return (
    <>
      <Seo title={title} description={description ?? intro} path={path} />

      <div className="container-wide">
        <header className={styles.header}>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
        </header>

        {featured.length > 0 && (
          <ul className={styles.grid}>
            {featured.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={i === 0}
              />
            ))}
          </ul>
        )}

        {archive.length > 0 && (
          <section className={styles.archive}>
            <h2 className={styles.archiveTitle}>Older</h2>
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

        {projects.length === 0 && (
          <p className={styles.empty}>Nothing here yet.</p>
        )}
      </div>
    </>
  );
}
