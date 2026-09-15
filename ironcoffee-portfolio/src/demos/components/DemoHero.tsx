import { Phone } from 'lucide-react';
import type { DemoConfig } from '../types';
import { telHref } from '../index';
import DemoImage from './DemoImage';
import { Cta } from './primitives';
import styles from '../Demo.module.css';

/**
 * Full-bleed hero. The photo is the only image on the page marked `priority`,
 * so it is the largest contentful paint and nothing else competes with it.
 */
export default function DemoHero({ config }: { config: DemoConfig }) {
  const { hero, business } = config;

  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroMedia}>
        {/* No initials here. A mark centered behind the headline reads as a
            broken image rather than as branding, and the hero already says the
            name twice. */}
        <DemoImage
          name={hero.image}
          alt={`${business.name} in ${business.city}, ${business.state}`}
          sizes="100vw"
          priority
        />
      </div>
      <div className={styles.heroScrim} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroHeadline}>{hero.headline}</h1>
          <p className={styles.heroSub}>{hero.sub}</p>

          <div className={styles.heroActions}>
            <Cta href={hero.ctaHref}>{hero.ctaLabel}</Cta>
            {business.phone && (
              <Cta href={telHref(business.phone)} variant="ghost">
                <Phone size={17} aria-hidden="true" />
                {business.phone}
              </Cta>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
