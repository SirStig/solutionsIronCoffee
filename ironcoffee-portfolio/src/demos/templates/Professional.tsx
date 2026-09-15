import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  BadgeBar,
  FaqList,
  GalleryGrid,
  InsuranceList,
  ServiceCards,
  TeamGrid,
  VisitBlock,
} from '../components/blocks';
import { BusinessForm } from '../components/forms';
import { Section, SectionHead } from '../components/primitives';
import type { NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Dentists, clinics, law firms, accountants. The visitor is deciding whether to
 * trust the place, so the page puts the practitioners and the money questions
 * up front rather than burying them under stock photography.
 */
export default function ProfessionalTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.team?.length ? [{ label: 'Team', href: '#team' }] : []),
    ...(config.insurance?.length ? [{ label: 'Insurance', href: '#insurance' }] : []),
    { label: 'Book', href: '#appointment' },
  ];

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} />

      {config.badges?.length ? <BadgeBar items={config.badges} /> : null}

      <Section id="services">
        <SectionHead eyebrow="Care" title="What we treat" centered />
        <ServiceCards items={config.services} />
      </Section>

      {config.team?.length ? (
        <Section id="team" tone="alt">
          <SectionHead
            eyebrow="Your team"
            title="The people you will actually see"
            centered
          />
          <TeamGrid members={config.team} />
        </Section>
      ) : null}

      <Section>
        <AboutBlock config={config} reversed />
      </Section>

      {config.insurance?.length ? (
        <Section id="insurance" tone="alt" narrow>
          <SectionHead
            eyebrow="Insurance"
            title="Plans we accept"
            sub="Do not see yours? Call us. We work with most PPO plans and can check your benefits before you come in."
            centered
          />
          <InsuranceList plans={config.insurance} />
        </Section>
      ) : null}

      {config.gallery.length > 0 && (
        <Section>
          <SectionHead title="The practice" centered />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      <Section id="appointment" tone="alt">
        <SectionHead
          eyebrow="New patients welcome"
          title="Request an appointment"
          sub="Fill this in and the front desk will call to confirm a time."
        />
        <div className={styles.visitGrid}>
          <BusinessForm config={config} variant="appointment" />
          <div>
            <VisitBlock config={config} />
          </div>
        </div>
      </Section>

      {config.faq?.length ? (
        <Section narrow>
          <SectionHead title="Common questions" centered />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
