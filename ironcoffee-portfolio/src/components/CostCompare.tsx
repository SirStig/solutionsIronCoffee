import { useMemo, useState } from 'react';
import { tiers } from '../content/pricing';
import styles from './CostCompare.module.css';

/**
 * Arithmetic, using the reader's own number.
 *
 * The temptation here is a comparison table with a competitor's pricing filled
 * in, which would be out of date within a quarter and reads as a sales sheet.
 * Asking what they actually pay is both honest and more persuasive, because it
 * is their figure rather than mine.
 */

const money = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

const YEARS = [1, 3, 5];

/** Build prices come from the pricing content, so they cannot drift apart. */
const BUILD: Record<string, number> = {
  starter: 500,
  standard: 1800,
  custom: 3200,
};

export default function CostCompare() {
  const [monthly, setMonthly] = useState(35);
  const [tierId, setTierId] = useState('standard');
  const [care, setCare] = useState(true);

  const build = BUILD[tierId] ?? 1800;
  const careMonthly = 59;

  const rows = useMemo(
    () =>
      YEARS.map((years) => {
        const months = years * 12;
        return {
          years,
          subscription: monthly * months,
          mine: build + (care ? careMonthly * months : 0),
        };
      }),
    [monthly, build, care]
  );

  const tier = tiers.find((t) => t.id === tierId);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span>What are you paying a month now, or being quoted?</span>
          <div className={styles.inputRow}>
            <span className={styles.prefix}>$</span>
            <input
              type="number"
              min={0}
              max={500}
              step={1}
              value={monthly}
              onChange={(e) => setMonthly(Math.max(0, Number(e.target.value) || 0))}
              aria-label="Monthly subscription in dollars"
            />
            <span className={styles.suffix}>per month</span>
          </div>
        </label>

        <label className={styles.field}>
          <span>Which build</span>
          <select value={tierId} onChange={(e) => setTierId(e.target.value)}>
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} &middot; {t.price}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.check}>
          <input
            type="checkbox"
            checked={care}
            onChange={(e) => setCare(e.target.checked)}
          />
          <span>
            Include looking after it, {money(careMonthly)} a month
          </span>
        </label>
      </div>

      <table className={styles.table}>
        <caption className={styles.caption}>
          {tier?.name} at {money(build)} once
          {care ? `, plus ${money(careMonthly)} a month` : ', hosted yourself'}
        </caption>
        <thead>
          <tr>
            <th scope="col">Over</th>
            <th scope="col">Subscription</th>
            <th scope="col">This way</th>
            <th scope="col">Difference</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const delta = row.subscription - row.mine;
            return (
              <tr key={row.years}>
                <th scope="row">
                  {row.years} year{row.years === 1 ? '' : 's'}
                </th>
                <td>{money(row.subscription)}</td>
                <td>{money(row.mine)}</td>
                <td
                  className={delta >= 0 ? styles.better : styles.worse}
                  data-delta={delta >= 0 ? 'cheaper' : 'dearer'}
                >
                  {delta >= 0 ? `${money(delta)} less` : `${money(-delta)} more`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className={styles.honest}>
        <strong>When a subscription is the right answer:</strong> if you enjoy
        building it yourself, you have the evenings to spend, and what you have
        is already bringing people in, keep it. This is for the business that
        has not got a website at all, because nobody there has forty spare
        hours, and for the one paying every month for something it cannot edit,
        export or switch off.
      </p>
    </div>
  );
}
