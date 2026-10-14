import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import SocialLinks from '../components/SocialLinks';
import ProjectCard from '../components/ProjectCard';
import { featuredProjects, getProject } from '../content/projects';
import { formatDate, posts } from '../content/blog';
import { site } from '../content/site';
import styles from './Home.module.css';

const personSchema = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: site.email,
  jobTitle: 'Software Engineer',
  description: site.description,
  sameAs: [
    'https://github.com/SirStig',
    'https://www.linkedin.com/in/joshua-kac-aa50b7131',
  ],
  worksFor: { '@type': 'Organization', name: site.company },
  makesOffer: { '@id': `${site.url}/services#service` },
};

export default function Home() {
  const recentPosts = posts.slice(0, 3);
  const lead = [getProject('eaglechair'), getProject('beyond25')].flatMap((project) =>
    project ? [project] : [],
  );
  const showcase = [
    ...lead,
    ...featuredProjects.filter((project) => !lead.some((item) => item.slug === project.slug)),
  ].slice(0, 4);

  return (
    <>
      <Seo path="/" jsonLd={personSchema} />

      {/* --- Intro ------------------------------------------------------- */}
      <section className={`container-wide ${styles.intro}`}>
        <Img
          name="profile"
          alt="Joshua Kac"
          className={styles.avatar}
          aspectRatio="1 / 1"
          sizes="120px"
          priority
        />

        <h1 className={styles.hi}>Hey, I&rsquo;m Joshua.</h1>

        <div className={styles.lede}>
          <p>
            I&rsquo;m a software engineer. I build apps end to end: the
            backend, the mobile app, the web app and the infrastructure under
            all three. And I ship them to real people rather than to a
            portfolio.
          </p>
          <p>
            The work to look at is{' '}
            <Link to="/work/eaglechair">EagleChair</Link>, a catalog and CMS for
            a chair maker in Houston. Most of my time still goes to{' '}
            <Link to="/work/beyond25">Beyond25</Link>, an AI music curator on
            iOS, Android, Mac and the web. <Link to="/work/ourlee">Ourlee</Link>{' '}
            is a quiet shared space for couples, in closed beta. Before those I
            spent a year on <Link to="/work/project-yoked">Project Yoked</Link>{' '}
            and learned more from it not working out than from anything that did.
          </p>
          <p>
            I build with AI heavily and say so openly.{' '}
            <Link to="/about">Here&rsquo;s how I actually use it</Link>.
          </p>
          <p>
            I take client work too.{' '}
            <Link to="/services">Here&rsquo;s what it costs</Link>.
          </p>
        </div>

        <SocialLinks />

        <p className={styles.available}>
          Open to contract work and engineering roles.{' '}
          <Link to="/contact">Get in touch →</Link>
        </p>
      </section>

      {/* --- Selected work ------------------------------------------------ */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>Things I&rsquo;ve built</h2>
          <Link to="/work" className={styles.seeAll}>
            All work <ArrowRight size={15} aria-hidden />
          </Link>
        </div>

        <ul className={styles.grid}>
          {showcase.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={i === 0}
            />
          ))}
        </ul>
      </section>

      {/* --- Writing ------------------------------------------------------ */}
      {recentPosts.length > 0 && (
        <section className={`container-wide ${styles.section}`}>
          <div className={styles.sectionHead}>
            <h2>Writing</h2>
            <Link to="/blog" className={styles.seeAll}>
              All posts <ArrowRight size={15} aria-hidden />
            </Link>
          </div>

          <ul className={styles.postList}>
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className={styles.post}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.postMeta}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden> · </span>
                    {post.readingTime} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
