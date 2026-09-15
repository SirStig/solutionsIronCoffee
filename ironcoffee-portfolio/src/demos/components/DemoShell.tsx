import type { ReactNode } from 'react';
import type { BrandFont, DemoConfig } from '../types';
import { formatExpiry, fullAddress, telHref } from '../index';
import { site } from '../../content/site';
import DemoNav, { type NavLink } from './DemoNav';
import { CallBar } from './blocks';
import styles from '../Demo.module.css';

const fontClass: Record<BrandFont, string> = {
  sans: styles.fontSans,
  serif: styles.fontSerif,
  slab: styles.fontSlab,
};

/**
 * Wraps a template in everything that is the same for every business: the
 * brand colors, the header, the footer, and the disclosure that has to be on
 * the page whether or not anyone scrolls that far.
 *
 * `showcase` mode is the public gallery version. It says the business is
 * invented instead of saying the preview was built for someone, and it does not
 * carry an expiry date because it never expires.
 */
export default function DemoShell({
  config,
  links,
  children,
  navVariant = 'default',
}: {
  config: DemoConfig;
  links: NavLink[];
  children: ReactNode;
  navVariant?: 'default' | 'centered';
}) {
  const { business, brand } = config;
  const showcase = Boolean(config.showcase);
  const address = fullAddress(config);

  return (
    <div
      className={`${styles.root} ${fontClass[brand.font]}`}
      style={
        {
          '--brand': brand.primary,
          '--brand-deep': brand.secondary,
          '--brand-accent': brand.accent,
        } as React.CSSProperties
      }
    >
      <div className={styles.banner}>
        <p className={styles.bannerInner}>
          <span className={styles.bannerLabel}>
            {showcase ? 'Sample site' : 'Preview'}
          </span>
          <span className={styles.bannerText}>
            {showcase ? (
              <>
                {business.name} is not a real business. This page is a working
                sample of what a finished site looks like.
              </>
            ) : (
              <>
                Built for {business.name} to look at. Live until{' '}
                {formatExpiry(config)}.
              </>
            )}
          </span>
          <a className={styles.bannerLink} href={`${site.url}/services`}>
            {showcase ? 'See pricing' : 'What this costs'}
          </a>
        </p>
      </div>

      <DemoNav config={config} links={links} variant={navVariant} />

      <main>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <p className={styles.footerName}>{business.name}</p>
              <p>{business.tagline}</p>
            </div>

            <div>
              <p className={styles.footerHeading}>Get in touch</p>
              <ul className={styles.footerList}>
                {business.phone && (
                  <li>
                    <a href={telHref(business.phone)}>{business.phone}</a>
                  </li>
                )}
                {business.email && (
                  <li>
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </li>
                )}
                {address && <li>{address}</li>}
                {business.facebookUrl && (
                  <li>
                    <a
                      href={business.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <p className={styles.footerHeading}>Hours</p>
              <ul className={styles.footerList}>
                {config.hours.map((row) => (
                  <li key={row.day} className={styles.footerHoursRow}>
                    <span>{row.day}</span>
                    <span>{row.open}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>
              &copy; {new Date(config.createdAt).getUTCFullYear()}{' '}
              {business.name}
            </span>
            <span>
              {business.city}, {business.state}
            </span>
          </div>
        </div>
      </footer>

      <div className={styles.disclosure}>
        <div className={styles.disclosureInner}>
          {showcase ? (
            <>
              <p>
                Sample site by Joshua Kac.{' '}
                <a href={`${site.url}/templates`}>See the other templates</a> or{' '}
                <a href={`${site.url}/services`}>look at pricing</a>.
              </p>
              <p className={styles.disclosureMeta}>
                {business.name} is a fictional business created to demonstrate
                this template. Any resemblance to a real one is coincidence.
              </p>
            </>
          ) : (
            <>
              <p>
                Website preview built by Joshua Kac.{' '}
                <a href={site.url}>solutions.ironcoffee.com</a>
              </p>
              <p className={styles.disclosureMeta}>
                Not affiliated with {business.name}. This page comes down on
                request, same day.
                {config.placeholderPhotos
                  ? ' The photographs are stand-ins to show the layout; the real site would use your own.'
                  : ' Photos belong to the business.'}
              </p>
            </>
          )}
        </div>
      </div>

      <CallBar config={config} />
    </div>
  );
}
