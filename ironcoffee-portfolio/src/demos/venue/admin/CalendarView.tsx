/**
 * The month grid, and the panel that does the work.
 *
 * The detail sits beside the grid rather than over it. A calendar is a thing
 * you scan and edit at the same time, and an owner comparing the Saturday
 * either side of a hold should not have to dismiss a modal to do it. That also
 * keeps the whole view in the normal tab order, with no trap to get wrong.
 */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MONTHS, PACKAGES, money, packageBlock, packageById, pretty, type DayRecord } from '../data';
import s from '../Admin.module.css';
import { Fact, STATUS_LABEL, StatusPill } from './ui';
import { CAL_YEAR, dayOf, monthCells, monthOf, suggestPackage, valueOf, type ViewProps } from './state';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView({ state, dispatch }: ViewProps) {
  const cells = useMemo(() => monthCells(state.month), [state.month]);
  const gridRef = useRef<HTMLDivElement>(null);
  const selected =
    state.selectedDate && monthOf(state.selectedDate) === state.month ? state.selectedDate : null;

  const focusDay = (date: string) => {
    gridRef.current?.querySelector<HTMLElement>(`[data-date="${date}"]`)?.focus();
  };

  const goMonth = (month: number) => {
    dispatch({ type: 'month', month });
    dispatch({ type: 'selectDay', date: null });
  };

  /**
   * Arrow keys walk the grid the way a spreadsheet does. Every day is also a
   * normal tab stop, so this is a shortcut for people who use the calendar all
   * day rather than the only way in.
   */
  const onGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === 'ArrowLeft' ? -1
      : event.key === 'ArrowRight' ? 1
      : event.key === 'ArrowUp' ? -7
      : event.key === 'ArrowDown' ? 7
      : 0;
    if (step === 0) return;
    const grid = gridRef.current;
    if (!grid) return;
    const buttons = Array.from(grid.querySelectorAll<HTMLElement>('[data-date]'));
    const here = buttons.indexOf(document.activeElement as HTMLElement);
    if (here < 0) return;
    const next = buttons[here + step];
    if (!next) return;
    event.preventDefault();
    next.focus();
  };

  return (
    <div className={s.view}>
      <div className={s.calWrap}>
        <section className={s.card} aria-labelledby="cal-month">
          <header className={s.cardHead}>
            <h3 className={s.cardTitle} id="cal-month" aria-live="polite">
              {MONTHS[state.month]} {CAL_YEAR}
            </h3>
            <div className={s.monthNav}>
              <button
                type="button"
                className={s.iconBtn}
                onClick={() => goMonth(state.month - 1)}
                disabled={state.month === 0}
              >
                <ChevronLeft size={18} aria-hidden="true" />
                <span className={s.srOnly}>Previous month</span>
              </button>
              <button
                type="button"
                className={s.iconBtn}
                onClick={() => goMonth(state.month + 1)}
                disabled={state.month === 11}
              >
                <ChevronRight size={18} aria-hidden="true" />
                <span className={s.srOnly}>Next month</span>
              </button>
            </div>
          </header>

          {/* Column headings are decoration: every day button names its own
              full date, so a screen reader never depends on the column. */}
          <div className={s.weekHead} aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day.slice(0, 2)}</span>
            ))}
          </div>

          <div className={s.calGrid} ref={gridRef} onKeyDown={onGridKeyDown}>
            {cells.map((date, i) => {
              if (!date) return <span className={s.dayPad} key={`pad${i}`} />;
              const day = state.days[date];
              return (
                <button
                  key={date}
                  type="button"
                  data-date={date}
                  className={[
                    s.day,
                    s[`day_${day.status}`],
                    date === selected && s.daySelected,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={date === selected ? 'date' : undefined}
                  aria-label={`${pretty(date)}. ${STATUS_LABEL[day.status]}${day.couple ? `, ${day.couple}` : ''}.`}
                  onClick={() => dispatch({ type: 'selectDay', date })}
                >
                  <span className={s.dayNum}>{dayOf(date)}</span>
                  {day.couple && <span className={s.dayWho}>{day.couple}</span>}
                </button>
              );
            })}
          </div>

          <ul className={s.legend}>
            <li>
              <span className={`${s.swatch} ${s.swatchConfirmed}`} aria-hidden="true" /> Confirmed
            </li>
            <li>
              <span className={`${s.swatch} ${s.swatchHeld}`} aria-hidden="true" /> On hold
            </li>
            <li>
              <span className={`${s.swatch} ${s.swatchFree}`} aria-hidden="true" /> Free
            </li>
            <li>
              <span className={`${s.swatch} ${s.swatchClosed}`} aria-hidden="true" /> Not offered
            </li>
          </ul>
        </section>

        {selected ? (
          <DayPanel
            // Remounted per date and per status, so the form never carries the
            // last booking's guest count into the next one.
            key={`${selected}-${state.days[selected].status}`}
            day={state.days[selected]}
            dispatch={dispatch}
            onClose={() => {
              dispatch({ type: 'selectDay', date: null });
              focusDay(selected);
            }}
          />
        ) : (
          <aside className={`${s.card} ${s.panelIdle}`}>
            <p className={s.empty}>
              Pick a date to see the booking, hold it, or take it off the calendar.
            </p>
          </aside>
        )}
      </div>
    </div>
  );
}

function DayPanel({
  day,
  dispatch,
  onClose,
}: {
  day: DayRecord;
  dispatch: ViewProps['dispatch'];
  onClose: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [couple, setCouple] = useState(day.couple ?? '');
  // Empty rather than a made-up hundred when the hold came with no headcount,
  // so nothing gets confirmed with a number the owner never typed.
  const [guests, setGuests] = useState(day.guests ? String(day.guests) : '');
  const [pkg, setPkg] = useState(day.packageId ?? suggestPackage(day.guests ?? 0, day.date));

  // Focus follows the click into the panel, the way a disclosure does. Escape
  // sends it back to the day it came from.
  useEffect(() => {
    heading.current?.focus();
  }, []);

  const headcount = Number.parseInt(guests, 10) || 0;
  const chosen = packageById(pkg);
  const over = chosen ? headcount - chosen.capacity : 0;
  const offMonth = chosen ? packageBlock(chosen, day.date) : null;

  // The first thing standing between this hold and a confirmation, in plain
  // words next to the disabled button. A confirmed booking with no name, no
  // headcount or more people than the package seats is a record the owner
  // then has to notice is wrong.
  const blocked =
    !couple.trim() ? 'Add the name on the booking to confirm it.'
    : headcount < 1 ? 'Add a guest count to confirm it.'
    : !chosen ? 'Pick a package to confirm it.'
    : over > 0 ? `${chosen.name} covers ${chosen.capacity}. That is ${over} over.`
    : offMonth ? `Not on this date. ${offMonth}.`
    : null;

  return (
    <aside
      className={`${s.card} ${s.panel}`}
      aria-labelledby="cal-panel-title"
      onKeyDown={(event) => {
        // A select uses Escape for itself, to back out of a choice.
        if (event.key !== 'Escape' || event.target instanceof HTMLSelectElement) return;
        onClose();
      }}
    >
      <header className={s.cardHead}>
        <div>
          <h3 className={s.cardTitle} id="cal-panel-title" tabIndex={-1} ref={heading}>
            {pretty(day.date)}
          </h3>
          <p className={s.cardSub}>
            <StatusPill status={day.status} />
          </p>
        </div>
        <button type="button" className={s.iconBtn} onClick={onClose}>
          <X size={18} aria-hidden="true" />
          <span className={s.srOnly}>Close day</span>
        </button>
      </header>

      {day.status === 'confirmed' && (
        <>
          <dl className={s.facts}>
            <Fact label="Couple">{day.couple}</Fact>
            <Fact label="Guests">{day.guests}</Fact>
            <Fact label="Package">{packageById(day.packageId)?.name ?? 'Not set'}</Fact>
            <Fact label="Value">{money(valueOf(day))}</Fact>
          </dl>
          <div className={s.btnRow}>
            <button
              type="button"
              className={s.btn}
              onClick={() =>
                dispatch({
                  type: 'hold',
                  date: day.date,
                  couple: day.couple,
                  guests: day.guests,
                  packageId: day.packageId,
                })
              }
            >
              Move back to hold
            </button>
            <button
              type="button"
              className={s.btnQuiet}
              onClick={() => dispatch({ type: 'free', date: day.date })}
            >
              Cancel booking
            </button>
          </div>
        </>
      )}

      {day.status === 'held' && (
        <>
          <p className={s.panelNote}>
            A hold keeps the date off the public calendar. Confirm it when the deposit lands.
          </p>
          <div className={s.field}>
            <label className={s.fieldLabel} htmlFor="hold-couple">
              Name on the booking
            </label>
            <input
              id="hold-couple"
              className={s.input}
              value={couple}
              onChange={(event) => setCouple(event.target.value)}
              placeholder="Nadia and Sam"
            />
          </div>
          <div className={s.fieldRow}>
            <div className={s.field}>
              <label className={s.fieldLabel} htmlFor="hold-guests">
                Guests
              </label>
              <input
                id="hold-guests"
                className={s.input}
                type="number"
                inputMode="numeric"
                min={1}
                max={300}
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              />
            </div>
            <div className={s.field}>
              <label className={s.fieldLabel} htmlFor="hold-package">
                Package
              </label>
              <select
                id="hold-package"
                className={s.select}
                value={pkg}
                onChange={(event) => setPkg(event.target.value)}
              >
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}, {money(p.price)}
                    {packageBlock(p, day.date) ? ' (not on this date)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {blocked && (
            <p className={s.warn} id="hold-blocked">
              {blocked}
            </p>
          )}
          <div className={s.btnRow}>
            <button
              type="button"
              className={s.btnPrimary}
              disabled={blocked !== null}
              aria-describedby={blocked ? 'hold-blocked' : undefined}
              onClick={() => {
                if (blocked) return;
                dispatch({
                  type: 'confirm',
                  date: day.date,
                  couple: couple.trim(),
                  guests: headcount,
                  packageId: pkg,
                });
              }}
            >
              Confirm booking
            </button>
            <button
              type="button"
              className={s.btnQuiet}
              onClick={() => dispatch({ type: 'free', date: day.date })}
            >
              Release hold
            </button>
          </div>
        </>
      )}

      {day.status === 'free' && (
        <>
          <p className={s.panelNote}>Nothing on this date. It shows as available to inquire about.</p>
          <div className={s.btnRow}>
            <button
              type="button"
              className={s.btnPrimary}
              onClick={() => dispatch({ type: 'hold', date: day.date })}
            >
              Hold this date
            </button>
            <button
              type="button"
              className={s.btnQuiet}
              onClick={() => dispatch({ type: 'closeDay', date: day.date })}
            >
              Take it off the calendar
            </button>
          </div>
        </>
      )}

      {day.status === 'closed' && (
        <>
          <p className={s.panelNote}>
            Not offered. One wedding a weekend means the middle of the week stays shut, so nobody
            can inquire about this date.
          </p>
          <div className={s.btnRow}>
            <button
              type="button"
              className={s.btn}
              onClick={() => dispatch({ type: 'free', date: day.date })}
            >
              Open this date
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
