import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  ProductBlock,
  ServiceCards,
  StatsBand,
  Testimonials,
  VisitBlock,
} from '../components/blocks';
import { Section, SectionHead } from '../components/primitives';
import { todayName } from '../index';
import type { NavLink } from '../components/DemoNav';
import styles from '../Demo.module.css';

/**
 * Retail. A short image band with a running note under it, then stock.
 *
 * The question that brings someone to a feed store's website is whether a
 * thing is on the shelf today, so the hero is deliberately shallow and the
 * note under it carries today's hours. Everything else can wait.
 */
export default function RetailTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    ...(config.products?.length ? [{ label: 'In stock', href: '#stock' }] : []),
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  const today = config.hours.find((h) => h.day === todayName());

  return (
    <DemoShell config={config} links={links}>
      <DemoHero
        config={config}
        variant="strip"
        note={
          <div className={styles.heroNoteInner}>
            <span>Stock updated most mornings.</span>
            {today && <span>Today: {today.open}</span>}
            {config.business.phone && (
              <span>Call {config.business.phone} to check before you drive out.</span>
            )}
          </div>
        }
      />

      {config.products?.length ? (
        <Section id="stock">
          <SectionHead
            eyebrow="On the shelves"
            title="What we carry"
            sub="Call to confirm before you drive out. Stock moves fast and this page is only as current as our last update."
          />
          <ProductBlock groups={config.products} />
        </Section>
      ) : null}

      {config.stats?.length ? (
        <Section tone="alt">
          <StatsBand stats={config.stats} />
        </Section>
      ) : null}

      {config.services.length > 0 && (
        <Section id="services" tone="alt">
          <SectionHead eyebrow="Beyond the shelves" title="What else we do" />
          <ServiceCards items={config.services} bordered />
        </Section>
      )}

      <Section id="about">
        <AboutBlock config={config} />
      </Section>

      {config.gallery.length > 0 && (
        <GalleryGrid
          images={config.gallery}
          business={config.business.name}
          fullBleed
        />
      )}

      <Section id="visit" tone="alt">
        <SectionHead eyebrow="Find us" title="Stop by" />
        <VisitBlock config={config} />
      </Section>

      {config.testimonials?.length ? (
        <Section tone="alt">
          <SectionHead eyebrow="In their words" title="What people say" centered />
          <Testimonials items={config.testimonials} />
        </Section>
      ) : null}

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
