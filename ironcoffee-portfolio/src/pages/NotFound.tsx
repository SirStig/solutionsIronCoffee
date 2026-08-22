import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { nav } from '../content/site';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Not found"
        description="That page doesn't exist."
        path="/404"
        noindex
      />

      <div className={`container-wide ${styles.wrap}`}>
        <p className={styles.code}>404</p>
        <h1>That page doesn&rsquo;t exist.</h1>
        <p className={styles.text}>
          It may have moved, or it may never have been here. Either way, try one
          of these.
        </p>

        <ul className={styles.links}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
