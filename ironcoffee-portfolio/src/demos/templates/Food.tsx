import { Clock } from 'lucide-react';
import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  ContactDetails,
  FaqList,
  GalleryGrid,
  HoursList,
  HoursStrip,
  Marquee,
  MenuBlock,
  PullQuote,
  StatementBand,
  ServiceCards,
  StatsBand,
} from '../components/blocks';
import { Bleed, Cta, Section, SectionHead } from '../components/primitives';
import { directionsHref } from '../index';
import { homeNavLinks, type NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Food, laid out like a menu card rather than a brochure.
 *
 * The photograph fills the screen, then the hours, because for a place that
 * smokes a fixed amount and closes when it is gone, "are they open" beats
 * "what do they serve".
 *
 * Every heading on this page is left-aligned, and it is the only sample where
 * that is true end to end. The five samples are supposed to look like five
 * different studios made them, and heading alignment is the cheapest tell
 * there is: centered text down a whole page is what a template does when it
 * does not know what the page is for.
 */
export default function FoodTemplate({ config }: { config: DemoConfig }) {
  const anchors: NavLink[] = [
    ...(config.menu?.length ? [{ label: 'Menu', href: '#menu' }] : []),
    { label: 'Catering', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  // Anchors on a one-page sample, real page links on a multi-page one.
  const links = homeNavLinks(config, anchors);

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} variant="full" />

      <div className={styles.badgeBar}>
        <div className={styles.container}>
          <HoursStrip hours={config.hours} />
        </div>
      </div>

      {config.marquee?.length ? <Marquee items={config.marquee} /> : null}

      {config.menu?.length ? (
        <Section id="menu">
          <SectionHead
            eyebrow="The menu"
            title="What we are serving"
            sub="Everything is made here. Call ahead and it will be boxed and waiting."
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
        {config.stats?.length ? <StatsBand stats={config.stats} /> : null}
      </Section>

      {config.services.length > 0 && (
        <Section id="services">
          <SectionHead eyebrow="Also available" title="Feeding a crowd" />
          <ServiceCards items={config.services} />
        </Section>
      )}

      {config.testimonials?.length ? (
        <Bleed tone="deep">
          <PullQuote items={config.testimonials} />
        </Bleed>
      ) : (
        <StatementBand
          image={config.gallery[0] ?? config.hero.image}
          line={config.business.tagline}
          business={config.business.name}
          kicker={`${config.business.city}, ${config.business.state}`}
        />
      )}

      <Section id="visit" tone="dark">
        <SectionHead eyebrow="Find us" title="Come and eat" />
        <div className={styles.visitGrid}>
          <div>
            <ContactDetails config={config} />
            <Cta href={directionsHref(config)} variant="onDark">
              Get directions
            </Cta>
          </div>
          <div>
            <h3 className={styles.blockTitle}>
              <Clock size={18} aria-hidden="true" />
              Hours
            </h3>
            <HoursList hours={config.hours} />
          </div>
        </div>
      </Section>

      {config.faq?.length ? (
        <Section tone="alt" narrow>
          <SectionHead title="Before you come" />
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
