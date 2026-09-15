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
  ServiceCards,
  VisitBlock,
} from '../components/blocks';
import { BusinessForm } from '../components/forms';
import { Section, SectionHead } from '../components/primitives';
import type { NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Roofers, plumbers, electricians, landscapers. Nobody browses a trades site.
 * They arrive with a problem, so the page leads with proof the business is real
 * and licensed, then puts a quote form where the scroll naturally stops.
 */
export default function TradesTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.serviceAreas?.length ? [{ label: 'Areas', href: '#areas' }] : []),
    { label: 'Work', href: '#work' },
    { label: 'Quote', href: '#quote' },
  ];

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} />

      {config.badges?.length ? <BadgeBar items={config.badges} /> : null}

      <Section id="services">
        <SectionHead
          eyebrow="What we do"
          title="Services"
          sub="Every job starts with someone coming out to look at it properly, at no cost to you."
          centered
        />
        <ServiceCards items={config.services} bordered />
      </Section>

      {config.serviceAreas?.length ? (
        <Section id="areas" tone="alt" narrow>
          <SectionHead
            eyebrow="Service area"
            title={`Working across ${config.business.city} and the towns around it`}
            centered
          />
          <ServiceAreas areas={config.serviceAreas} />
        </Section>
      ) : null}

      {config.gallery.length > 0 && (
        <Section id="work">
          <SectionHead
            title="Recent jobs"
            sub="Real roofs in this county, photographed the day we finished."
            centered
          />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      <Section tone="alt">
        <AboutBlock config={config} />
      </Section>

      <Section id="quote">
        <SectionHead
          eyebrow="Free estimate"
          title="Tell us what is going on"
          sub="Send this and we will call to arrange a look, usually within a day."
        />
        <div className={styles.visitGrid}>
          <BusinessForm config={config} variant="quote" />
          <div>
            <VisitBlock config={config} />
          </div>
        </div>
      </Section>

      {config.faq?.length ? (
        <Section tone="alt">
          <SectionHead title="Questions we get" centered />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
