import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  ContactDetails,
  FaqList,
  GalleryGrid,
  HoursStrip,
  MenuBlock,
  ServiceCards,
} from '../components/blocks';
import { Cta, Section, SectionHead } from '../components/primitives';
import { directionsHref } from '../index';
import type { NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Food. The photograph fills the screen, then the hours, then the menu.
 *
 * Hours come second on purpose: for a place that smokes a fixed amount and
 * closes when it is gone, "are they open" beats "what do they serve", and a
 * compact strip answers it without a table.
 */
export default function FoodTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    ...(config.menu?.length ? [{ label: 'Menu', href: '#menu' }] : []),
    { label: 'Catering', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} variant="full" />

      <div className={styles.badgeBar}>
        <div className={styles.container}>
          <HoursStrip hours={config.hours} />
        </div>
      </div>

      {config.menu?.length ? (
        <Section id="menu">
          <SectionHead
            eyebrow="The menu"
            title="What we are serving"
            sub="Everything is made here. Call ahead and it will be boxed and waiting."
            centered
          />
          <MenuBlock sections={config.menu} />
        </Section>
      ) : null}

      {config.gallery.length > 0 && (
        <GalleryGrid
          images={config.gallery}
          business={config.business.name}
          fullBleed
        />
      )}

      <Section id="about" tone="alt">
        <AboutBlock config={config} />
      </Section>

      {config.services.length > 0 && (
        <Section id="services">
          <SectionHead eyebrow="Also available" title="Feeding a crowd" centered />
          <ServiceCards items={config.services} />
        </Section>
      )}

      <Section id="visit" tone="dark">
        <SectionHead eyebrow="Find us" title="Come and eat" centered />
        <div className={styles.visitCentered}>
          <ContactDetails config={config} />
          <Cta href={directionsHref(config)} variant="onDark">
            Get directions
          </Cta>
        </div>
      </Section>

      {config.faq?.length ? (
        <Section tone="alt">
          <SectionHead title="Before you come" centered />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
