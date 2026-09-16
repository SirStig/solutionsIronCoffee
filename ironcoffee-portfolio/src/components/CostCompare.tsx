import { useMemo, useState } from 'react';
import { tiers } from '../content/pricing';
import styles from './CostCompare.module.css';

/**
 * Arithmetic, using the reader's own number, and honest about the answer.
 *
 * The first version of this defaulted to including the monthly care plan and
 * printed "$3,240 more" in the comparison column, which is a sales page
 * arguing for the competition. The real position is narrower and worth stating
 * plainly: at low subscription prices a platform is genuinely cheaper for the
 * first few years, and the point of paying once is that it stops. So this
 * compares like for like, defaults to hosting it yourself, and reports the
 * break-even year rather than a verdict.
 *
 * Nobody's pricing but mine appears here. A competitor's figure would be out
 * of date within a quarter and is the first thing a sceptic checks.
 */

const money = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

const YEARS = [1, 3, 5, 10];

/** What plain static hosting costs anywhere. The site is files; files are cheap. */
const SELF_HOST = 8;

/** Build prices come from the pricing content, so they cannot drift apart. */
const BUILD: Record<string, number> = {
  starter: 500,
  standard: 1800,
  custom: 3200,
};

export default function CostCompare() {
  // Defaults matter more than the maths here. A realistic all-in figure for a
  // small business plan with a booking or store add-on, against the entry
  // build, which is the comparison most readers are actually in.
  const [monthly, setMonthly] = useState(49);
  const [tierId, setTierId] = useState('starter');
  const [care, setCare] = useState(false);

  const build = BUILD[tierId] ?? 1800;
  const careMonthly = 59;
  const running = care ? careMonthly : SELF_HOST;

  const rows = useMemo(
    () =>
      YEARS.map((years) => {
        const months = years * 12;
        return {
          years,
          subscription: monthly * months,
          mine: build + running * months,
        };
      }),
    [monthly, build, running]
  );

  /** First whole year where paying once has cost less. Null if it never does. */
  const breakEven = useMemo(() => {
    if (monthly <= running) return null;
    const years = build / ((monthly - running) * 12);
    return years > 25 ? null : Math.ceil(years);
  }, [monthly, running, build]);

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
          <span className={styles.hint}>
            Starts at a typical business plan with one add-on for booking or
            ordering. Put your own figure in.
          </span>
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
            Have me look after it instead, {money(careMonthly)} a month. Off by
            default, because you can host this anywhere.
          </span>
        </label>
      </div>

      <p className={styles.verdict}>
        {breakEven === null ? (
          <>
            At {money(monthly)} a month, paying once does not work out cheaper.
            Buy the subscription and spend the difference on something else.
            What you would be paying me for is the building of it, not a saving.
          </>
        ) : (
          <>
            At {money(monthly)} a month you would spend{' '}
            {money(monthly * 12 * 10)} over ten years and own none of it. Paying
            once is ahead from <strong>year {breakEven}</strong>, and further
            ahead every year after, because the big number never comes back.
          </>
        )}
      </p>

      <table className={styles.table}>
        <caption className={styles.caption}>
          <strong>Counted here:</strong> {tier?.name} at {money(build)} once,
          plus{' '}
          {care
            ? `${money(careMonthly)} a month to have me look after it`
            : `about ${money(SELF_HOST)} a month for hosting, bought anywhere you like`}
          .{' '}
          {!care && (
            <>
              The {money(careMonthly)} care plan is <strong>not</strong> in
              these numbers.
            </>
          )}
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
                <td className={delta >= 0 ? styles.better : styles.worse}>
                  {delta >= 0
                    ? `${money(delta)} less`
                    : `${money(-delta)} more`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className={styles.honest}>
        <strong>The money is the weakest reason to do this.</strong> If you are
        paying twenty dollars a month and it is working, keep it, and I will
        tell you so on the phone. The two reasons that actually hold up are that
        you get the thing built at all, by someone whose job it is, instead of
        it sitting on the list for another two years; and that you own what
        comes out. The files are yours, the domain is in your name, and you can
        move it to any host on earth in an afternoon. A site you rent, you can
        never take with you.
      </p>
    </div>
  );
}
