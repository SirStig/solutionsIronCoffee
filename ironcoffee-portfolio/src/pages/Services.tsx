import { Check } from 'lucide-react';
import CostCompare from '../components/CostCompare';
import SpeedPanel from '../components/SpeedPanel';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { site } from '../content/site';
import { care, pricingFaq, tiers } from '../content/pricing';
import styles from './Services.module.css';

const steps = [
  {
    title: 'A phone call',
    body: 'Twenty minutes. What you do, who comes in, and what you want the site to make happen.',
  },
  {
    title: 'You see it built',
    body: 'I put together a real page with your photos and send you the link. Nothing is owed until you have looked at it.',
  },
  {
    title: 'You mark it up',
    body: 'Tell me what is wrong, what is missing and what I got backwards. This is the part that makes it yours.',
  },
  {
    title: 'It goes live',
    body: 'Domain pointed, search listings updated, and a call so you know how to change your own hours.',
  },
];

/**
 * Pricing. Reachable from every sample site and every preview, because that is
 * the link an owner goes looking for about ninety seconds after they open one.
 */
export default function Services() {
  return (
    <>
      <Seo
        title="What a website costs"
        description="Fixed pricing for small business websites in Elizabeth, Parker and around Colorado. One page from $500, a full site for $1,800, and optional monthly care."
        path="/services"
      />

      <div className="container-wide">
        <header className={styles.header}>
          <h1>What a website costs.</h1>
          <p className={styles.lede}>
            Three prices, written down, so you can work out whether this is worth
            a phone call without having to make one. Every job is quoted before
            it starts and the number does not move afterwards.
          </p>
        </header>

        <div className={styles.tiers}>
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={[styles.tier, tier.featured && styles.featured]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.tierTop}>
                <h2 className={styles.tierName}>{tier.name}</h2>
                {tier.featured && <span className={styles.tag}>Most people</span>}
              </div>

              <p className={styles.price}>{tier.price}</p>
              <p className={styles.summary}>{tier.summary}</p>
              <p className={styles.bestFor}>{tier.bestFor}</p>

              <ul className={styles.features}>
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} className={styles.tick} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <p className={styles.timeline}>{tier.timeline}</p>
            </article>
          ))}
        </div>

        <section className={styles.care}>
          <div>
            <h2 className={styles.sectionTitle}>{care.name}</h2>
            <p className={styles.carePrice}>{care.price}</p>
            <p className={styles.careNote}>{care.note}</p>
          </div>

          <ul className={styles.careList}>
            {care.features.map((feature) => (
              <li key={feature}>
                <Check size={15} className={styles.tick} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How it goes</h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Why not just use Wix or Squarespace?
          </h2>
          <p className={styles.sectionIntro}>
            Sometimes you should, and I will say so. But two things are worth
            knowing before you decide, and both of them you can check yourself
            rather than take my word for.
          </p>

          <h3 className={styles.subTitle}>One. It is yours, and it adds up</h3>
          <CostCompare />

          <h3 className={styles.subTitle}>Two. It is fast, and that is checkable</h3>
          <p className={styles.sectionIntro}>
            Most drag-and-drop platforms ship a few megabytes of JavaScript
            before anyone sees a word. On a phone, on rural Colorado signal,
            that is the difference between a customer waiting and a customer
            going back to the search results. Here is this page:
          </p>
          <SpeedPanel />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Questions worth asking</h2>
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
          <h2 className={styles.closeTitle}>Have a look before you decide.</h2>
          <p className={styles.closeBody}>
            Four finished sample sites, built the same way yours would be. Open
            one on your phone and see how it feels.
          </p>
          <div className={styles.closeActions}>
            <Link to="/templates" className={`${styles.btn} ${styles.btnPrimary}`}>
              See the samples
            </Link>
            <a href={`mailto:${site.email}`} className={`${styles.btn} ${styles.btnGhost}`}>
              Email me
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
