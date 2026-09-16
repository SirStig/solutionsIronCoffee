import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { site } from '../content/site';
import { showcases } from '../demos';
import Img from '../components/Img';
import {
  DIY_SURVEY,
  care,
  compare,
  pricingFaq,
  steps,
  tiers,
} from '../content/pricing';
import styles from './Services.module.css';

/**
 * Pricing. Linked from every sample site and every preview, because that is
 * the page an owner goes looking for about ninety seconds after opening one.
 *
 * The order is the argument. The objection comes second, before the prices,
 * because a reader who has not been given a reason to stop comparing this to
 * a thirty dollar subscription will do exactly that when they hit the numbers.
 * Proof comes after the prices, because that is the moment somebody wants to
 * see whether the work is any good. The monthly plan comes last of the money
 * sections, and it is the only place a subscription price appears next to one
 * of mine.
 */
/**
 * Structured data for the page.
 *
 * `Service`, not `LocalBusiness`. Every local type wants a street address and
 * opening hours, none of which are published anywhere on this site, and
 * inventing them to satisfy a schema validator is the same lie the demo
 * configs are forbidden from telling.
 *
 * Worth being clear about what this does and does not buy: neither `Offer`
 * pricing nor `FAQPage` produces a visible rich result for a service business
 * in Google today, and FAQ rich results were retired outright. This is here
 * because it is accurate and machine-readable, which matters for the entity
 * graph and for the answer engines that now read pages instead of ranking
 * them. It is not here to win a snippet.
 */
const serviceSchema = {
  '@type': 'Service',
  '@id': `${site.url}/services#service`,
  name: 'Small business website design',
  serviceType: 'Website design and development',
  provider: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
  areaServed: 'US',
  url: `${site.url}/services`,
  description:
    'Fixed-price websites for small businesses. Built first, paid for only if you keep it.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website packages',
    itemListElement: tiers.map((tier) => {
      const digits = tier.price.replace(/[^0-9]/g, '');
      const offered = {
        '@type': 'Service',
        name: `${tier.name} website`,
        description: tier.summary,
      };
      return tier.price.startsWith('From')
        ? {
            '@type': 'Offer',
            name: tier.name,
            url: `${site.url}/services`,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: digits,
              priceCurrency: 'USD',
            },
            itemOffered: offered,
          }
        : {
            '@type': 'Offer',
            name: tier.name,
            url: `${site.url}/services`,
            price: digits,
            priceCurrency: 'USD',
            itemOffered: offered,
          };
    }),
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

export default function Services() {
  return (
    <>
      <Seo
        title="Small business website design, priced up front"
        description="Fixed prices for small business websites. One page $500, a full site $1,800. I build it first, you look at it, then you decide."
        path="/services"
        image="/og-services.png"
        jsonLd={[serviceSchema, faqSchema, breadcrumbSchema]}
      />

      <div className="container-wide">
        <header className={styles.header}>
          <p className={styles.kicker}>Websites for small businesses</p>
          <h1 className={styles.h1}>
            I build it first. You look at it. Then you decide.
          </h1>
          <p className={styles.lede}>
            A finished site with your photos and your words on it, before any
            money changes hands. Say no and you owe nothing.
          </p>
          <div className={styles.heroActions}>
            <Link to="/templates" className={styles.btnPrimary}>
              See the samples
            </Link>
            <a href={`mailto:${site.email}`} className={styles.btnGhost}>
              Email me
            </a>
          </div>
          <p className={styles.heroNote}>
            $500 to $1,800. Fixed. No retainer, no contract, yours the day it
            goes live.
          </p>
        </header>

        {/* --- The objection, before the prices ---------------------------- */}
        <section className={styles.section} aria-labelledby="wix">
          <h2 id="wix" className={styles.h2}>
            Why not just use Wix?
          </h2>
          <p className={styles.sectionLede}>
            Plenty of people should. If you have a site you are happy with,
            keep it. Here is the honest difference.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.compare}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">The question</span>
                  </th>
                  <th scope="col">Doing it yourself</th>
                  <th scope="col" className={styles.mineCol}>
                    Having me do it
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th>
                    <td>
                      <span className={styles.cell}>
                        <X size={15} className={styles.no} aria-hidden="true" />
                        <span>{row.diy}</span>
                      </span>
                    </td>
                    <td className={styles.mineCol}>
                      <span className={styles.cell}>
                        <Check
                          size={15}
                          className={styles.yes}
                          aria-hidden="true"
                        />
                        <span>{row.mine}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* The table keeps a 40rem minimum and scrolls inside its own box
              rather than collapsing into cards, because the argument only
              works while both answers are on screen together. The cut-off
              third column is most of the affordance; this says it out loud
              for anyone who reads before they swipe. */}
          <p className={styles.swipe} aria-hidden="true">
            Swipe the table sideways
          </p>

          <p className={styles.stat}>
            <strong>{DIY_SURVEY.abandoned}</strong> of people who start a
            build-it-yourself website never get it live.{' '}
            <strong>{DIY_SURVEY.neverReturned}</strong> never go back to it at
            all.{' '}
            <a
              className={styles.source}
              href={DIY_SURVEY.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {DIY_SURVEY.note}
            </a>
          </p>
        </section>

        {/* --- Prices ------------------------------------------------------ */}
        <section className={styles.section} aria-labelledby="prices">
          <h2 id="prices" className={styles.h2}>
            What it costs
          </h2>

          <div className={styles.tiers}>
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className={[styles.tier, tier.featured && styles.featured]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className={styles.tierTop}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  {tier.featured && <span className={styles.tag}>Most people</span>}
                </div>
                <p className={styles.price}>{tier.price}</p>
                <p className={styles.summary}>{tier.summary}</p>
                <ul className={styles.features}>
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} className={styles.yes} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.timeline}>{tier.timeline}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Proof ------------------------------------------------------- */}
        <section className={styles.section} aria-labelledby="proof">
          <h2 id="proof" className={styles.h2}>
            Look at the work first
          </h2>
          <p className={styles.sectionLede}>
            Finished sample sites, every one a real page rather than a picture
            of one. Open one on your phone.
          </p>

          <ul className={styles.proof}>
            {showcases.map((demo) => (
              <li key={demo.slug}>
                <Link to={`/templates/${demo.slug}`} className={styles.proofCard}>
                  {/* The screenshot, not the business's hero photograph. A
                      strip of food and haircuts says nothing about whether
                      the websites are any good. */}
                  <span className={styles.proofShot}>
                    <Img
                      name={`templates/${demo.slug}-desktop`}
                      alt={`The ${demo.business.name} sample site`}
                      sizes="(min-width: 60rem) 20vw, 45vw"
                    />
                  </span>
                  <span className={styles.proofName}>{demo.business.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* --- Process ------------------------------------------------------ */}
        <section className={styles.section} aria-labelledby="how">
          <h2 id="how" className={styles.h2}>
            How it goes
          </h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --- The monthly plan. The only place a subscription price sits
             beside one of mine, because month against month is the honest
             comparison and the one worth having. ---------------------------- */}
        <section className={styles.care} aria-labelledby="care">
          <div className={styles.careHead}>
            <h2 id="care" className={styles.h2}>
              {care.name}
            </h2>
            <p className={styles.carePrice}>{care.price}</p>
            <p className={styles.careNote}>{care.note}</p>
          </div>
          <ul className={styles.careList}>
            {care.features.map((feature) => (
              <li key={feature}>
                <Check size={15} className={styles.yes} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* --- Objections --------------------------------------------------- */}
        <section className={styles.section} aria-labelledby="faq">
          <h2 id="faq" className={styles.h2}>
            The questions I actually get
          </h2>
          <div className={styles.faq}>
            {pricingFaq.map((item) => (
              <article key={item.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.close}>
          <h2 className={styles.closeTitle}>Nothing to lose by looking.</h2>
          <p className={styles.closeBody}>
            Tell me what you do and I will build the first version. If you do
            not want it, that is the end of it.
          </p>
          <div className={styles.closeActions}>
            <a href={`mailto:${site.email}`} className={styles.btnPrimary}>
              Email me
            </a>
            <Link to="/templates" className={styles.btnOnDark}>
              See the samples
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
