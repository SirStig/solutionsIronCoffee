import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  HoursBar,
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
import { Arranged, gallerySub, heading, orderedAnchors, type Slot } from '../components/arrange';
import type { SectionKey } from '../types';
import styles from '../Demo.module.css';

/**
 * Retail. A short image band with a running note under it, then stock.
 *
 * The question that brings someone to a feed store's website is whether a
 * thing is on the shelf today, so the hero is deliberately shallow and the
 * note under it carries today's hours. Everything else can wait.
 */
export default function RetailTemplate({ config }: { config: DemoConfig }) {
  const order = config.layout?.order ?? DEFAULT_ORDER;
  const anchors: NavLink[] = orderedAnchors<NavLink>(order, {
    stock: Boolean(config.products?.length) && { label: 'In stock', href: '#stock' },
    services: config.services.length > 0 && { label: 'Services', href: '#services' },
    about: { label: 'About', href: '#about' },
    visit: { label: 'Visit', href: '#visit' },
  });

  // Anchors on a one-page sample, real page links on a multi-page one.
  const links = homeNavLinks(config, anchors);

  const { phone } = config.business;
  // Decided from the config alone, so the server and the browser agree on
  // whether the band exists; only the "Today" line inside it waits for a clock.
  const hasNote = Boolean(phone) || config.hours.length > 0;

  const { lead, others } = splitQuotes(config.testimonials);

  const layout = config.layout ?? {};
  const hero = layout.hero ?? 'strip';
  const align = layout.align ?? 'left';

  const stock = heading(config, 'stock', {
    eyebrow: 'On the shelves',
    title: 'What we carry',
    sub: phone
      ? 'Worth a call before you drive out. This page is only ever as current as its last update.'
      : 'This page is only ever as current as its last update.',
  });
  const services = heading(config, 'services', {
    eyebrow: 'Beyond the shelves',
    title: 'What else we do',
  });
  const reviews = heading(config, 'reviews', {
    eyebrow: 'In their own words',
    title: 'What people say about the place',
    sub: reviewsIntro(others),
  });
  const gallery = heading(config, 'gallery', {
    title: 'A look around',
    sub: gallerySub(config),
  });
  const visit = heading(config, 'visit', { eyebrow: 'Find us', title: 'Stop by' });
  const faq = heading(config, 'faq', { title: 'Good to know' });

  const slots: Partial<Record<SectionKey, Slot>> = {
    stock: {
      show: Boolean(config.products?.length),
      render: (tone) => (
        <Section id="stock" tone={tone}>
          <SectionHead {...stock} align={align} />
          <ProductBlock groups={config.products ?? []} />
        </Section>
      ),
    },
    services: {
      show: config.services.length > 0,
      render: (tone) => (
        <Section id="services" tone={tone}>
          <SectionHead {...services} align={align} />
          <ServiceCards items={config.services} bordered />
          {config.stats?.length ? <StatsBand stats={config.stats} /> : null}
        </Section>
      ),
    },
    reviews: {
      show: others.length > 0,
      render: (tone) => (
        <Section tone={tone}>
          <SectionHead {...reviews} align={align} />
          <Testimonials items={others} />
        </Section>
      ),
    },
    about: {
      show: true,
      render: (tone) => (
        <Section id="about" tone={tone}>
          <AboutBlock config={config} />
        </Section>
      ),
    },
    gallery:
      layout.gallery === 'contained'
        ? {
            show: config.gallery.length > 0,
            render: (tone) => (
              <Section id="photos" tone={tone}>
                <SectionHead {...gallery} align={align} />
                <GalleryGrid
                  images={config.gallery}
                  business={config.business.name}
                  sample={config.placeholderPhotos}
                />
              </Section>
            ),
          }
        : {
            show: config.gallery.length > 0,
            band: true,
            render: () => (
              <GalleryGrid
                images={config.gallery}
                business={config.business.name}
                sample={config.placeholderPhotos}
                fullBleed
              />
            ),
          },
    visit: {
      show: true,
      tone: layout.darkVisit ? 'dark' : undefined,
      render: (tone) => (
        <Section id="visit" tone={tone}>
          <SectionHead {...visit} align={align} />
          <VisitBlock config={config} />
        </Section>
      ),
    },
    quote: {
      show: true,
      band: true,
      render: () =>
        lead ? (
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
        ),
    },
    faq: {
      show: Boolean(config.faq?.length),
      render: (tone) => (
        <Section narrow tone={tone}>
          <SectionHead {...faq} align={align} />
          <FaqList items={config.faq ?? []} />
        </Section>
      ),
    },
  };

  const note = hasNote ? (
    <div className={styles.heroNoteInner}>
      <TodayHours config={config} />
      {phone && <span>Questions? Call {phone}.</span>}
    </div>
  ) : undefined;

  return (
    <DemoShell config={config} links={links}>
      {hero === 'strip' ? (
        <DemoHero config={config} variant="strip" note={note} />
      ) : (
        <>
          <DemoHero config={config} variant={hero} />
          {/* No strip means no note under the photo, so the week goes in a
              bar instead: the first question is still whether it is open. */}
          <HoursBar config={config} />
        </>
      )}

      {config.marquee?.length ? <Marquee items={config.marquee} /> : null}

      <Arranged order={order} slots={slots} />

      <DemoOutro config={config} />
    </DemoShell>
  );
}

const DEFAULT_ORDER: SectionKey[] = [
  'stock',
  'services',
  'reviews',
  'about',
  'gallery',
  'visit',
  'quote',
  'faq',
];

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
