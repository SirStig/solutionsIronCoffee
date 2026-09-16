import { useState } from 'react';
import styles from './CostCompare.module.css';

/**
 * Rent versus own, in two numbers.
 *
 * An earlier version of this had a tier selector, a care plan checkbox, a
 * four row table and two paragraphs of caveats. It also folded hosting into
 * the one-time column, so $500 displayed as $596 over a year and stopped
 * looking like a one-time price at all. Both were mistakes. This shows the
 * subscription total, the build price, and nothing else.
 */

const money = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

export default function CostCompare() {
  const [monthly, setMonthly] = useState(49);
  const fiveYears = monthly * 60;

  return (
    <div className={styles.wrap}>
      <label className={styles.ask}>
        <span>Paying a site builder</span>
        <span className={styles.inputRow}>
          <span className={styles.prefix}>$</span>
          <input
            type="number"
            min={0}
            max={999}
            value={monthly}
            onChange={(e) => setMonthly(Math.max(0, Number(e.target.value) || 0))}
            aria-label="Monthly subscription in dollars"
          />
          <span className={styles.suffix}>a month</span>
        </span>
      </label>

      <div className={styles.pair}>
        <div className={styles.side}>
          <span className={styles.sideLabel}>Renting</span>
          <span className={styles.sideValue}>{money(fiveYears)}</span>
          <span className={styles.sideNote}>
            over five years, and you still do not own it
          </span>
        </div>

        <div className={`${styles.side} ${styles.mine}`}>
          <span className={styles.sideLabel}>Buying</span>
          <span className={styles.sideValue}>$1,800</span>
          <span className={styles.sideNote}>once, and it is yours</span>
        </div>
      </div>

      <p className={styles.foot}>
        Hosting runs about $8 a month wherever you put it. If you are paying
        $20 and happy, stay put. I will tell you that on the phone.
      </p>
    </div>
  );
}
