import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  HoursCard,
  Marquee,
  PullQuote,
  splitQuotes,
  reviewsIntro,
  StatementBand,
  ServiceRows,
  StatsBand,
  TeamGrid,
  Testimonials,
  VisitBlock,
} from '../components/blocks';
import { Bleed, Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';
import { pictureKind } from '../index';

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
 * reads as the only trick the template knows.
 */
export default function BookingTemplate({ config }: { config: DemoConfig }) {
  const anchors: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.team?.length ? [{ label: 'Team', href: '#team' }] : []),
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

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
   * shop is open at this moment. That is the roofing sample's opening, which
   * is the strongest in the set, with the quote form swapped for the card a
   * barbershop actually needs.
   */
  const card = !config.showcase;

  // Drawings run as a single band; photographs keep the grid. See the prop.
  const drawnGallery = pictureKind(config, config.gallery) === 'drawn';

  const { lead, others } = splitQuotes(config.testimonials);

  return (
    <DemoShell config={config} links={links} navVariant="centered">
      {card ? (
        <DemoHero
          config={config}
          variant="panel"
          aside={<HoursCard config={config} />}
        />
      ) : (
        <DemoHero config={config} variant="split" />
      )}

      {config.marquee?.length ? <Marquee items={config.marquee} /> : null}

      <Section id="services">
        <SectionHead
          eyebrow="Services"
          title={priced ? 'What we do, and what it costs' : 'What we do'}
          sub={
            priced
              ? 'Prices start where they start. Anything that depends on length or condition gets quoted in the chair before we begin.'
              : 'Every job depends on length, condition and how long it takes, so you get a number in the chair before anything starts rather than a surprise at the counter.'
          }
          align="center"
        />
        <ServiceRows items={config.services} numbered={!priced} />
      </Section>

      {config.team?.length ? (
        <Section id="team" tone="alt">
          <SectionHead
            eyebrow="The team"
            title="Who you will be sitting with"
            align="center"
          />
          <TeamGrid members={config.team} />
          {config.stats?.length ? <StatsBand stats={config.stats} /> : null}
        </Section>
      ) : null}

      {others.length > 0 && (
        <Section tone="alt">
          <SectionHead
            eyebrow="In their own words"
            title="What people say about the place"
            /* Named, not implied, and only when it is true. See the helper. */
            sub={reviewsIntro(others)}
            align="center"
          />
          <Testimonials items={others} />
        </Section>
      )}

      {lead ? (
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
      )}

      <Section id="about">
        <AboutBlock config={config} reversed />
      </Section>

      {config.gallery.length > 0 && (
        <GalleryGrid
          images={config.gallery}
          business={config.business.name}
          fullBleed
          cols={drawnGallery ? config.gallery.length : undefined}
        />
      )}

      <Section id="visit" tone="alt">
        <SectionHead eyebrow="Find us" title="Where to come" align="center" />
        <VisitBlock config={config} />
      </Section>

      {config.faq?.length ? (
        <Section narrow>
          <SectionHead title="Good to know" align="center" />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
