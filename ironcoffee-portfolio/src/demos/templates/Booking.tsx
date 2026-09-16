import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  PullQuote,
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

  return (
    <DemoShell config={config} links={links} navVariant="centered">
      <DemoHero config={config} variant="split" />

      <Section id="services">
        <SectionHead
          eyebrow="Services"
          title="What we do, and what it costs"
          sub="Prices start where they start. Anything that depends on length or condition gets quoted in the chair before we begin."
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
      ) : null}

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
