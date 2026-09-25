import { Check, Lock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { site } from '../content/site';
import { showcases } from '../demos';
import Img from '../components/Img';
import {
  DIY_SURVEY,
  care,
  compare,
  priceLine,
  pricingFaq,
  steps,
  tiers,
} from '../content/pricing';
import styles from './Services.module.css';

/**
 * Pricing. Linked from every sample site and every preview, because that is
 * the page an owner goes looking for about ninety seconds after opening one.
 *
 * Prices come straight after the hero, cheapest first and highlighted. This
 * page used to open with a Wix comparison and put the highlight on the $1,800
 * tier, so a reader who skimmed met that number first and left before
 * reaching the one meant for them. Proof follows the prices, because that is
 * when somebody wants to see whether the work is any good. The Wix comparison
 * comes after that, trimmed to four rows.
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
        description="Small business websites from $200. I build it first, you look at it, then you decide. Bookings, orders and a dashboard when you need software behind it."
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
          <p className={styles.heroPrice}>{priceLine()}</p>
          <p className={styles.lede}>
            Say no and you owe nothing.
          </p>
          <div className={styles.heroActions}>
            <a href="#prices" className={styles.btnPrimary}>
              See prices
            </a>
            <Link to="/templates" className={styles.btnGhost}>
              See the samples
            </Link>
          </div>
        </header>

        {/* --- Prices ------------------------------------------------------ */}
        <section className={styles.section} aria-labelledby="prices">
          <h2 id="prices" className={styles.h2}>
            What it costs
          </h2>
          <p className={styles.sectionLede}>
            More pages do not cost more. Software behind the page does.
          </p>

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
                  {tier.featured && (
                    <span className={styles.tag}>{tier.featured}</span>
                  )}
                </div>
                <p className={styles.price}>{tier.price}</p>
                <p className={styles.summary}>{tier.summary}</p>

                {/* The same question on all three, answered differently. It is
                    the shortest way to show that these are three different
                    jobs rather than three sizes of the same one. */}
                <p className={styles.login}>
                  <Lock size={13} aria-hidden="true" />
                  {tier.login}
                </p>

                <ul className={styles.features}>
                  {tier.built.map((item) => (
                    <li key={item}>
                      <Check size={14} className={styles.yes} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className={styles.timeline}>
                  {tier.timeline}
                  {tier.seeIt && (
                    <Link
                      to={`/templates/${tier.seeIt.slug}`}
                      className={styles.seeIt}
                    >
                      {tier.seeIt.label}
                    </Link>
                  )}
                </p>
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
            Real sample sites. Open one on your phone.
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
                      sizes="(min-width: 40rem) 30vw, 45vw"
                    />
                  </span>
                  <span className={styles.proofName}>{demo.business.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* --- Why not Wix ------------------------------------------------- */}
        <section className={styles.section} aria-labelledby="wix">
          <h2 id="wix" className={styles.h2}>
            Why not just use Wix?
          </h2>
          <p className={styles.sectionLede}>
            Plenty of people should. Here is the difference.
          </p>

          {/* Rows, not a table. A table wide enough for both answers had to
              scroll sideways on a phone, and nobody swipes a table to read
              the column that makes the case. Each row stacks on a phone and
              lines up in three columns once there is room. */}
          <div className={styles.compare}>
            <div className={styles.compareHead} aria-hidden="true">
              <span />
              <span>Doing it yourself</span>
              <span className={styles.mineCol}>Having me do it</span>
            </div>
            {compare.map((row) => (
              <div key={row.question} className={styles.compareRow}>
                <h3 className={styles.compareQ}>{row.question}</h3>
                <p className={styles.diy}>
                  <X size={15} className={styles.no} aria-hidden="true" />
                  <span>
                    <span className="visually-hidden">Doing it yourself: </span>
                    {row.diy}
                  </span>
                </p>
                <p className={styles.mineCol}>
                  <Check size={15} className={styles.yes} aria-hidden="true" />
                  <span>
                    <span className="visually-hidden">Having me do it: </span>
                    {row.mine}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <p className={styles.stat}>
            <strong>{DIY_SURVEY.abandoned}</strong> of people who start a
            build-it-yourself site never get it live.{' '}
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
            Tell me what you do and I will build the first version. Do not want
            it? That is the end of it.
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
