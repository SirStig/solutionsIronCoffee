import type { DemoConfig } from '../types';
import DemoShell from '../components/DemoShell';
import DemoHero from '../components/DemoHero';
import DemoOutro from '../components/DemoOutro';
import {
  AboutBlock,
  FaqList,
  GalleryGrid,
  MenuBlock,
  ServiceCards,
  VisitBlock,
} from '../components/blocks';
import { Section, SectionHead } from '../components/primitives';
import type { NavLink } from '../components/DemoNav';

/**
 * Restaurants, smokehouses, bakeries, anywhere the menu is the reason someone
 * came to the site. The menu sits directly under the hero because that is the
 * first thing every visitor scrolls looking for.
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
      <DemoHero config={config} />

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

      {config.services.length > 0 && (
        <Section id="services" tone="alt">
          <SectionHead eyebrow="Also available" title="Feeding a crowd" />
          <ServiceCards items={config.services} />
        </Section>
      )}

      <Section id="about">
        <AboutBlock config={config} />
      </Section>

      {config.gallery.length > 0 && (
        <Section tone="alt">
          <SectionHead title="A look inside" centered />
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      <Section id="visit">
        <SectionHead eyebrow="Find us" title="Come and eat" />
        <VisitBlock config={config} />
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
