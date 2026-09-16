import Seo from '../components/Seo';
import { site } from '../content/site';
import { PREVIEW_DAYS } from '../demos';
import styles from './PreviewExpired.module.css';

/**
 * What a lapsed preview link lands on.
 *
 * A dead link is a wasted introduction, so this page does the job the preview
 * was doing: says what the link was, offers to put it back, and points at the
 * gallery and the pricing for anyone who arrived here cold.
 */
export default function PreviewExpired({ business }: { business?: string }) {
  return (
    <>
      <Seo
        title="This preview has expired"
        description="The website preview at this link is no longer live. Ask for it back, or see the sample sites and pricing."
        path="/preview-expired"
        noindex
      />

      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Preview expired</span>

        <h1>
          {business
            ? `The preview for ${business} has come down.`
            : 'This preview has come down.'}
        </h1>

        <p className={styles.lede}>
          Previews stay up for {PREVIEW_DAYS} days and then retire themselves, so
          nothing sits on the internet longer than it is useful. If you want this
          one back it takes about a minute to put up again.
        </p>

        <div className={styles.actions}>
          <a className={`${styles.btn} ${styles.primary}`} href={`${site.url}/contact`}>
            Ask for it back
          </a>
          <a className={`${styles.btn} ${styles.secondary}`} href={`${site.url}/templates`}>
            See sample sites
          </a>
          <a className={`${styles.btn} ${styles.secondary}`} href={`${site.url}/services`}>
            Pricing
          </a>
        </div>

        <p className={styles.note}>
          Joshua Kac builds websites for small businesses, for a fixed price,
          and you see yours finished before you pay for it. Email{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </>
  );
}
