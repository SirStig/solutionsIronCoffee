import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import { Clock } from 'lucide-react';
import {
  AboutBlock,
  BadgeBar,
  ContactDetails,
  FaqList,
  HoursList,
  InsuranceList,
  ServiceList,
  StatsBand,
  TeamGrid,
  PullQuote,
  StatementBand,
  businessTimeZone,
} from '../components/blocks';
import { BusinessForm } from '../components/forms';
import { Bleed, Section, SectionHead } from '../components/primitives';
import { homeNavLinks, type NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/** Shared with the form so it can tell it is sitting under its own words. */
const APPOINTMENT_TITLE = 'Request an appointment';

/**
 * Professional. Light and quiet, with the photograph demoted to a
 * band under the headline.
 *
 * A clinic is competing on trust rather than appetite, so the page leads with
 * the offer and the people instead of a full-bleed image, and the money
 * questions come before the gallery because they are what stops someone
 * booking.
 */
export default function ProfessionalTemplate({ config }: { config: DemoConfig }) {
  const anchors: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.team?.length ? [{ label: 'Team', href: '#team' }] : []),
    ...(config.insurance?.length ? [{ label: 'Insurance', href: '#insurance' }] : []),
    { label: 'Book', href: '#appointment' },
  ];

  // Anchors on a one-page sample, real page links on a multi-page one.
  const links = homeNavLinks(config, anchors);

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} variant="centered" />

      {config.badges?.length ? <BadgeBar items={config.badges} /> : null}

      {config.stats?.length ? (
        <Section tone="alt">
          <StatsBand stats={config.stats} />
        </Section>
      ) : null}

      <Section id="services">
        <SectionHead eyebrow="Care" title="What we treat" />
        <ServiceList items={config.services} />
      </Section>

      {config.team?.length ? (
        <Section id="team" tone="alt">
          <SectionHead
            eyebrow="Your team"
            title="The people you will actually see" />
          <TeamGrid members={config.team} />
        </Section>
      ) : null}

      {config.insurance?.length ? (
        <Section id="insurance" narrow>
          <SectionHead
            eyebrow="Insurance"
            title="Plans we accept"
            sub={
              config.copy?.insuranceIntro ??
              (config.business.phone
                ? `Do not see yours? Call ${config.business.phone} and ask.`
                : 'Do not see yours? Ask when you request an appointment.')
            } />
          <InsuranceList plans={config.insurance} />
        </Section>
      ) : null}

      {config.testimonials?.length ? (
        <Bleed tone="brand">
          <PullQuote items={config.testimonials} />
        </Bleed>
      ) : (
        <StatementBand
          motif={config.brand.motif}
          image={config.gallery[0] ?? config.hero.image}
          line={config.business.tagline}
          business={config.business.name}
          kicker={`${config.business.city}, ${config.business.state}`}
        />
      )}

      <Section tone="alt">
        <AboutBlock config={config} reversed />
      </Section>

      {config.faq?.length ? (
        <Section narrow>
          <SectionHead title="Common questions" />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <Section id="appointment" tone="dark">
        <SectionHead
          eyebrow="New patients welcome"
          title={APPOINTMENT_TITLE}
          sub="Fill this in and the front desk will get back to you to confirm a time."
          align="center" />
        {/* Deliberately not <VisitBlock>. That is itself a two-column grid,
            and nesting it here produced four cramped columns that snapped an
            email address in half. */}
        <div className={styles.visitGrid}>
          <BusinessForm
            config={config}
            variant="appointment"
            headingLevel={3}
            heading={APPOINTMENT_TITLE}
          />
          <div className={styles.visitAside}>
            <ContactDetails config={config} />
            <div>
              <h3 className={styles.blockTitle}>
                <Clock size={18} aria-hidden="true" />
                Hours
              </h3>
              <HoursList hours={config.hours} timeZone={businessTimeZone(config)} />
            </div>
          </div>
        </div>
      </Section>

      <DemoOutro config={config} />
    </DemoShell>
  );
}
