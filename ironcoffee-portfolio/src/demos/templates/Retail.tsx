import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  ProductBlock,
  ServiceCards,
  Marquee,
  PullQuote,
  splitQuotes,
  reviewsIntro,
  StatementBand,
  Testimonials,
  StatsBand,
  VisitBlock,
  businessTimeZone,
  useToday,
} from '../components/blocks';
import { Bleed, Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Retail. A short image band with a running note under it, then stock.
 *
 * The question that brings someone to a feed store's website is whether a
 * thing is on the shelf today, so the hero is deliberately shallow and the
 * note under it carries today's hours. Everything else can wait.
 */
export default function RetailTemplate({ config }: { config: DemoConfig }) {
  const anchors: NavLink[] = [
    ...(config.products?.length ? [{ label: 'In stock', href: '#stock' }] : []),
    ...(config.services.length ? [{ label: 'Services', href: '#services' }] : []),
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  // Anchors on a one-page sample, real page links on a multi-page one.
  const links = homeNavLinks(config, anchors);

  const { phone } = config.business;
  // Decided from the config alone, so the server and the browser agree on
  // whether the band exists; only the "Today" line inside it waits for a clock.
  const hasNote = Boolean(phone) || config.hours.length > 0;

  const { lead, others } = splitQuotes(config.testimonials);

  return (
    <DemoShell config={config} links={links}>
      <DemoHero
        config={config}
        variant="strip"
        note={
          hasNote ? (
            <div className={styles.heroNoteInner}>
              <TodayHours config={config} />
              {phone && <span>Questions? Call {phone}.</span>}
            </div>
          ) : undefined
        } />

      {config.marquee?.length ? <Marquee items={config.marquee} /> : null}

      {config.products?.length ? (
        <Section id="stock">
          <SectionHead
            eyebrow="On the shelves"
            title="What we carry"
            sub={
              phone
                ? 'Worth a call before you drive out. This page is only ever as current as its last update.'
                : 'This page is only ever as current as its last update.'
            } />
          <ProductBlock groups={config.products} />
        </Section>
      ) : null}

      {config.services.length > 0 && (
        <Section id="services" tone="alt">
          <SectionHead eyebrow="Beyond the shelves" title="What else we do" />
          <ServiceCards items={config.services} bordered />
          {config.stats?.length ? <StatsBand stats={config.stats} /> : null}
        </Section>
      )}

      {others.length > 0 && (
        <Section>
          <SectionHead
            eyebrow="In their own words"
            title="What people say about the place"
            sub={reviewsIntro(others)}
          />
          <Testimonials items={others} />
        </Section>
      )}

      <Section id="about">
        <AboutBlock config={config} />
      </Section>

      {config.gallery.length > 0 && (
        <GalleryGrid
          images={config.gallery}
          business={config.business.name}
          sample={config.placeholderPhotos}
          fullBleed />
      )}

      <Section id="visit" tone="alt">
        <SectionHead eyebrow="Find us" title="Stop by" />
        <VisitBlock config={config} />
      </Section>

      {lead ? (
        <Bleed tone="deep">
          <PullQuote items={config.testimonials ?? []} />
        </Bleed>
      ) : (
        <StatementBand
          motif={config.brand.motif}
          image={config.gallery[0] ?? config.hero.image}
          line={config.business.tagline}
          business={config.business.name}
          kicker={`${config.business.city}, ${config.business.state}`}
        />
      )}

      {config.faq?.length ? (
        <Section narrow>
          <SectionHead title="Good to know" />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}

/**
 * Today's hours, in the business's own time zone, once the page has mounted.
 *
 * Resolving the weekday during render would bake the build machine's day into
 * the HTML and then disagree with it on hydration, so this renders nothing
 * until there is a real clock to read, the same as <HoursList>.
 */
function TodayHours({ config }: { config: DemoConfig }) {
  const today = useToday(businessTimeZone(config));
  const row = today ? config.hours.find((h) => h.day === today) : undefined;
  if (!row) return null;
  return <span>Today: {row.open}</span>;
}
