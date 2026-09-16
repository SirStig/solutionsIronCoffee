import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Img from '../components/Img';
import { site } from '../content/site';
import { sampleFeatures, showcases } from '../demos';
import { TEMPLATE_BLURBS } from '../demos/templates';
import styles from './Templates.module.css';

/** What each sample is demonstrating, so the gallery reads as a price ladder. */
const TIER_LABEL: Record<string, string> = {
  starter: 'One page · $500',
  standard: 'Full site · $1,800',
  custom: 'Wired in · from $3,200',
};

const KIND_LABEL: Record<string, string> = {
  food: 'Restaurant and food',
  retail: 'Shop and retail',
  booking: 'Salon and appointments',
  professional: 'Clinic and practice',
  trades: 'Trades and contractors',
};

/** True of every sample, so it belongs on the page once rather than five times. */
const EVERY_ONE = [
  'Written for you, not filled with placeholder text',
  'Built to read properly on a phone first',
  'Tap to call, tap for directions, tap to book',
  'Your own domain, your own files, yours to take',
];

/**
 * The public gallery.
 *
 * Two changes carry this page. The cards became rows, because four cards in a
 * two by two grid is the layout of a blog index and nothing about it says
 * "look at the craft". And the pictures became screenshots of the actual
 * pages, taken by `scripts/capture-samples.mjs`, because the previous version
 * illustrated a page about websites with photographs of brisket and haircuts.
 * A prospect comparing this with Squarespace's showcase saw stock photography
 * where the competition shows screens, and drew the obvious conclusion.
 */
export default function Templates() {
  const collectionSchema = {
    '@type': 'CollectionPage',
    '@id': `${site.url}/templates#collection`,
    name: 'Sample small business websites',
    url: `${site.url}/templates`,
    about: 'Finished sample websites for small businesses, built by Joshua Kac',
    /* CreativeWork, not LocalBusiness. These businesses do not exist, and
       every local type requires an address and a phone number that would have
       to be invented to fill it in. Describing the collection is honest;
       describing the members as real businesses is not. */
    hasPart: showcases.map((demo) => ({
      '@type': 'CreativeWork',
      name: `${demo.business.name} sample site`,
      url: `${site.url}/templates/${demo.slug}`,
    })),
  };

  return (
    <>
      <Seo
        title="Sample small business websites"
        description="Finished sample websites for restaurants, salons, trades, clinics and shops. Real working pages you can open on your phone, not screenshots."
        path="/templates"
        image="/og-templates.png"
        jsonLd={collectionSchema}
      />

      <div className="container-wide">
        <header className={styles.header}>
          <p className={styles.kicker}>Samples</p>
          <h1 className={styles.h1}>Every one of these is a real website.</h1>
          <p className={styles.lede}>
            Not a picture of one. Open them, tap the buttons, scroll the menus,
            fill in the forms. Yours would be built the same way, with your
            photos and your words.
          </p>
        </header>

        <div className={styles.rows}>
          {showcases.map((demo, i) => (
            <article
              key={demo.slug}
              className={[styles.row, i % 2 === 1 && styles.reversed]
                .filter(Boolean)
                .join(' ')}
            >
              {/* A plain span, not a second link. The business name below
                  already links to this page and covers the whole row through
                  its ::after overlay, so a link here would be a duplicate
                  destination with no accessible name on it. The hover
                  animation keys off :hover, which a span has too. */}
              <span className={styles.shots}>
                {/* A screenshot, framed. The chrome is three dots and a bar:
                    enough for the eye to read "browser" without pretending to
                    be a specific one. */}
                <span className={styles.browser}>
                  <span className={styles.chrome} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.browserShot}>
                    <Img
                      name={`templates/${demo.slug}-desktop`}
                      alt=""
                      sizes="(min-width: 64rem) 46vw, 92vw"
                    />
                  </span>
                </span>
                <span className={styles.phone}>
                  <Img
                    name={`templates/${demo.slug}-phone`}
                    alt=""
                    sizes="(min-width: 64rem) 12vw, 26vw"
                  />
                </span>
              </span>

              <div className={styles.copy}>
                <p className={styles.kind}>
                  {KIND_LABEL[demo.template] ?? demo.template}
                </p>
                <h2 className={styles.name}>
                  <Link to={`/templates/${demo.slug}`} className={styles.nameLink}>
                    {demo.business.name}
                  </Link>
                </h2>
                <p className={styles.blurb}>{TEMPLATE_BLURBS[demo.template]}</p>

                <ul className={styles.chips}>
                  {sampleFeatures(demo).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <p className={styles.open}>
                  <span className={styles.openLabel}>
                    Open the sample
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                  {demo.tier && (
                    <span className={styles.tier}>{TIER_LABEL[demo.tier]}</span>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className={styles.every}>
          <h2 className={styles.everyTitle}>In every one of them</h2>
          <ul className={styles.everyList}>
            {EVERY_ONE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Want to see yours?</h2>
          <p className={styles.ctaBody}>
            I will build the first version before you pay anything. Look at it,
            then decide.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/services" className={styles.btnPrimary}>
              See what it costs
            </Link>
            <a href={`mailto:${site.email}`} className={styles.btnOnDark}>
              Email me
            </a>
          </div>
        </section>

        <p className={styles.note}>
          Every business on this page is invented. Real clients get a preview
          built from their own photos and information, and those are never
          published here without written permission.
        </p>
      </div>
    </>
  );
}
