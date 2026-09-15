import { Phone } from 'lucide-react';
import type { DemoConfig } from '../types';
import { telHref } from '../index';
import DemoImage from './DemoImage';
import { Cta } from './primitives';
import styles from '../Demo.module.css';

/** Two or three letters for the logo stand-in: 'Ridgeline Smokehouse' → 'RS'. */
export function initials(name: string): string {
  return name
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Sticky header. No hamburger menu: the links collapse away under 900px and the
 * one action that matters is duplicated in the fixed call bar at the bottom of
 * the screen, which is where a thumb already is.
 */
export default function DemoNav({
  config,
  links,
}: {
  config: DemoConfig;
  links: NavLink[];
}) {
  const { business, brand, hero } = config;

  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <a className={styles.navBrand} href="#top">
          {brand.logo ? (
            <div className={styles.navLogo}>
              <DemoImage
                name={brand.logo}
                alt={`${business.name} logo`}
                mark={initials(business.name)}
                sizes="40px"
                priority
              />
            </div>
          ) : (
            <span
              className={styles.navMark}
              aria-hidden="true"
              /* Three letters do not fit a 40px square at the base size. */
              style={{
                fontSize: initials(business.name).length > 2 ? '0.8125rem' : '1rem',
              }}
            >
              {initials(business.name)}
            </span>
          )}

          <span className={styles.navName}>
            {business.name}
            <span className={styles.navCity}>
              {business.city}, {business.state}
            </span>
          </span>
        </a>

        <nav className={styles.navLinks} aria-label="Sections">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className={styles.navPhone} href={telHref(business.phone)}>
          <Phone size={16} aria-hidden="true" />
          {business.phone}
        </a>

        <Cta href={hero.ctaHref} className={styles.navCta}>
          {hero.ctaLabel}
        </Cta>
      </div>
    </header>
  );
}
