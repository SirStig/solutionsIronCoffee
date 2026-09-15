import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  ServiceCards,
  TeamGrid,
  VisitBlock,
} from '../components/blocks';
import { Cta, Section, SectionHead } from '../components/primitives';
import type { NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Salons, barbers, spas, anywhere the whole job of the site is to turn a
 * visitor into an appointment. The priced service list comes first, the people
 * come second, and the booking call to action is repeated at the bottom so
 * nobody has to scroll back up to act on it.
 */
export default function BookingTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    { label: 'Services', href: '#services' },
    ...(config.team?.length ? [{ label: 'Team', href: '#team' }] : []),
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} />

      <Section id="services">
        <SectionHead
          eyebrow="Services"
          title="What we do, and what it costs"
          sub="Prices start where they start. Anything that depends on length or condition gets quoted in the chair before we begin."
          centered
        />
        <ServiceCards items={config.services} bordered />
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
        <Section tone="alt">
          <SectionHead title="Recent work" centered />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      <Section id="book" tone="dark" narrow>
        <SectionHead
          title="Book your chair"
          sub="Pick a time that works and you are done. No phone tag, no waiting on a callback."
          centered
        />
        <div className={styles.heroActions} style={{ justifyContent: 'center', marginTop: 0 }}>
          <Cta href={config.hero.ctaHref} variant="onDark">
            {config.hero.ctaLabel}
          </Cta>
        </div>
      </Section>

      <Section id="visit">
        <SectionHead eyebrow="Find us" title="Where to come" />
        <VisitBlock config={config} />
      </Section>

      {config.faq?.length ? (
        <Section tone="alt">
          <SectionHead title="Good to know" centered />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
