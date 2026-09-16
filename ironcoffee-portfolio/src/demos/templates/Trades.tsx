import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  BadgeBar,
  FaqList,
  GalleryGrid,
  PullQuote,
  StatementBand,
  ServiceAreas,
  ServiceSteps,
  StatsBand,
  VisitBlock,
} from '../components/blocks';
import { BusinessForm } from '../components/forms';
import { Bleed, Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';

/**
 * Trades. The quote form sits inside the hero.
 *
 * Nobody browses a roofer. They arrive with water coming through a ceiling,
 * and every scroll between arriving and being able to ask for help costs a
 * lead, so the form is above the fold and the rest of the page exists to
 * reassure whoever did not fill it in immediately.
 *
 * Headings are left-aligned and set in caps by the `industrial` pairing, which
 * is doing the same job a sign-written truck does: it is not subtle, and a
 * roofer competing on being reachable at eight in the evening should not be.
 */
export default function TradesTemplate({ config }: { config: DemoConfig }) {
  const anchors: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.serviceAreas?.length ? [{ label: 'Areas', href: '#areas' }] : []),
    { label: 'Work', href: '#work' },
    { label: 'Quote', href: '#quote' },
  ];

  // Anchors on a one-page sample, real page links on a multi-page one.
  const links = homeNavLinks(config, anchors);

  return (
    <DemoShell config={config} links={links}>
      <DemoHero
        config={config}
        variant="panel"
        aside={
          <div id="quote">
            <BusinessForm config={config} variant="quote" compact />
          </div>
        }
      />

      {config.badges?.length ? <BadgeBar items={config.badges} /> : null}

      <Section id="services">
        <SectionHead
          eyebrow="What we do"
          title="Services"
          sub="Every job starts with someone coming out to look at it properly, at no cost to you."
        />
        <ServiceSteps items={config.services} />
        {config.stats?.length ? <StatsBand stats={config.stats} /> : null}
      </Section>

      {config.gallery.length > 0 && (
        <Section id="work" tone="alt">
          {/* Trade-neutral on purpose. This template serves roofers, lawn
              care, HVAC and fencing, and the line here used to read "real
              roofs in this county", which it printed on all of them. */}
          <SectionHead
            title="Recent jobs"
            sub="Photographed the day we finished."
          />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      {config.testimonials?.length ? (
        <Bleed tone="brand">
          <PullQuote items={config.testimonials} />
        </Bleed>
      ) : (
        <StatementBand
          image={config.gallery[1] ?? config.gallery[0] ?? config.hero.image}
          line={config.business.tagline}
          business={config.business.name}
          kicker={`${config.business.city}, ${config.business.state}`}
        />
      )}

      <Section>
        <AboutBlock config={config} />
      </Section>

      {config.serviceAreas?.length ? (
        <Section id="areas" tone="dark">
          <SectionHead
            eyebrow="Service area"
            title={`Working across ${config.business.city} and the towns around it`}
          />
          <ServiceAreas areas={config.serviceAreas} />
        </Section>
      ) : null}

      <Section id="visit" tone="alt">
        <SectionHead eyebrow="Get in touch" title="Where to find us" />
        <VisitBlock config={config} />
      </Section>

      {config.faq?.length ? (
        <Section narrow>
          <SectionHead title="Questions we get" />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
