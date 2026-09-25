import type { ReactNode } from 'react';
import { Phone } from 'lucide-react';
import type { DemoConfig } from '../types';
import { artName, telHref } from '../index';
import DemoImage from './DemoImage';
import { Cta } from './primitives';
import styles from '../Demo.module.css';

/**
 * Hero layouts.
 *
 * The point of having five is that five businesses should not open the same
 * way. A smokehouse wants the food filling the screen; a salon wants calm and
 * a booking button; a roofer wants a quote form before you have scrolled; a
 * dental practice wants the offer and the reassurance up front; a feed store
 * wants to tell you what is in stock today.
 */
export type HeroVariant = 'full' | 'split' | 'panel' | 'centered' | 'strip';

function Actions({
  config,
  onDark,
  center = false,
}: {
  config: DemoConfig;
  onDark: boolean;
  center?: boolean;
}) {
  const { hero, business } = config;
  const callFirst = hero.ctaHref.startsWith('tel:');

  return (
    <div
      className={[styles.heroActions, center && styles.heroActionsCenter]
        .filter(Boolean)
        .join(' ')}
    >
      <Cta href={hero.ctaHref} variant={onDark ? 'onDark' : 'primary'}>
        {/* When the one action is the phone call, print the number on it.
            Someone on a laptop cannot tap "Call the Shop", and a second
            button beside it would dial the same number twice over. */}
        {callFirst && business.phone ? (
          <>
            <Phone size={17} aria-hidden="true" />
            {hero.ctaLabel}: {business.phone}
          </>
        ) : (
          hero.ctaLabel
        )}
      </Cta>
      {business.phone && !callFirst && (
        <Cta href={telHref(business.phone)} variant={onDark ? 'ghost' : 'outline'}>
          <Phone size={17} aria-hidden="true" />
          {business.phone}
        </Cta>
      )}
    </div>
  );
}

/**
 * `over` means the headline sits on top of the media rather than beside it.
 *
 * It decides two things at once. A drawing switches to its light-on-deep
 * colorway so the copy has a known ground, and the scrim over it drops to
 * almost nothing, because a scrim heavy enough to rescue white text from a
 * bright photograph flattens an illustration into a silhouette.
 */
function Media({
  config,
  priority = true,
  over = false,
}: {
  config: DemoConfig;
  priority?: boolean;
  over?: boolean;
}) {
  const { hero, business } = config;
  // A drawing describes itself (see DemoImage). A stock photograph must not
  // claim to show the business it sits under.
  const alt =
    config.placeholderPhotos && !artName(hero.image)
      ? `Sample photograph, not taken at ${business.name}`
      : `${business.name} in ${business.city}, ${business.state}`;
  return (
    <DemoImage
      name={hero.image}
      alt={alt}
      // On a phone the hero is a tall portrait box and the photo is cropped
      // to cover it, so it renders two to three times wider than the
      // viewport. Saying 100vw there picked the 420px file and stretched it.
      sizes="(max-width: 48rem) 250vw, 100vw"
      priority={priority}
      artTone={over ? 'dark' : 'light'}
    />
  );
}

export default function DemoHero({
  config,
  variant = 'full',
  aside,
  note,
}: {
  config: DemoConfig;
  variant?: HeroVariant;
  /** Panel variant only: the card that sits over the image. */
  aside?: ReactNode;
  /** Strip variant only: the running line under the image. */
  note?: ReactNode;
}) {
  const { hero } = config;

  // A drawing needs a far lighter scrim than a photograph does. See <Media>.
  const scrimClass = [styles.heroScrim, artName(hero.image) && styles.heroScrimArt]
    .filter(Boolean)
    .join(' ');

  /* --- Full bleed. Photo first, copy over it. ---------------------------- */
  if (variant === 'full') {
    return (
      <section className={styles.hero} id="top">
        <div className={styles.heroMedia}>
          <Media config={config} over />
        </div>
        <div className={scrimClass} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroHeadline}>{hero.headline}</h1>
            <p className={styles.heroSub}>{hero.sub}</p>
            <Actions config={config} onDark />
          </div>
        </div>
      </section>
    );
  }

  /* --- Split. Solid color panel beside the photograph. ------------------ */
  if (variant === 'split') {
    return (
      <section className={styles.heroSplit} id="top">
        <div className={styles.heroSplitCopy}>
          <div className={styles.heroSplitInner}>
            <h1 className={styles.heroHeadline}>{hero.headline}</h1>
            <p className={styles.heroSub}>{hero.sub}</p>
            <Actions config={config} onDark />
          </div>
        </div>
        <div className={styles.heroSplitMedia}>
          <Media config={config} />
        </div>
      </section>
    );
  }

  /* --- Panel. Photo, copy, and a card of its own over the top. ----------- */
  if (variant === 'panel') {
    return (
      <section className={styles.hero} id="top">
        <div className={styles.heroMedia}>
          <Media config={config} over />
        </div>
        <div className={scrimClass} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroPanelGrid}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroHeadline}>{hero.headline}</h1>
              <p className={styles.heroSub}>{hero.sub}</p>
              <Actions config={config} onDark />
            </div>
            {aside && <div className={styles.heroAside}>{aside}</div>}
          </div>
        </div>
      </section>
    );
  }

  /* --- Centered. Light, calm, photograph demoted to a band below. -------- */
  if (variant === 'centered') {
    return (
      <section className={styles.heroCentered} id="top">
        <div className={styles.container}>
          <div className={styles.heroCenteredCopy}>
            <h1 className={styles.heroCenteredHeadline}>{hero.headline}</h1>
            <p className={styles.heroCenteredSub}>{hero.sub}</p>
            <Actions config={config} onDark={false} center />
          </div>
        </div>
        <div className={styles.heroBand}>
          <div className={styles.container}>
            <div className={styles.heroBandMedia}>
              <Media config={config} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* --- Strip. Short image band with a live note running under it. -------- */
  return (
    <section className={styles.heroStrip} id="top">
      <div className={styles.heroStripMedia}>
        <Media config={config} over />
        <div className={scrimClass} aria-hidden="true" />
        <div className={styles.heroStripInner}>
          <h1 className={styles.heroStripHeadline}>{hero.headline}</h1>
          <p className={styles.heroSub}>{hero.sub}</p>
          <Actions config={config} onDark />
        </div>
      </div>
      {note && <div className={styles.heroNote}>{note}</div>}
    </section>
  );
}
