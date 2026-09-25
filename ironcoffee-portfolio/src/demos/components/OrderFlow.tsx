import { useEffect, useMemo, useState } from 'react';
import type { DemoConfig } from '../types';
import { Icon } from './icons';
import { WEEKDAYS, businessTimeZone, parseSpan, zonedClock } from './blocks';
import styles from '../Demo.module.css';

/**
 * A working pickup-order flow, built from the menu already in the config.
 *
 * This is the thing that separates the top pricing tier from a brochure site,
 * so it needs to actually work: real quantities, a real running total, a real
 * pickup time. It stops one step short of taking money, and says so, because
 * a sample site that appeared to accept a card would be a genuinely bad idea.
 *
 * All state is component state. Nothing is stored, nothing is sent.
 */

interface Line {
  name: string;
  price: number;
  qty: number;
}

/** '$26' -> 26. Anything without a number is not orderable. */
function parsePrice(price?: string): number | null {
  if (!price) return null;
  const m = price.replace(/,/g, '').match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
}

const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

/** 690 -> '11:30am'. Wraps past midnight for a late close. */
function clockLabel(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m % 60).padStart(2, '0')}${h24 < 12 ? 'am' : 'pm'}`;
}

interface PickupPlan {
  /** Null when the slots are today; the weekday name when they are not. */
  day: string | null;
  slots: string[];
}

/**
 * Half-hour pickup slots from the same hours table the page prints.
 *
 * The first slot is half an hour after opening and the last half an hour
 * before closing. Today's slots start at least twenty minutes from now. If
 * today has none left, or is closed, the next day that states hours is
 * offered instead. A week with no parseable hours at all ("By appointment")
 * gets no slots, and the page says to call rather than inventing a window.
 */
export function pickupPlan(
  hours: DemoConfig['hours'],
  now: Date,
  timeZone: string
): PickupPlan | null {
  const clock = zonedClock(now, timeZone);

  for (let step = 0; step < 7; step += 1) {
    const day = WEEKDAYS[(clock.dayIndex + step) % 7];
    const row = hours.find((h) => h.day === day);
    const span = row ? parseSpan(row.open) : null;
    if (!span) continue;

    let start = span.open + 30;
    if (step === 0) {
      const soonest = Math.ceil((clock.minutes + 20) / 30) * 30;
      start = Math.max(start, soonest);
    }

    const slots: string[] = [];
    for (let m = start; m <= span.close - 30; m += 30) slots.push(clockLabel(m));
    if (slots.length) return { day: step === 0 ? null : day, slots };
  }
  return null;
}

export default function OrderFlow({ config }: { config: DemoConfig }) {
  const sections = config.menu ?? [];
  const [lines, setLines] = useState<Record<string, Line>>({});
  const [time, setTime] = useState('');
  const [placed, setPlaced] = useState(false);
  // Undefined until mounted, null when the hours give no pickup window.
  const [plan, setPlan] = useState<PickupPlan | null | undefined>(undefined);

  // Read the clock after hydration, never during render: the page is built
  // days before anyone orders from it. See <OpenNow>.
  const timeZone = businessTimeZone(config);
  useEffect(() => {
    const next = pickupPlan(config.hours, new Date(), timeZone);
    setPlan(next);
    setTime(next?.slots[0] ?? '');
  }, [config.hours, timeZone]);

  const items = useMemo(() => Object.values(lines).filter((l) => l.qty > 0), [lines]);
  const subtotal = items.reduce((sum, l) => sum + l.price * l.qty, 0);
  // Only a rate the config states. A guessed one is a wrong number on a
  // receipt with the business's name on it.
  const taxRate = config.order?.taxRate;
  const tax = taxRate === undefined ? null : subtotal * taxRate;
  const total = subtotal + (tax ?? 0);
  const count = items.reduce((n, l) => n + l.qty, 0);
  const when = plan?.day ? `${time} on ${plan.day}` : time;

  function bump(name: string, price: number, delta: number) {
    setPlaced(false);
    setLines((prev) => {
      const qty = Math.max(0, (prev[name]?.qty ?? 0) + delta);
      return { ...prev, [name]: { name, price, qty } };
    });
  }

  return (
    <div className={styles.orderGrid}>
      <div className={styles.orderMenu}>
        {sections.map((section) => (
          <section key={section.section} className={styles.orderSection}>
            <h2 className={styles.menuSectionTitle}>{section.section}</h2>
            <ul className={styles.orderItems}>
              {section.items.map((item) => {
                const price = parsePrice(item.price);
                const qty = lines[item.name]?.qty ?? 0;

                return (
                  <li key={item.name} className={styles.orderItem}>
                    <div className={styles.orderItemText}>
                      <span className={styles.orderItemName}>{item.name}</span>
                      {item.desc && (
                        <span className={styles.orderItemDesc}>{item.desc}</span>
                      )}
                    </div>

                    {price === null ? (
                      <span className={styles.orderCall}>Call to order</span>
                    ) : (
                      <div className={styles.stepper}>
                        <span className={styles.orderPrice}>{money(price)}</span>
                        <button
                          type="button"
                          className={styles.stepBtn}
                          onClick={() => bump(item.name, price, -1)}
                          disabled={qty === 0}
                          aria-label={`Remove one ${item.name}`}
                        >
                          &minus;
                        </button>
                        <span className={styles.stepQty} aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className={styles.stepBtn}
                          onClick={() => bump(item.name, price, 1)}
                          aria-label={`Add one ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <aside className={styles.orderCart} aria-label="Your order">
        <div className={styles.orderCartInner}>
          <h2 className={styles.blockTitle}>
            <Icon name="box" size={18} />
            Your order
          </h2>

          {items.length === 0 ? (
            <p className={styles.orderEmpty}>
              Nothing yet. Add something from the menu and it will appear here.
            </p>
          ) : (
            <>
              <ul className={styles.orderLines}>
                {items.map((line) => (
                  <li key={line.name} className={styles.orderLine}>
                    <span className={styles.orderLineQty}>{line.qty}&times;</span>
                    <span className={styles.orderLineName}>{line.name}</span>
                    <span className={styles.orderLineTotal}>
                      {money(line.price * line.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className={styles.orderTotals}>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                <div>
                  <dt>{tax === null ? 'Tax' : 'Estimated tax'}</dt>
                  <dd>{tax === null ? 'Calculated at pickup' : money(tax)}</dd>
                </div>
                <div className={styles.orderTotalRow}>
                  <dt>{tax === null ? 'Total before tax' : 'Total'}</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>

              {plan ? (
                <>
                  {plan.day && (
                    <p className={styles.orderEmpty}>
                      No more pickups today. The next is {plan.day}.
                    </p>
                  )}
                  <label className={styles.field}>
                    <span>Pickup time{plan.day ? `, ${plan.day}` : ''}</span>
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
                      {plan.slots.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </>
              ) : plan === null ? (
                <p className={styles.orderEmpty}>
                  {config.business.phone
                    ? `Call ${config.business.phone} to arrange a pickup time.`
                    : 'Pickup times are arranged when the order is confirmed.'}
                </p>
              ) : null}

              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                onClick={() => setPlaced(true)}
              >
                Place order &middot; {money(total)}
              </button>
            </>
          )}

          <p
            className={styles.formStatus}
            role="status"
            aria-live="polite"
            data-state={placed ? 'demo' : 'idle'}
          >
            {placed &&
              `That is ${count} item${count === 1 ? '' : 's'}${when ? ` for ${when}` : ''}. On the live site this would print in the kitchen and text you when it is ready.`}
          </p>

          {/* Says what this is and, more usefully, what it is not.
              Nobody is buying a hand-built checkout: a restaurant already pays
              Toast or Square for card processing, tax tables and a kitchen
              printer, and rebuilding that badly would be a worse product at a
              higher price. What is actually being sold is this, the ordering
              page on the restaurant's own site instead of a third party's, with
              the order handed to whatever they already run. */}
          <p className={styles.orderNote}>
            A demonstration. No payment is taken and nothing is sent. On a real
            site this hands the order to the till system the business already
            uses, so the card, the tax and the kitchen ticket stay where they
            are and the ordering page lives here instead of on somebody
            else&rsquo;s.
          </p>
        </div>
      </aside>
    </div>
  );
}
