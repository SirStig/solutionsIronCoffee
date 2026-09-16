import type { DemoConfig, DemoPage } from '../types';
import { demoBase, directionsHref } from '../index';
import DemoShell from './DemoShell';
import DemoOutro from './DemoOutro';
import {
  AboutBlock,
  ContactDetails,
  FaqList,
  GalleryGrid,
  HoursList,
  InsuranceList,
  MenuBlock,
  ProductBlock,
  ServiceCards,
  ServiceAreas,
  TeamGrid,
} from './blocks';
import { BusinessForm } from './forms';
import OrderFlow from './OrderFlow';
import AdminView from './AdminView';
import { Cta, Section, SectionHead } from './primitives';
import { pageNavLinks } from './DemoNav';
import styles from '../Demo.module.css';

/** Default heading and standfirst per page kind, when the config gives none. */
const defaults: Record<DemoPage['kind'], { title: string; intro?: string }> = {
  menu: { title: 'The menu', intro: 'Everything is made here, every day.' },
  services: { title: 'What we do' },
  about: { title: 'About us' },
  gallery: { title: 'Photographs' },
  team: { title: 'The team' },
  faq: { title: 'Questions' },
  contact: { title: 'Get in touch' },
  areas: { title: 'Where we work' },
  insurance: { title: 'Insurance we accept' },
  stock: { title: 'What we carry' },
  order: {
    title: 'Order for pickup',
    intro: 'Choose what you want, pick a time, and it will be boxed and waiting. No app, no third party taking a cut.',
  },
  admin: {
    title: 'What the owner sees',
    intro: 'The other side of the same site. This is the part a subscription cannot sell you, and the part the price above the first tier is actually paying for.',
  },
};

/**
 * One interior page of a multi-page demo.
 *
 * Every kind renders from data the config already carries, which is what makes
 * the jump from a one-page site to a seven-page site a list of entries rather
 * than seven new components.
 */
export default function DemoSubPage({
  config,
  page,
}: {
  config: DemoConfig;
  page: DemoPage;
}) {
  const base = demoBase(config);
  const fallback = defaults[page.kind];
  const title = page.title ?? fallback.title;
  const intro = page.intro ?? fallback.intro;

  return (
    <DemoShell config={config} links={pageNavLinks(config, page.slug)} subPage>
      <header className={styles.pageHead}>
        <div className={styles.container}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <a href={base}>{config.business.name}</a>
            <span aria-hidden="true">/</span>
            <span>{page.label}</span>
          </nav>
          <h1 className={styles.pageTitle}>{title}</h1>
          {intro && <p className={styles.pageIntro}>{intro}</p>}
        </div>
      </header>

      {page.kind === 'menu' && config.menu?.length ? (
        <Section>
          <MenuBlock sections={config.menu} />
        </Section>
      ) : null}

      {page.kind === 'order' && config.menu?.length ? (
        <Section>
          <OrderFlow config={config} />
        </Section>
      ) : null}

      {page.kind === 'admin' ? (
        <Section>
          <AdminView config={config} />
        </Section>
      ) : null}

      {page.kind === 'stock' && config.products?.length ? (
        <Section>
          <ProductBlock groups={config.products} />
        </Section>
      ) : null}

      {page.kind === 'services' && (
        <Section>
          <ServiceCards items={config.services} />
        </Section>
      )}

      {page.kind === 'about' && (
        <>
          <Section>
            <AboutBlock config={config} />
          </Section>
          {config.gallery.length > 0 && (
            <GalleryGrid
              images={config.gallery}
              business={config.business.name}
              fullBleed
            />
          )}
        </>
      )}

      {page.kind === 'gallery' && (
        <Section>
          <GalleryGrid images={config.gallery} business={config.business.name} />
        </Section>
      )}

      {page.kind === 'team' && config.team?.length ? (
        <Section>
          <TeamGrid members={config.team} />
        </Section>
      ) : null}

      {page.kind === 'faq' && config.faq?.length ? (
        <Section narrow>
          <FaqList items={config.faq} />
        </Section>
      ) : null}

      {page.kind === 'areas' && config.serviceAreas?.length ? (
        <Section narrow>
          <ServiceAreas areas={config.serviceAreas} />
        </Section>
      ) : null}

      {page.kind === 'insurance' && config.insurance?.length ? (
        <Section narrow>
          <InsuranceList plans={config.insurance} />
        </Section>
      ) : null}

      {page.kind === 'contact' && (
        <Section>
          <div className={styles.visitGrid}>
            <BusinessForm
              config={config}
              variant={config.template === 'professional' ? 'appointment' : 'quote'}
            />
            <div className={styles.visitAside}>
              <ContactDetails config={config} />
              <Cta href={directionsHref(config)}>Get directions</Cta>
              <div>
                <h2 className={styles.blockTitle}>Hours</h2>
                <HoursList hours={config.hours} />
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Every interior page ends by offering the next one, so a visitor is
          never left at a dead end two clicks in. */}
      {(config.pages?.length ?? 0) > 1 && (
        <Section tone="alt" narrow>
          <SectionHead title="Elsewhere on the site" align="center" />
          <div className={styles.pageLinks}>
            {config.pages
              ?.filter((p) => p.slug !== page.slug)
              .map((p) => (
                <a key={p.slug} className={styles.pageLink} href={`${base}/${p.slug}`}>
                  {p.label}
                </a>
              ))}
          </div>
        </Section>
      )}

      <DemoOutro config={config} />
    </DemoShell>
  );
}
