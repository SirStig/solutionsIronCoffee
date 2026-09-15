import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { showcases } from '../demos';
import { TEMPLATE_BLURBS } from '../demos/templates';
import DemoImage from '../demos/components/DemoImage';
import { initials } from '../demos/components/DemoNav';
import styles from './Templates.module.css';

const KIND_LABEL: Record<string, string> = {
  food: 'Restaurant and food',
  retail: 'Shop and retail',
  booking: 'Salon and appointments',
  professional: 'Clinic and practice',
  trades: 'Trades and contractors',
};

/**
 * The public gallery. Four finished sample sites, each a real page rather than
 * a screenshot, so a prospect can open one on their phone and scroll it.
 */
export default function Templates() {
  return (
    <>
      <Seo
        title="Website templates for small businesses"
        description="Four finished sample websites for restaurants, salons, trades and clinics. Built to load fast on a phone and turn visitors into phone calls."
        path="/templates"
      />

      <div className="container-wide">
        <header className={styles.header}>
          <h1>Sample sites you can actually open.</h1>
          <p className={styles.lede}>
            Each of these is a working website, not a picture of one. Open them
            on your phone, tap the buttons, scroll the menus. Yours would be
            built the same way, with your photos, your colors and your hours.
          </p>
        </header>

        <div className={styles.grid}>
          {showcases.map((demo) => (
            <Link
              key={demo.slug}
              to={`/templates/${demo.slug}`}
              className={styles.card}
            >
              {/* The sample's own hero shot. <DemoImage> falls back to a
                  gradient built from the brand colours for any sample whose
                  photography has not been gathered yet, so a new card never
                  lands in the gallery as a broken frame. */}
              <div className={styles.swatch}>
                <DemoImage
                  name={demo.hero.image}
                  alt={`${demo.business.name} sample site`}
                  mark={initials(demo.business.name)}
                  sizes="(min-width: 640px) 34vw, 100vw"
                />
              </div>

              <div className={styles.body}>
                <span className={styles.kind}>
                  {KIND_LABEL[demo.template] ?? demo.template}
                </span>
                <h2 className={styles.name}>{demo.business.name}</h2>
                <p className={styles.blurb}>
                  {TEMPLATE_BLURBS[demo.template]}
                </p>
                <span className={styles.view}>Open the sample</span>
              </div>
            </Link>
          ))}
        </div>

        <p className={styles.note}>
          Every business on this page is invented. Real clients get a preview
          built from their own photos and information, and those are never
          published here without written permission.
        </p>

        <div className={styles.cta}>
          <Link to="/services" className={styles.ctaBtn}>
            See pricing
          </Link>
          <span className={styles.ctaNote}>
            Fixed prices, no retainer, no surprise invoice.
          </span>
        </div>
      </div>
    </>
  );
}
