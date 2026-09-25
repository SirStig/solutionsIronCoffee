import { Calendar, MapPin, Phone } from 'lucide-react';
import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoImage from '../components/DemoImage';
import DemoOutro from '../components/DemoOutro';
import { FaqList, PullQuote, StatementBand } from '../components/blocks';
import { Parallax, Reveal, Rise } from '../components/motion';
import SeatingPlanner from '../components/SeatingPlanner';
import Torch from '../components/Torch';
import AvailabilityBooking from '../venue/public/AvailabilityBooking';
import Lightbox from '../venue/public/Lightbox';
import { Bleed, Cta, Section, SectionHead } from '../components/primitives';
import { demoBase, directionsHref, telHref } from '../index';
import { type NavLink } from '../components/DemoNav';
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
  const venue = config.venue ?? {};
  const seasons = venue.seasons ?? [];
  const spaceLabels = venue.spaceLabels ?? [];

  const anchors: NavLink[] = [
    { label: venue.navSpaces ?? 'Spaces', href: '#spaces' },
    { label: 'Plan', href: '#plan' },
    ...(seasons.length ? [{ label: 'Seasons', href: '#seasons' }] : []),
    ...(config.products?.length ? [{ label: 'Prices', href: '#packages' }] : []),
    { label: 'Visit', href: '#inquire' },
  ];
  /* Anchors *and* the owner view, rather than one or the other.
   *
   * `homeNavLinks` swaps anchors for page links as soon as a config has
   * pages, which is right for a multi-page site where the sections moved onto
   * their own pages. Here the single extra page is a supplement to a long home
   * page, and taking the anchors away left this template with a one-item nav. */
  const links: NavLink[] = [
    ...anchors,
    ...(config.pages ?? []).map((page) => ({
      label: page.label,
      href: `${demoBase(config)}/${page.slug}`,
    })),
  ];

  const [g0, g1, g2, g3, g4] = config.gallery;
  const headline = config.hero.headline.split(' / ');
  /* The same place after dark. Same framing, same camera position, same trees,
     so the torch reveals a moment rather than a different photograph. A second
     shot from somewhere else on the property reads as a mistake. */
  const night = venue.nightImage ?? `demos/${config.slug}/hero-night`;
  /** A distinct picture per slot, cycling, when a config names one that is not there. */
  const pick = (index: number, fallback: number) =>
    config.gallery[index] ??
    config.gallery[fallback % Math.max(1, config.gallery.length)] ??
    config.hero.image;

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
        {/* Golden hour on top, blue hour underneath, revealed under the
            pointer. See <Torch>: it arms itself only where there is a real
            pointer, so this is just the daylight photograph everywhere else. */}
        <Torch>
          <div className={styles.vHeroMedia}>
            <DemoImage
              name={config.hero.image}
              alt={`${config.business.name}, ${config.business.city}`}
              sizes="100vw"
              priority
            />
          </div>
          <div className={`${styles.vHeroMedia} ${styles.torchNight}`}>
            <DemoImage name={night} alt="" sizes="100vw" />
          </div>
        </Torch>
        <span className={styles.torchHint} aria-hidden="true">
          Move the cursor to see it at night
        </span>
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
          <div className={styles.vStatementRow}>
            {venue.statementLabel && (
              <p className={styles.vStatementLabel}>{venue.statementLabel}</p>
            )}
            <p className={styles.vStatement}>{config.about.body}</p>
          </div>
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
              <h2 className={styles.vTrackTitle}>
                {venue.spacesTitle ?? 'Take a look around.'}
              </h2>
              {/* True whether the track slides sideways, stacks on a phone or
                  sits still under reduced motion, which "keep scrolling, it
                  moves sideways" was not. */}
              <p className={styles.vTrackSub}>In the order you would walk through them.</p>
            </div>
            {[g0, g1, g2, g3, g4].filter(Boolean).map((image, i) => (
              <figure key={image} className={styles.vTrackItem}>
                <DemoImage
                  name={image}
                  alt={
                    spaceLabels[i]
                      ? `${config.business.name}, ${spaceLabels[i]}`
                      : config.business.name
                  }
                  sizes="60vw"
                />
                {spaceLabels[i] && <figcaption>{spaceLabels[i]}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- The showpiece. ------------------------------------------------
          Placed here, immediately after the pinned gallery, because a visitor
          who has come this far is convinced the page looks good and is not yet
          convinced anybody built anything. */}
      {/* Tones alternate from here down: alt, plain, alt, plain. Two alt
          sections back to back read as one long band with a seam in it. */}
      <Section id="plan" tone="alt">
        <SectionHead
          eyebrow="Try it"
          title="Will a hundred and twenty people fit?"
          sub="Drag the tables around. Every venue in the country answers this question with a phone call."
        />
        <SeatingPlanner storageKey={`${config.slug}-plan`} />
      </Section>

      {/* --- The photographs, openable. ------------------------------------ */}
      <Section>
        <SectionHead
          eyebrow="Photographs"
          title="The place, unstaged"
          sub="Taken on ordinary days rather than on the one day everything was tidy."
        />
        <Lightbox images={config.gallery} label={`${config.business.name} photographs`} />
      </Section>

      {/* --- Seasons. Radio inputs and :has(), no script. ------------------ */}
      {seasons.length ? (
        <Section id="seasons" tone="alt">
          <SectionHead
            eyebrow="All year"
            title="The same place, four times over"
            sub="Pick one."
          />
          <div className={styles.seasons}>
            {seasons.map((season, i) => (
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
              {seasons.map((season) => (
                <label key={season.id} htmlFor={`season-${season.id}`}>
                  {season.label}
                </label>
              ))}
            </div>
            <div className={styles.seasonStage}>
              {seasons.map((season, i) => (
                <figure key={season.id} className={styles.seasonPane}>
                  <DemoImage
                    name={pick(season.image, i)}
                    alt={`${config.business.name} in ${season.label.toLowerCase()}`}
                    sizes="(min-width: 60rem) 66vw, 100vw"
                  />
                  <figcaption>{season.note}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

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
                  name={pick((i + 1) % Math.max(1, config.gallery.length), i + 1)}
                  alt=""
                  sizes="(min-width: 60rem) 50vw, 100vw"
                />
              </Parallax>
              <Rise>
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
          motif={config.brand.motif}
          image={pick(5, 5)}
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
            title={waysToBook(config.products[0].items.length)}
            sub={venue.packagesSub}
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

      {/* --- Inquiry. -----------------------------------------------------
          The booking flow is the form. There used to be a second, generic
          quote form underneath it, which was wrong twice over: it overlapped
          the booking card at wide widths, and it carried the trades template's
          copy, so a wedding venue was asking for a property address and
          offering a free roof inspection. */}
      <Section id="inquire" tone="dark">
        <SectionHead
          eyebrow="Dates"
          title="Tell us when"
          sub={venue.holdPolicy}
        />

        <div className={styles.vInquire}>
          <AvailabilityBooking config={config} />

          <aside className={styles.vInquireAside}>
            <ul className={styles.vMeta}>
              <li>
                <MapPin size={17} aria-hidden="true" />
                <span>
                  {config.business.address && (
                    <>
                      {config.business.address}
                      <br />
                    </>
                  )}
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
              {venue.tours && (
                <li>
                  <Calendar size={17} aria-hidden="true" />
                  <span>{venue.tours}</span>
                </li>
              )}
            </ul>
            <Cta href={directionsHref(config)} variant="onDark">
              Get directions
            </Cta>
          </aside>
        </div>
      </Section>

      <DemoOutro config={config} />
    </DemoShell>
  );
}

const WAYS = ['One way', 'Two ways', 'Three ways', 'Four ways', 'Five ways', 'Six ways'];

/** 'Three ways to book it', counted from the config rather than typed out. */
function waysToBook(count: number): string {
  return `${WAYS[count - 1] ?? 'Ways'} to book it`;
}
