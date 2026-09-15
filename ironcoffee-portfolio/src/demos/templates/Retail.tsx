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
  VisitBlock,
} from '../components/blocks';
import { Section, SectionHead } from '../components/primitives';
import type { NavLink } from '../components/DemoNav';

/**
 * Feed stores, hardware, boutiques, liquor. Structurally this is the food
 * template with a products grid in place of a menu, because the question these
 * visitors arrive with is whether a thing is in stock, not what it costs.
 */
export default function RetailTemplate({ config }: { config: DemoConfig }) {
  const links: NavLink[] = [
    ...(config.products?.length ? [{ label: 'In stock', href: '#stock' }] : []),
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <DemoShell config={config} links={links}>
      <DemoHero config={config} />

      {config.products?.length ? (
        <Section id="stock">
          <SectionHead
            eyebrow="On the shelves"
            title="What we carry"
            sub="Call to confirm before you drive out. Stock moves fast and this page is only as current as our last update."
            centered
          />
          <ProductBlock groups={config.products} />
        </Section>
      ) : null}

      {config.services.length > 0 && (
        <Section id="services" tone="alt">
          <SectionHead eyebrow="Beyond the shelves" title="What else we do" />
          <ServiceCards items={config.services} />
        </Section>
      )}

      <Section id="about">
        <AboutBlock config={config} />
      </Section>

      {config.gallery.length > 0 && (
        <Section tone="alt">
          <SectionHead title="Around the store" centered />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      <Section id="visit">
        <SectionHead eyebrow="Find us" title="Stop by" />
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
