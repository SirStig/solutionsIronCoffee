import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Seo from '../components/Seo';
import ProjectCard from '../components/ProjectCard';
import { site } from '../content/site';
import { getProject } from '../content/projects';
import {
  catalog,
  generalDev,
  hourly,
  onePage,
  priceLabel,
  pricingFaq,
  terms,
  usd,
  websites,
  type Priced,
} from '../content/pricing';
import styles from './Services.module.css';

/**
 * Pricing. The numbers come from the sheet in `content/pricing.ts`.
 * This file is the layout.
 *
 * Read top to bottom it goes: the two numbers most people came for, the
 * three website sizes as cards, every other kind of site as a short list,
 * then time (hourly and monthly), then everything bigger than a website,
 * folded by category so the page is not sixty rows long. Terms come after
 * the prices, since nobody wants the rules before they know what they're
 * buying.
 *
 * The one-page site and the general hourly rate are the first numbers on
 * the page. Five-figure builds live in the folded categories, never beside
 * a monthly price.
 *
 * Routed from `src/App.tsx` at `/services` and from `src/routes.ts`.
 */

const proof = [getProject('eaglechair'), getProject('beyond25')].flatMap((project) =>
  project ? [project] : [],
);

/**
 * Structured data for the page.
 *
 * `Service`, not `LocalBusiness`. Every local type wants a street address and
 * opening hours, none of which are published anywhere on this site, and
 * inventing them to satisfy a schema validator is the same lie the demo
 * configs are forbidden from telling.
 *
 * Schema carries the rates a person actually shops from: the hourly card,
 * the website sizes, the retainer, and fractional development. Prices are
 * the `amount` field. Never strip digits out of a formatted string.
 */
function offer(item: Priced, name = item.name) {
  const unit = item.unit === 'hour' || item.unit === 'month';
  return {
    '@type': 'Offer',
    name,
    url: `${site.url}/services`,
    priceSpecification: {
      '@type': unit ? 'UnitPriceSpecification' : 'PriceSpecification',
      price: item.amount,
      priceCurrency: 'USD',
      ...(item.unit === 'hour' ? { unitText: 'hour' } : {}),
      ...(item.unit === 'month' ? { unitText: 'month' } : {}),
    },
  };
}

const other = catalog.find((group) => group.id === 'other');
const retainer = other?.lines.find((item) => item.unit === 'month' && item.amount === 150);
const fractional = other?.lines.find((item) => item.unit === 'month' && item.amount === 4000);

/** The three sizes get cards. Every other kind of site is a list under them. */
const sizes = websites.lines.filter((item) => item.note);
const kinds = websites.lines.filter((item) => !item.note);

const summary = `A one-page site is ${usd(onePage.amount)}. Other work is ${priceLabel(generalDev)}. Half to start, half on delivery.`;

const serviceSchema = {
  '@type': 'Service',
  '@id': `${site.url}/services#service`,
  name: 'Websites and custom software',
  serviceType: 'Website design and custom software',
  provider: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
  areaServed: 'US',
  url: `${site.url}/services`,
  description: summary,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'What the work costs',
    itemListElement: [
      ...sizes.map((item) => offer(item, `Website, ${item.name.toLowerCase()}`)),
      ...hourly.map((item) => offer(item)),
      ...(retainer ? [offer(retainer)] : []),
      ...(fractional ? [offer(fractional)] : []),
    ],
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: pricingFaq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Pricing',
      item: `${site.url}/services`,
    },
  ],
};

/** Name on the left, price on the right. One row per line on the sheet. */
function PriceList({ items, className }: { items: Priced[]; className?: string }) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <li key={item.name} className={styles.row}>
          <span className={styles.rowName}>{item.name}</span>
          <span className={styles.rowPrice}>{priceLabel(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function Terms({ items }: { items: typeof terms }) {
  return (
    <ul className={styles.terms}>
      {items.map((term) => (
        <li key={term.title} className={styles.term}>
          <h3 className={styles.termTitle}>{term.title}</h3>
          <p className={styles.termBody}>{term.body}</p>
        </li>
      ))}
    </ul>
  );
}

const leadTitles = ['Half up front', 'Changes', 'After delivery', 'Hosting'];
const leadTerms = leadTitles.flatMap((title) => {
  const term = terms.find((item) => item.title === title);
  return term ? [term] : [];
});
const moreTerms = terms.filter((term) => !leadTitles.includes(term.title));

/** The monthly lines are printed with the hourly ones, so they leave their group. */
const groups = catalog.map((group) =>
  group.id === 'other'
    ? { ...group, lines: group.lines.filter((item) => item !== retainer && item !== fractional) }
    : group,
);

export default function Services() {
  return (
    <>
      <Seo
        title="Pricing"
        description={summary}
        path="/services"
        image="/og-services.png"
        jsonLd={[serviceSchema, faqSchema, breadcrumbSchema]}
      />

      <div className="container-wide">
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>Pricing</p>
            <h1 className={styles.h1}>Here&rsquo;s what things cost.</h1>
            <p className={styles.lede}>
              Most people who end up here need a website, so that&rsquo;s at the top. Apps,
              stores and AI work are further down, and if what you want isn&rsquo;t listed
              I&rsquo;ll just quote it.
            </p>
            <div className={styles.actions}>
              <a href="#websites" className={styles.btnPrimary}>
                Website prices
              </a>
              <a href={`mailto:${site.email}`} className={styles.btnGhost}>
                Email me
              </a>
            </div>
          </div>

          <aside className={styles.card} aria-label="The short version">
            <dl className={styles.cardList}>
              <div>
                <dt>A one-page website</dt>
                <dd>{usd(onePage.amount)}</dd>
              </div>
              <div>
                <dt>Anything by the hour</dt>
                <dd>
                  {usd(generalDev.amount)}
                  <span> an hour</span>
                </dd>
              </div>
            </dl>
            <p className={styles.cardFoot}>Half to start, half when it&rsquo;s done.</p>
          </aside>
        </header>

        <section className={styles.section} aria-labelledby="websites">
          <div className={styles.head}>
            <h2 id="websites" className={styles.h2}>
              Websites
            </h2>
            <p className={styles.sub}>
              Every one comes with your domain pointed at it and the security certificate set
              up. Not sure how big? Start small. Adding pages later is just hourly work.
            </p>
          </div>

          <ul className={styles.sizes}>
            {sizes.map((item, i) => (
              <li key={item.name} className={i === 0 ? `${styles.size} ${styles.pick}` : styles.size}>
                <div className={styles.sizeTop}>
                  <h3 className={styles.sizeName}>{item.name}</h3>
                  {i === 0 ? <span className={styles.tag}>Start here</span> : null}
                </div>
                <p className={styles.sizePrice}>{priceLabel(item)}</p>
                <p className={styles.sizeNote}>{item.note}</p>
              </li>
            ))}
          </ul>

          <h3 className={styles.h3}>Other kinds of site</h3>
          <PriceList items={kinds} className={styles.twoCol} />
        </section>

        <section className={styles.section} aria-labelledby="time">
          <div className={styles.head}>
            <h2 id="time" className={styles.h2}>
              By the hour, or by the month
            </h2>
            <p className={styles.sub}>
              For fixes, small jobs, and anything that doesn&rsquo;t fit a fixed price.
            </p>
          </div>

          <div className={styles.timeGrid}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Hourly</h3>
              <PriceList items={hourly} className={styles.flush} />
            </div>

            <div className={styles.monthly}>
              {retainer ? (
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>After launch</h3>
                  <p className={styles.panelPrice}>
                    {usd(retainer.amount)}
                    <span> a month, per site</span>
                  </p>
                  <p className={styles.panelBody}>
                    Bug fixes are free for 30 days. After that, if you&rsquo;d rather not think
                    about it, I keep the site running.
                  </p>
                </div>
              ) : null}
              {fractional ? (
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>A few days a month</h3>
                  <p className={styles.panelPrice}>
                    {usd(fractional.amount)}
                    <span> a month</span>
                  </p>
                  <p className={styles.panelBody}>
                    If you need a developer around regularly but not enough to hire one.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="more">
          <div className={styles.head}>
            <h2 id="more" className={styles.h2}>
              Bigger than a website
            </h2>
            <p className={styles.sub}>
              Each line is a fixed price and they add together, so a site with logins and a
              store is the site plus those two. Take a few at once and it&rsquo;s about 10% off.
            </p>
          </div>

          <div className={styles.groups}>
            {groups.map((group) => (
              <details key={group.id} id={group.id} className={styles.group}>
                <summary>
                  <span className={styles.groupText}>
                    <span className={styles.groupTitle}>{group.title}</span>
                    {group.blurb ? (
                      <span className={styles.groupBlurb}>{group.blurb}</span>
                    ) : null}
                  </span>
                  <ChevronDown className={styles.chev} size={20} aria-hidden="true" />
                </summary>
                <PriceList items={group.lines} className={styles.flush} />
              </details>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="terms">
          <div className={styles.head}>
            <h2 id="terms" className={styles.h2}>
              How paying works
            </h2>
          </div>
          <Terms items={leadTerms} />
          <details className={styles.fine}>
            <summary>
              The rest of the fine print
              <ChevronDown className={styles.chev} size={18} aria-hidden="true" />
            </summary>
            <Terms items={moreTerms} />
          </details>
        </section>

        <section className={styles.section} aria-labelledby="proof">
          <div className={styles.head}>
            <h2 id="proof" className={styles.h2}>
              Recent work
            </h2>
            <p className={styles.sub}>
              Two things I&rsquo;ve built lately, for a sense of what the money gets you.
            </p>
          </div>
          <ul className={styles.work}>
            {proof.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i === 0} />
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="faq">
          <div className={styles.head}>
            <h2 id="faq" className={styles.h2}>
              Questions people ask
            </h2>
          </div>
          <div className={styles.faq}>
            {pricingFaq.map((item) => (
              <article key={item.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.close} aria-labelledby="close">
          <div>
            <h2 id="close" className={styles.closeTitle}>
              Tell me what you want built.
            </h2>
            <p className={styles.closeBody}>
              A couple of sentences is plenty to start. I&rsquo;ll write back with a price.
            </p>
          </div>
          <div className={styles.closeActions}>
            <a href={`mailto:${site.email}`} className={styles.btnPrimary}>
              Email me
            </a>
            <Link to="/work/eaglechair" className={styles.btnOnDark}>
              See EagleChair <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
