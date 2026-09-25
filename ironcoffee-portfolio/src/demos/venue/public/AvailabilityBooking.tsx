import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { DemoConfig } from '../../types';
import type { DayRecord, PackageRecord } from '../data';
import { MONTHS, PACKAGES, SEASON_YEAR, YEAR, money, packageBlock, packageById, pretty } from '../data';
import MonthGrid from './MonthGrid';
import styles from '../Public.module.css';

/**
 * Date, headcount, package, confirm. The inquiry form that behaves like a
 * booking screen.
 *
 * Every wedding venue website ends at a contact form, and every couple filling
 * one in is really asking three questions the form cannot answer: is our date
 * free, do we fit, and what does it cost. This answers all three before anyone
 * types their name, which is the whole argument for building the site as an
 * application instead of a brochure.
 *
 * It stops one step short of holding a date, and says so in plain words on the
 * confirmation. A sample site that appeared to reserve a Saturday in 2027
 * would be a genuinely bad idea.
 *
 * Nothing here reads the clock. The calendar is a fixed year of fixed records
 * from data.ts, so the markup the server writes and the markup the browser
 * hydrates into are the same markup. A date computed from `new Date()` would
 * render one month on the build machine and another in a visitor's browser,
 * which is a hydration error rather than a nice touch.
 */

/** Taken from the data rather than typed out, so the year lives in one place. */
const YEAR_NUMBER = SEASON_YEAR;

/** Opens on a month with dates in it. A fixed index, for the reason above. */
const START_MONTH = 4;

const QUICK_COUNTS = [40, 80, 120, 140];

/** What the guest field starts on, and goes back to on "Start again". */
const DEFAULT_GUESTS = '80';

/** Above this the number input stops taking the visitor seriously. */
const MAX_GUESTS = 400;

const STEPS = [
  { n: 1, label: 'Date' },
  { n: 2, label: 'Guests' },
  { n: 3, label: 'Package' },
  { n: 4, label: 'Details' },
] as const;

const TITLES: Record<number, string> = {
  1: 'Pick a date',
  2: 'How many people',
  3: 'Pick a package',
  4: 'Check the details',
};

const LARGEST = PACKAGES.reduce((n, p) => Math.max(n, p.capacity), 0);

/** Good enough to catch a typo, loose enough not to argue about valid addresses. */
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export default function AvailabilityBooking({ config }: { config: DemoConfig }) {
  const [step, setStep] = useState(1);
  const [month, setMonth] = useState(START_MONTH);
  const [date, setDate] = useState('');
  /** Text, not a number, so the field can be empty while somebody is typing. */
  const [guestText, setGuestText] = useState(DEFAULT_GUESTS);
  const [packageId, setPackageId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  /** Ids are generated, so two of these on one page cannot collide. */
  const uid = useId();
  const id = (part: string) => `${uid}-${part}`;
  /** Skips the focus move on the first render, which would steal focus on load. */
  const settled = useRef(false);

  const guests = Number.parseInt(guestText, 10) || 0;

  const byMonth = useMemo(() => {
    const out: DayRecord[][] = Array.from({ length: 12 }, () => []);
    for (const day of YEAR) out[Number(day.date.slice(5, 7)) - 1].push(day);
    return out;
  }, []);

  const days = byMonth[month];
  const firstWeekday = weekdayOf(days[0].date);
  const monthLabel = `${MONTHS[month]} ${YEAR_NUMBER}`;

  const chosen = packageById(packageId);
  const chosenSeats = Boolean(chosen && chosen.capacity >= guests);
  /** Seats them and runs on the date they picked. */
  const chosenFits = chosenSeats && Boolean(chosen && !packageBlock(chosen, date));
  const nothingFits = guests > LARGEST;

  /* --- Moving between steps ----------------------------------------------
     The only route to step 4 is picking a package that fits, so there is no
     state in which the summary can show a package the headcount has since
     outgrown. Going back never clears anything: a couple who steps back to
     change the guest count and then forward again finds their date still
     selected, because losing it would be the moment they give up. */

  const goTo = (next: number) => {
    setSent(false);
    setStep(next);
  };

  const pickDate = (iso: string) => {
    setDate(iso);
    goTo(2);
  };

  const pickPackage = (pkg: PackageRecord) => {
    setPackageId(pkg.id);
    goTo(4);
  };

  // Focus follows the step. Without this the button that advanced the flow
  // unmounts, focus falls back to the document, and the next Tab starts again
  // at the top of the page.
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    panelRef.current?.focus({ preventScroll: true });
  }, [step, sent]);

  const announcement = sent
    ? 'Request complete. This is a demonstration.'
    : `Step ${step} of 4. ${TITLES[step]}.`;

  return (
    <div className={styles.book}>
      <ol className={styles.steps}>
        {STEPS.map((s) => {
          const state = sent || step > s.n ? 'done' : step === s.n ? 'now' : 'todo';
          const body = (
            <>
              <span className={styles.stepDot} aria-hidden="true">
                {s.n}
              </span>
              <span className={styles.stepLabel}>{s.label}</span>
            </>
          );

          return (
            <li key={s.n} className={styles.stepItem} data-state={state}>
              {state === 'done' && !sent ? (
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={() => goTo(s.n)}
                >
                  {body}
                  <span className={styles.sr}>, completed, go back to this step</span>
                </button>
              ) : (
                <span
                  className={styles.stepBtn}
                  aria-current={state === 'now' ? 'step' : undefined}
                >
                  {body}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p className={styles.sr} role="status" aria-live="polite">
        {announcement}
      </p>

      <div
        className={styles.panel}
        ref={panelRef}
        tabIndex={-1}
        aria-labelledby={id('title')}
      >
        <h3 className={styles.panelTitle} id={id('title')}>
          {sent ? 'That is everything' : TITLES[step]}
        </h3>

        {sent ? (
          <div className={styles.done}>
            <p className={styles.doneLead}>
              Thank you, {name || 'friend'}. Here is what you picked.
            </p>
            <Summary date={date} guests={guests} pkg={chosen} />
            <p className={styles.doneNote}>
              This is a demonstration of {config.business.name}, a venue that
              does not exist. Nothing was sent, no email was collected and no
              date is being held. On a real site this would land in the owner&rsquo;s
              inbox, put a soft hold on {pretty(date)} for a week, and send you a
              copy of the above.
            </p>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={() => {
                // Everything, not just the step. "Start again" that keeps the
                // last person's name and date is "go back", mislabeled.
                setSent(false);
                setMonth(START_MONTH);
                setDate('');
                setGuestText(DEFAULT_GUESTS);
                setPackageId('');
                setName('');
                setEmail('');
                setTouched(false);
                setStep(1);
              }}
            >
              Start again
            </button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <>
                <p className={styles.hint}>
                  One booking a weekend, so most midweek dates are closed.
                  Fridays, Saturdays and Mondays are the ones to look at.
                </p>

                <div className={styles.calHead}>
                  <button
                    type="button"
                    className={styles.calNav}
                    onClick={() => setMonth((m) => m - 1)}
                    disabled={month === 0}
                    aria-label="Previous month"
                  >
                    <span aria-hidden="true">&lsaquo;</span>
                  </button>
                  <span className={styles.calMonth} aria-live="polite">
                    {monthLabel}
                  </span>
                  <button
                    type="button"
                    className={styles.calNav}
                    onClick={() => setMonth((m) => m + 1)}
                    disabled={month === 11}
                    aria-label="Next month"
                  >
                    <span aria-hidden="true">&rsaquo;</span>
                  </button>
                </div>

                <MonthGrid
                  days={days}
                  firstWeekday={firstWeekday}
                  label={monthLabel}
                  selected={date}
                  onPick={pickDate}
                />

                <ul className={styles.legend}>
                  <li className={styles.legendItem}>
                    <span className={styles.legendFree} aria-hidden="true" /> Open
                  </li>
                  <li className={styles.legendItem}>
                    <span className={styles.legendOff} aria-hidden="true" /> Taken or
                    closed
                  </li>
                </ul>
              </>
            )}

            {step === 2 && (
              <>
                <p className={styles.hint}>
                  A rough number is fine. It decides which packages you can see,
                  and you can change it later.
                </p>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor={id('guests')}>
                    Guests
                  </label>
                  <input
                    id={id('guests')}
                    className={styles.input}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_GUESTS}
                    value={guestText}
                    onChange={(e) => {
                      setSent(false);
                      const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
                      // Clamped to the same ceiling the field advertises, so
                      // 999 cannot sit in a box that says it stops at 400.
                      setGuestText(
                        digits && Number(digits) > MAX_GUESTS ? String(MAX_GUESTS) : digits
                      );
                    }}
                  />
                </div>

                <div className={styles.chips} role="group" aria-label="Common guest counts">
                  {QUICK_COUNTS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={[styles.chip, guests === n && styles.chipOn]
                        .filter(Boolean)
                        .join(' ')}
                      aria-pressed={guests === n}
                      onClick={() => setGuestText(String(n))}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {/* Live, because the warning is the useful part: somebody who
                    types 150 should find out now, not after picking a package
                    that cannot seat them. */}
                <p className={styles.warn} role="status" aria-live="polite">
                  {nothingFits
                    ? `The barn seats ${LARGEST}. Anything larger is a conversation rather than a form.`
                    : chosen && !chosenSeats
                      ? `${chosen.name} seats ${chosen.capacity}, so it is out at ${guests}. Pick another on the next step.`
                      : ''}
                </p>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    onClick={() => goTo(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => goTo(3)}
                    disabled={guests < 1}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className={styles.hint}>
                  {pretty(date)}, {guests} {guests === 1 ? 'guest' : 'guests'}.
                </p>

                <ul className={styles.packs}>
                  {PACKAGES.map((pkg) => {
                    const fits = pkg.capacity >= guests;
                    // Seasonal and weekday packages are shown with the reason
                    // rather than hidden, so nobody wonders where the cheap
                    // one went.
                    const offDate = packageBlock(pkg, date);

                    return (
                      <li key={pkg.id}>
                        {fits && !offDate ? (
                          <button
                            type="button"
                            className={[
                              styles.pack,
                              packageId === pkg.id && chosenFits && styles.packOn,
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            onClick={() => pickPackage(pkg)}
                          >
                            <PackBody pkg={pkg} />
                          </button>
                        ) : (
                          <div className={`${styles.pack} ${styles.packOff}`}>
                            <PackBody pkg={pkg} />
                            <p className={styles.packWhy}>
                              {fits
                                ? `Not on ${pretty(date)}. ${offDate}.`
                                : `Not available: seats ${pkg.capacity}, and you said ${guests}.`}
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    onClick={() => goTo(2)}
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <form
                className={styles.form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  setTouched(true);
                  if (name.trim() && looksLikeEmail(email)) setSent(true);
                }}
              >
                <Summary date={date} guests={guests} pkg={chosen} />

                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor={id('name')}>
                      Your name
                    </label>
                    <input
                      id={id('name')}
                      className={styles.input}
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={touched && !name.trim() ? true : undefined}
                      aria-describedby={
                        touched && !name.trim() ? id('name-error') : undefined
                      }
                    />
                    {touched && !name.trim() && (
                      <span className={styles.error} id={id('name-error')}>
                        Tell us who you are.
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor={id('email')}>
                      Email
                    </label>
                    <input
                      id={id('email')}
                      className={styles.input}
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={
                        touched && !looksLikeEmail(email) ? true : undefined
                      }
                      aria-describedby={
                        touched && !looksLikeEmail(email)
                          ? id('email-error')
                          : undefined
                      }
                    />
                    {touched && !looksLikeEmail(email) && (
                      <span className={styles.error} id={id('email-error')}>
                        That address does not look right.
                      </span>
                    )}
                  </div>
                </div>

                <p className={styles.note}>
                  A demonstration. Sending this holds nothing and reaches nobody.
                </p>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    onClick={() => goTo(3)}
                  >
                    Back
                  </button>
                  <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Send request
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PackBody({ pkg }: { pkg: PackageRecord }) {
  return (
    <>
      <span className={styles.packHead}>
        <span className={styles.packName}>{pkg.name}</span>
        <span className={styles.packPrice}>{money(pkg.price)}</span>
      </span>
      <span className={styles.packMeta}>
        Up to {pkg.capacity} guests. {pkg.note}.
      </span>
      <span className={styles.packList}>{pkg.includes.join('. ')}.</span>
    </>
  );
}

function Summary({
  date,
  guests,
  pkg,
}: {
  date: string;
  guests: number;
  pkg?: PackageRecord;
}) {
  return (
    <dl className={styles.summary}>
      <div className={styles.sumRow}>
        <dt>Date</dt>
        <dd>{pretty(date)}</dd>
      </div>
      <div className={styles.sumRow}>
        <dt>Guests</dt>
        <dd>{guests}</dd>
      </div>
      <div className={styles.sumRow}>
        <dt>Package</dt>
        <dd>{pkg ? pkg.name : 'Not picked'}</dd>
      </div>
      <div className={`${styles.sumRow} ${styles.sumTotal}`}>
        <dt>Total</dt>
        <dd>{pkg ? money(pkg.price) : 'Pick a package'}</dd>
      </div>
    </dl>
  );
}

/** 0 for Sunday. Fixed input, so the server and the browser agree. */
function weekdayOf(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}
