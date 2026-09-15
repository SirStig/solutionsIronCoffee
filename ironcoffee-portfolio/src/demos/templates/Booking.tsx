import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  ServiceRows,
  TeamGrid,
  VisitBlock,
} from '../components/blocks';
import { Section, SectionHead } from '../components/primitives';
import type { NavLink } from '../components/DemoNav';

/**
 * Booking. A split hero, then the service list as a priced column rather than
 * a grid, because that is how a salon writes its own menu of services and it
 * makes the page scan like a price list instead of a brochure.
 */
export default function BookingTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.team?.length ? [{ label: 'Team', href: '#team' }] : []),
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <DemoShell config={config} links={links} navVariant="centered">
      <DemoHero config={config} variant="split" />

      <Section id="services">
        <SectionHead
          eyebrow="Services"
          title="What we do, and what it costs"
          sub="Prices start where they start. Anything that depends on length or condition gets quoted in the chair before we begin."
        />
        <ServiceRows items={config.services} />
      </Section>

      {config.team?.length ? (
        <Section id="team" tone="alt">
          <SectionHead
            eyebrow="The team"
            title="Who you will be sitting with"
            centered
          />
          <TeamGrid members={config.team} />
        </Section>
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
        <SectionHead eyebrow="Find us" title="Where to come" />
        <VisitBlock config={config} />
      </Section>

      {config.faq?.length ? (
        <Section narrow>
          <SectionHead title="Good to know" centered />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
