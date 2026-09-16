import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  PullQuote,
  StatementBand,
  ServiceRows,
  StatsBand,
  TeamGrid,
  VisitBlock,
} from '../components/blocks';
import { Bleed, Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';

/**
 * Booking, laid out like a treatment card.
 *
 * A split hero, then the service list as a priced column rather than a grid,
 * because that is how a salon writes its own menu of services and it makes the
 * page scan like a price list instead of a brochure.
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

  return (
    <DemoShell config={config} links={links} navVariant="centered">
      <DemoHero config={config} variant="split" />

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
        <ServiceRows items={config.services} />
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

      {config.testimonials?.length ? (
        <Bleed tone="deep">
          <PullQuote items={config.testimonials} />
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
