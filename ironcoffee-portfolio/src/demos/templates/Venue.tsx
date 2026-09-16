import { Calendar, MapPin, Phone } from 'lucide-react';
import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoImage from '../components/DemoImage';
import DemoOutro from '../components/DemoOutro';
import { FaqList, PullQuote, StatementBand } from '../components/blocks';
import { BusinessForm } from '../components/forms';
import { Parallax, Reveal, Rise } from '../components/motion';
import { Bleed, Cta, Section, SectionHead } from '../components/primitives';
import { directionsHref, telHref } from '../index';
import { homeNavLinks, type NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * The one that is showing off.
 *
 * Every other template answers "can this person build me a website". A gallery
 * of five competent small business sites does that well and does not answer
 * the question that actually decides it, which is "are they any good". This
 * page is the answer: a pinned horizontal gallery, scroll-scrubbed parallax, a
 * four-season switcher that runs on radio inputs, and a headline that arrives
 * a line at a time.
 *
 * None of it is JavaScript. It is `animation-timeline`, `position: sticky` and
 * the `:has()` selector, which means it costs nothing to run, it cannot jank,
 * and on a browser that does not support any of it the page renders as a
 * perfectly ordinary, perfectly finished venue site. That degradation is the
 * point. A demo that only impresses on the machine it was built on is not a
 * demonstration of anything.
 */
export default function VenueTemplate({ config }: { config: DemoConfig }) {
  const anchors: NavLink[] = [
    { label: 'The barn', href: '#spaces' },
    { label: 'Seasons', href: '#seasons' },
    { label: 'Packages', href: '#packages' },
    { label: 'Visit', href: '#enquire' },
  ];
  const links = homeNavLinks(config, anchors);

  const [g0, g1, g2, g3, g4, g5] = config.gallery;
  const headline = config.hero.headline.split(' / ');

  return (
    <DemoShell config={config} links={links} navVariant="centered">
      {/* A hairline that fills as the page scrolls. Two rules of CSS, and it
          is the first thing that tells a visitor this was not assembled from
          a template. */}
      <div className={styles.progress} aria-hidden="true">
        <div className={styles.progressBar} />
      </div>

      {/* --- Hero. The photograph drifts and dims as it leaves. ----------- */}
      <section className={styles.vHero} id="top">
        <div className={styles.vHeroMedia}>
          <DemoImage
            name={config.hero.image}
            alt={`${config.business.name}, ${config.business.city}`}
            sizes="100vw"
            priority
          />
        </div>
        <div className={styles.vHeroScrim} aria-hidden="true" />
        <div className={styles.vHeroInner}>
          <h1 className={styles.vHeroHeadline}>
            <Reveal lines={headline} />
          </h1>
          <p className={styles.vHeroSub}>{config.hero.sub}</p>
          <div className={styles.vHeroActions}>
            <Cta href={config.hero.ctaHref} variant="onDark">
              {config.hero.ctaLabel}
            </Cta>
            {config.business.phone && (
              <Cta href={telHref(config.business.phone)} variant="ghost">
                <Phone size={17} aria-hidden="true" />
                {config.business.phone}
              </Cta>
            )}
          </div>
        </div>
        <span className={styles.vScrollHint} aria-hidden="true" />
      </section>

      {config.marquee?.length ? (
        <div className={styles.vFacts}>
          <div className={styles.container}>
            <ul className={styles.vFactList}>
              {config.marquee.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* --- A statement, set enormous, with nothing else on the screen. -- */}
      <Section>
        <Rise>
          <p className={styles.vStatement}>{config.about.body}</p>
        </Rise>
      </Section>

      {/* --- Pinned horizontal gallery. -----------------------------------
          The tall outer element is the scroll distance; the sticky inner one
          stays put while the track slides sideways across it. */}
      <section className={styles.vTrackOuter} id="spaces">
        <div className={styles.vTrackSticky}>
          <div className={styles.vTrack}>
            <div className={styles.vTrackLead}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowRule} aria-hidden="true" />
                The spaces
              </span>
              <h2 className={styles.vTrackTitle}>Four rooms and a meadow.</h2>
              <p className={styles.vTrackSub}>
                Keep scrolling. The page moves sideways.
              </p>
            </div>
            {[g0, g1, g2, g3, g4].filter(Boolean).map((image, i) => (
              <figure key={image} className={styles.vTrackItem}>
                <DemoImage
                  name={image}
                  alt={`${config.business.name}, ${SPACE_LABELS[i]}`}
                  sizes="60vw"
                />
                <figcaption>{SPACE_LABELS[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- Seasons. Radio inputs and :has(), no script. ------------------ */}
      <Section id="seasons" tone="alt">
        <SectionHead
          eyebrow="All year"
          title="The same place, four times over"
          sub="Pick one."
        />
        <div className={styles.seasons}>
          {SEASONS.map((season, i) => (
            <input
              key={season.id}
              type="radio"
              name="season"
              id={`season-${season.id}`}
              className={styles.seasonInput}
              defaultChecked={i === 0}
            />
          ))}
          <div className={styles.seasonTabs} role="presentation">
            {SEASONS.map((season) => (
              <label key={season.id} htmlFor={`season-${season.id}`}>
                {season.label}
              </label>
            ))}
          </div>
          <div className={styles.seasonStage}>
            {SEASONS.map((season, i) => (
              <figure key={season.id} className={styles.seasonPane}>
                <DemoImage
                  name={config.gallery[season.image] ?? g0}
                  alt={`${config.business.name} in ${season.label.toLowerCase()}`}
                  sizes="(min-width: 60rem) 66vw, 100vw"
                  priority={i === 0}
                />
                <figcaption>{season.note}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Alternating parallax features. ------------------------------- */}
      <Section>
        <div className={styles.vFeatures}>
          {config.services.slice(0, 3).map((service, i) => (
            <article
              key={service.title}
              className={[styles.vFeature, i % 2 === 1 && styles.reversed]
                .filter(Boolean)
                .join(' ')}
            >
              <Parallax className={styles.vFeatureMedia}>
                <DemoImage
                  name={config.gallery[(i + 1) % config.gallery.length] ?? g0}
                  alt=""
                  sizes="(min-width: 60rem) 50vw, 100vw"
                />
              </Parallax>
              <Rise className={styles.vFeatureCopy}>
                <span className={styles.vFeatureIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.vFeatureTitle}>{service.title}</h3>
                <p className={styles.vFeatureBody}>{service.body}</p>
                {service.price && (
                  <p className={styles.vFeaturePrice}>{service.price}</p>
                )}
              </Rise>
            </article>
          ))}
        </div>
      </Section>

      {config.testimonials?.length ? (
        <Bleed tone="deep">
          <PullQuote items={config.testimonials} />
        </Bleed>
      ) : (
        <StatementBand
          image={g5 ?? g0}
          line={config.business.tagline}
          business={config.business.name}
          kicker={`${config.business.city}, ${config.business.state}`}
        />
      )}

      {/* --- Packages. ---------------------------------------------------- */}
      {config.products?.length ? (
        <Section id="packages">
          <SectionHead
            eyebrow="What it costs"
            title="Three ways to book it"
            sub="Every one includes the barn, the meadow, tables, chairs and someone here all day."
            align="center"
          />
          <div className={styles.vPackages}>
            {config.products[0].items.map((pkg, i) => (
              <Rise key={pkg.name} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article className={styles.vPackage}>
                  <h3 className={styles.vPackageName}>{pkg.name}</h3>
                  {pkg.price && (
                    <p className={styles.vPackagePrice}>{pkg.price}</p>
                  )}
                  {pkg.desc && <p className={styles.vPackageBody}>{pkg.desc}</p>}
                  {pkg.availability && (
                    <p className={styles.vPackageNote}>{pkg.availability}</p>
                  )}
                </article>
              </Rise>
            ))}
          </div>
        </Section>
      ) : null}

      {config.faq?.length ? (
        <Section tone="alt" narrow>
          <SectionHead title="Before you ask" />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      {/* --- Enquiry. ----------------------------------------------------- */}
      <Section id="enquire" tone="dark">
        <SectionHead
          eyebrow="Dates"
          title="Tell us when"
          sub="We hold a date for seven days with no deposit while you think about it."
        />
        <div className={styles.visitGrid}>
          <BusinessForm config={config} variant="quote" />
          <div className={styles.visitAside}>
            <ul className={styles.vMeta}>
              <li>
                <MapPin size={17} aria-hidden="true" />
                <span>
                  {config.business.address}
                  <br />
                  {config.business.city}, {config.business.state}
                </span>
              </li>
              {config.business.phone && (
                <li>
                  <Phone size={17} aria-hidden="true" />
                  <a href={telHref(config.business.phone)}>
                    {config.business.phone}
                  </a>
                </li>
              )}
              <li>
                <Calendar size={17} aria-hidden="true" />
                <span>Tours most Saturdays, by appointment</span>
              </li>
            </ul>
            <Cta href={directionsHref(config)} variant="onDark">
              Get directions
            </Cta>
          </div>
        </div>
      </Section>

      <DemoOutro config={config} />
    </DemoShell>
  );
}

const SPACE_LABELS = [
  'The meadow',
  'The ceremony lawn',
  'The barn, set for dinner',
  'The long tables',
  'The loft',
];

/** `image` indexes into `config.gallery`, so a config can reorder its own year. */
const SEASONS = [
  { id: 'spring', label: 'Spring', image: 1, note: 'Green through to mid June. Cool mornings, long light.' },
  { id: 'summer', label: 'Summer', image: 0, note: 'Wildflowers from July. The meadow is at its best.' },
  { id: 'autumn', label: 'Autumn', image: 4, note: 'Aspens turn the last week of September, most years.' },
  { id: 'winter', label: 'Winter', image: 5, note: 'Heated barn, snow outside, and the whole place to yourselves.' },
];
