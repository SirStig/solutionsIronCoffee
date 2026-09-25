import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  HoursBar,
  HoursCard,
  Marquee,
  PullQuote,
  splitQuotes,
  reviewsIntro,
  StatementBand,
  ServiceCards,
  ServiceRows,
  StatsBand,
  TeamGrid,
  Testimonials,
  VisitBlock,
} from '../components/blocks';
import { Bleed, Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';
import { Arranged, gallerySub, heading, orderedAnchors, type Slot } from '../components/arrange';
import { pictureKind } from '../index';
import type { SectionKey } from '../types';

/**
 * Booking, laid out like a treatment card.
 *
 * The service list is a priced column rather than a grid, because that is how
 * a salon writes its own menu of services and it makes the page scan like a
 * price list instead of a brochure. A shop that publishes no prices gets the
 * numbered variant instead; see <ServiceRows> for why that is not a cosmetic
 * swap.
 *
 * The hero is chosen by whether the pictures are photographs or drawings
 * rather than by which business it is. See below.
 *
 * This is the one sample that centers its headings, and it centers all of
 * them. Done once it reads as a house style; done on three of five samples it
 * reads as the only trick the template knows. A preview can set
 * `layout.align` to 'left' so a second shop in the same trade does not.
 */
export default function BookingTemplate({ config }: { config: DemoConfig }) {
  const order = config.layout?.order ?? DEFAULT_ORDER;
  const anchors: NavLink[] = orderedAnchors<NavLink>(order, {
    services: { label: 'Services', href: '#services' },
    team: Boolean(config.team?.length) && { label: 'Team', href: '#team' },
    about: { label: 'About', href: '#about' },
    visit: { label: 'Visit', href: '#visit' },
  });

  // Anchors on a one-page sample, real page links on a multi-page one.
  const links = homeNavLinks(config, anchors);

  /*
   * A shop that has not given us its prices gets a different heading.
   *
   * "What we do, and what it costs" over four rows all reading "Call for
   * pricing" is a page arguing with itself, and it is the kind of small
   * carelessness an owner reads as "they did not look at this".
   */
  const priced = config.services.some(
    (service) => service.price && !/^call/i.test(service.price)
  );

  /*
   * A preview and a sample want different heroes, and the difference is who is
   * reading.
   *
   * A sample is browsed by a stranger comparing designs, so the five of them
   * have to open five different ways or the gallery reads as one template with
   * the names swapped. The split hero is this one's.
   *
   * A preview is read by exactly one person deciding whether to pay for it,
   * and the fastest way to answer "is this thing any use to me" is to put
   * something working on screen before they scroll: the week, and whether the
   * shop is open at this moment. The panel hero carries that as a card.
   *
   * Two previews in the same trade must not open the same way either, so
   * `layout` can pick another hero, another order and left-aligned heads.
   */
  const layout = config.layout ?? {};
  const hero = layout.hero ?? (config.showcase ? 'split' : 'panel');
  const align = layout.align ?? 'center';
  const containedGallery = layout.gallery === 'contained';

  // Drawings run as a single band; photographs keep the grid. See the prop.
  const drawnGallery = pictureKind(config, config.gallery) === 'drawn';

  const { lead, others } = splitQuotes(config.testimonials);

  const services = heading(config, 'services', {
    eyebrow: 'Services',
    title: priced ? 'What we do, and what it costs' : 'What we do',
    // How a shop quotes is its own policy, so the default says only what the
    // list itself shows. See DemoCopy.
    sub:
      config.copy?.servicesIntro ??
      (priced
        ? 'Starting prices. Ask about anything not listed.'
        : config.business.phone
          ? 'Call and ask about prices.'
          : undefined),
  });
  const team = heading(config, 'team', {
    eyebrow: 'The team',
    title: 'Who you will be sitting with',
  });
  const reviews = heading(config, 'reviews', {
    eyebrow: 'In their own words',
    title: 'What people say about the place',
    // Named, not implied, and only when it is true. See the helper.
    sub: reviewsIntro(others),
  });
  const gallery = heading(config, 'gallery', {
    title: 'A closer look',
    sub: gallerySub(config),
  });
  const visit = heading(config, 'visit', { eyebrow: 'Find us', title: 'Where to come' });
  const faq = heading(config, 'faq', { title: 'Good to know' });

  const slots: Partial<Record<SectionKey, Slot>> = {
    services: {
      show: true,
      render: (tone) => (
        <Section id="services" tone={tone}>
          <SectionHead {...services} align={align} />
          {layout.services === 'cards' ? (
            <ServiceCards items={config.services} />
          ) : (
            <ServiceRows items={config.services} numbered={!priced} />
          )}
        </Section>
      ),
    },
    team: {
      show: Boolean(config.team?.length),
      render: (tone) => (
        <Section id="team" tone={tone}>
          <SectionHead {...team} align={align} />
          <TeamGrid members={config.team ?? []} />
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
            image={config.gallery[1] ?? config.gallery[0] ?? config.hero.image}
            line={config.business.tagline}
            business={config.business.name}
            kicker={`${config.business.city}, ${config.business.state}`}
          />
        ),
    },
    about: {
      show: true,
      render: (tone) => (
        <Section id="about" tone={tone}>
          <AboutBlock config={config} reversed={align === 'center'} />
        </Section>
      ),
    },
    gallery: containedGallery
      ? {
          show: config.gallery.length > 0,
          render: (tone) => (
            <Section id="work" tone={tone}>
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
              cols={drawnGallery ? config.gallery.length : undefined}
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

  return (
    <DemoShell
      config={config}
      links={links}
      navVariant={align === 'center' ? 'centered' : 'default'}
    >
      {hero === 'panel' ? (
        <DemoHero
          config={config}
          variant="panel"
          aside={<HoursCard config={config} />}
        />
      ) : (
        <DemoHero config={config} variant={hero} />
      )}

      {/* Without the card, the week goes in a bar straight under the hero, so
          "are they open" is still answered before anyone scrolls. A sample
          is browsed for its design and does without. */}
      {hero !== 'panel' && !config.showcase && (
        <HoursBar config={config} />
      )}

      {config.marquee?.length ? <Marquee items={config.marquee} /> : null}

      <Arranged order={order} slots={slots} />

      <DemoOutro config={config} />
    </DemoShell>
  );
}

const DEFAULT_ORDER: SectionKey[] = [
  'services',
  'team',
  'reviews',
  'quote',
  'about',
  'gallery',
  'visit',
  'faq',
];
