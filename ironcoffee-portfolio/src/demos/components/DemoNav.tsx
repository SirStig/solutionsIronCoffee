import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Menu, Phone } from 'lucide-react';
import type { DemoConfig } from '../types';
import { telHref } from '../index';
import DemoImage from './DemoImage';
import { Cta } from './primitives';
import styles from '../Demo.module.css';

/**
 * Two or three letters for the logo stand-in: 'Ridgeline Smokehouse' → 'RS'.
 *
 * Also used for a team member's portrait, which is why it drops a title and
 * the letters after a comma. 'Dr. Alison Park, DDS' came out as 'DAP', and an
 * apostrophe used to become a word break, so "Jill's Feed" became 'JSF'.
 */
export function initials(name: string): string {
  return name
    .split(',')[0]
    .replace(/['’]/g, '')
    .replace(/^(dr|mr|mrs|ms|mx)\.?\s+/i, '')
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Nav links for a demo's home page.
 *
 * On a one-page demo these are the in-page anchors the template passes in.
 *
 * A multi-page site navigates to pages, not to anchors. Without this the
 * interior pages were built, sitemapped and completely unreachable: the nav
 * still pointed at #menu and #visit on the home page itself, so four of the
 * six pages had no link to them anywhere on the site.
 */
export function homeNavLinks(
  config: DemoConfig,
  anchors: NavLink[]
): NavLink[] {
  if (!config.pages?.length) return anchors;

  const base = config.showcase
    ? `/templates/${config.slug}`
    : `/demo/${config.slug}`;

  return config.pages.map((page) => ({
    label: page.label,
    href: `${base}/${page.slug}`,
  }));
}

/**
 * Nav links for an interior page of a multi-page demo.
 *
 * The home page's anchors would point at sections that are not on this page,
 * so only real page links are offered, with the current page left out.
 */
export function pageNavLinks(
  config: DemoConfig,
  currentPageSlug?: string
): NavLink[] {
  const base = config.showcase
    ? `/templates/${config.slug}`
    : `/demo/${config.slug}`;

  return [
    { label: 'Home', href: base },
    ...(config.pages ?? [])
      .filter((page) => page.slug !== currentPageSlug)
      .map((page) => ({ label: page.label, href: `${base}/${page.slug}` })),
  ];
}

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Sticky header.
 *
 * Below the width where the links fit on one row they move into a menu. The
 * one action that matters is still duplicated in the fixed call bar at the
 * bottom of a phone screen, which is where a thumb already is, but the call
 * bar cannot reach the other pages of a multi-page demo and the menu can.
 */
export default function DemoNav({
  config,
  links,
  variant = 'default',
  subPage = false,
}: {
  config: DemoConfig;
  links: NavLink[];
  /** 'centered' stacks the name over the links, which reads calmer. */
  variant?: 'default' | 'centered';
  /** On an interior page the home page's anchors do not exist here. */
  subPage?: boolean;
}) {
  const { business, brand, hero } = config;
  const base = config.showcase
    ? `/templates/${config.slug}`
    : `/demo/${config.slug}`;

  // An interior page has no #menu or #quote to scroll to, so a bare anchor has
  // to become a link back to the home page that does.
  const brandHref = subPage ? base : '#top';
  const heroCtaHref = hero.ctaHref.startsWith('#')
    ? subPage
      ? `${base}${hero.ctaHref}`
      : hero.ctaHref
    : hero.ctaHref;

  // A text link that says what the button beside it says, or goes where it
  // goes, reads as the same thing twice ("Quote" next to "Get a Quote"). The
  // row of links only shows at widths where the button shows too, so it drops
  // the duplicate. When the words match but the link is a page of its own
  // (a multi-page site's "Get a quote" page), the button takes over that
  // page's address so the page stays reachable. The small-screen menu keeps
  // every link, because below 900px the button is hidden.
  const sameWords = (label: string) =>
    label.trim().toLowerCase() === hero.ctaLabel.trim().toLowerCase();
  const namesake = links.find(
    (link) => sameWords(link.label) && !link.href.startsWith('#')
  );
  const ctaHref = namesake?.href ?? heroCtaHref;
  const rowLinks = links.filter(
    (link) =>
      link.href !== ctaHref &&
      link.href !== heroCtaHref &&
      link.href !== hero.ctaHref &&
      !sameWords(link.label)
  );

  return (
    <header
      className={[styles.nav, variant === 'centered' && styles.navCentered]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.navInner}>
        <a className={styles.navBrand} href={brandHref}>
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
          {rowLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {business.phone && (
          <a className={styles.navPhone} href={telHref(business.phone)}>
            <Phone size={16} aria-hidden="true" />
            {business.phone}
          </a>
        )}

        {(links.length > 0 || business.phone) && (
          <MenuDisclosure>
            {/* Picking an anchor scrolls the page but leaves a <details>
                open over it, so a click anywhere in the list closes it. */}
            <ul
              className={styles.navMenuList}
              onClick={(event) =>
                event.currentTarget.closest('details')?.removeAttribute('open')
              }
            >
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              {business.phone && (
                <li>
                  <a href={telHref(business.phone)}>
                    <Phone size={17} aria-hidden="true" />
                    {business.phone}
                  </a>
                </li>
              )}
            </ul>
          </MenuDisclosure>
        )}

        <Cta href={ctaHref} className={styles.navCta}>
          {hero.ctaLabel}
        </Cta>
      </div>
    </header>
  );
}

/**
 * The small-screen menu: a <details>, so it opens without JavaScript, plus the
 * two things a menu is expected to do that a bare <details> does not.
 *
 * Escape closes it and puts focus back on the button, so a keyboard user is
 * not left inside a panel they cannot see the edge of. A tap anywhere outside
 * closes it too, the way every other menu on a phone behaves.
 */
function MenuDisclosure({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const details = ref.current;
      if (!details?.open) return;
      if (event.target instanceof Node && details.contains(event.target)) return;
      details.open = false;
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDetailsElement>) => {
    const details = event.currentTarget;
    if (event.key !== 'Escape' || !details.open) return;
    event.preventDefault();
    details.open = false;
    details.querySelector('summary')?.focus();
  };

  return (
    <details ref={ref} className={styles.navMenu} onKeyDown={onKeyDown}>
      <summary className={styles.navMenuButton}>
        <Menu size={18} aria-hidden="true" />
        Menu
      </summary>
      <div className={styles.navMenuPanel}>{children}</div>
    </details>
  );
}
