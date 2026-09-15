import { useMemo, useState } from 'react';
import type { DemoConfig } from '../types';
import { Icon } from './icons';
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

function pickupTimes(): string[] {
  const out: string[] = [];
  for (let h = 11; h <= 18; h += 1) {
    for (const m of ['00', '30']) {
      out.push(`${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? 'pm' : 'am'}`);
    }
  }
  return out;
}

export default function OrderFlow({ config }: { config: DemoConfig }) {
  const sections = config.menu ?? [];
  const [lines, setLines] = useState<Record<string, Line>>({});
  const [time, setTime] = useState('11:30 am');
  const [placed, setPlaced] = useState(false);

  const items = useMemo(() => Object.values(lines).filter((l) => l.qty > 0), [lines]);
  const subtotal = items.reduce((sum, l) => sum + l.price * l.qty, 0);
  const tax = subtotal * 0.0781;
  const count = items.reduce((n, l) => n + l.qty, 0);

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
                  <dt>Estimated tax</dt>
                  <dd>{money(tax)}</dd>
                </div>
                <div className={styles.orderTotalRow}>
                  <dt>Total</dt>
                  <dd>{money(subtotal + tax)}</dd>
                </div>
              </dl>

              <label className={styles.field}>
                <span>Pickup time</span>
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  {pickupTimes().map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                onClick={() => setPlaced(true)}
              >
                Place order &middot; {money(subtotal + tax)}
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
              `That is ${count} item${count === 1 ? '' : 's'} for ${time}. On the live site this would print in the kitchen and text you when it is ready.`}
          </p>

          <p className={styles.orderNote}>
            This is a demonstration. No payment is taken and nothing is sent.
          </p>
        </div>
      </aside>
    </div>
  );
}
