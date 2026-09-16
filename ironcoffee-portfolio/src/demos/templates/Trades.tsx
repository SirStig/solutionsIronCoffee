import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  BadgeBar,
  FaqList,
  GalleryGrid,
  ServiceAreas,
  ServiceSteps,
  StatsBand,
  Testimonials,
  VisitBlock,
} from '../components/blocks';
import { BusinessForm } from '../components/forms';
import { Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';

/**
 * Trades. The quote form sits inside the hero.
 *
 * Nobody browses a roofer. They arrive with water coming through a ceiling,
 * and every scroll between arriving and being able to ask for help costs a
 * lead, so the form is above the fold and the rest of the page exists to
 * reassure whoever did not fill it in immediately.
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

      {config.stats?.length ? (
        <Section tone="alt">
          <StatsBand stats={config.stats} />
        </Section>
      ) : null}

      <Section id="services">
        <SectionHead
          eyebrow="What we do"
          title="Services"
          sub="Every job starts with someone coming out to look at it properly, at no cost to you."
        />
        <ServiceSteps items={config.services} />
      </Section>

      {config.gallery.length > 0 && (
        <Section id="work" tone="alt">
          <SectionHead
            title="Recent jobs"
            sub="Real roofs in this county, photographed the day we finished."
          />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      {config.testimonials?.length ? (
        <Section tone="alt">
          <SectionHead eyebrow="In their words" title="What homeowners say" centered />
          <Testimonials items={config.testimonials} />
        </Section>
      ) : null}

      <Section>
        <AboutBlock config={config} />
      </Section>

      {config.serviceAreas?.length ? (
        <Section id="areas" tone="dark" narrow>
          <SectionHead
            eyebrow="Service area"
            title={`Working across ${config.business.city} and the towns around it`}
            centered
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
          <SectionHead title="Questions we get" centered />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
