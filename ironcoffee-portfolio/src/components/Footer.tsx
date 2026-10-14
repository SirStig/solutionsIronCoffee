import { Link } from 'react-router-dom';
import { nav, site } from '../content/site';
import SocialLinks from './SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.about}>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.blurb}>{site.description}</p>
            <SocialLinks />
          </div>

          <nav className={styles.links} aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
            <Link to="/contact">Contact</Link>
            <a href="/rss.xml">RSS</a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {site.company}
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
