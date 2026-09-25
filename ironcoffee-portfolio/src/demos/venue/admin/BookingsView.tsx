/**
 * Confirmed weddings as a table you can sort.
 *
 * The table is the boring view on purpose. It is what an owner prints, checks
 * against the bank and hands to a caterer, and none of those jobs want a card
 * layout. Sorting is kept in the shared store so the column you left it on is
 * still the column when you come back from the calendar.
 */
import { useMemo, useRef, type RefObject } from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { money, packageById, pretty, type DayRecord } from '../data';
import s from '../Admin.module.css';
import { Drawer, Fact } from './ui';
import { CAL_YEAR, confirmedDays, monthOf, valueOf, type SortColumn, type ViewProps } from './state';

const COLUMNS: { id: SortColumn; label: string; numeric?: boolean }[] = [
  { id: 'date', label: 'Date' },
  { id: 'couple', label: 'Couple' },
  { id: 'guests', label: 'Guests', numeric: true },
  { id: 'package', label: 'Package' },
  { id: 'value', label: 'Value', numeric: true },
];

/** Plain comparisons rather than localeCompare: the server and the browser
    have to sort a prerendered table into exactly the same order. */
function sortKey(day: DayRecord, column: SortColumn): string | number {
  switch (column) {
    case 'date':
      return day.date;
    case 'couple':
      return (day.couple ?? '').toLowerCase();
    case 'guests':
      return day.guests ?? 0;
    case 'package':
      return packageById(day.packageId)?.name ?? '';
    case 'value':
      return valueOf(day);
  }
}

export default function BookingsView({ state, dispatch }: ViewProps) {
  // On the section, which is always rendered. Moving the last booking back to
  // a hold unmounts the table, and a ref on the table would leave the drawer
  // nowhere to send focus but <body>.
  const sectionRef = useRef<HTMLElement>(null);

  const rows = useMemo(() => {
    const { column, dir } = state.sort;
    const out = [...confirmedDays(state.days)];
    out.sort((a, b) => {
      const left = sortKey(a, column);
      const right = sortKey(b, column);
      const order = left === right ? 0 : left < right ? -1 : 1;
      return dir === 'asc' ? order : -order;
    });
    return out;
  }, [state.days, state.sort]);

  const total = rows.reduce((sum, day) => sum + valueOf(day), 0);
  const open = state.openBooking ? state.days[state.openBooking] : null;

  return (
    <div className={s.view}>
      <section className={s.card} aria-labelledby="bk-title" ref={sectionRef} tabIndex={-1}>
        <header className={s.cardHead}>
          <div>
            <h3 className={s.cardTitle} id="bk-title">
              Confirmed bookings
            </h3>
            <p className={s.cardSub}>
              {rows.length} in {CAL_YEAR}, {money(total)} booked.
            </p>
          </div>
        </header>

        {rows.length === 0 ? (
          <p className={s.empty}>Nothing confirmed yet. Holds live in the calendar.</p>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption className={s.srOnly}>
                Confirmed bookings for {CAL_YEAR}, sortable by column.
              </caption>
              <thead>
                <tr>
                  {COLUMNS.map((column) => {
                    const active = state.sort.column === column.id;
                    const Icon = !active ? ChevronsUpDown : state.sort.dir === 'asc' ? ArrowUp : ArrowDown;
                    return (
                      <th
                        key={column.id}
                        scope="col"
                        className={column.numeric ? s.numeric : undefined}
                        aria-sort={
                          !active ? 'none' : state.sort.dir === 'asc' ? 'ascending' : 'descending'
                        }
                      >
                        <button
                          type="button"
                          className={`${s.sortBtn} ${active ? s.sortBtnOn : ''}`}
                          onClick={() => dispatch({ type: 'sort', column: column.id })}
                        >
                          {column.label}
                          <Icon size={14} aria-hidden="true" />
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((day) => (
                  <tr
                    key={day.date}
                    className={s.row}
                    // The button in the first cell is the real control. This
                    // only saves a mouse from having to aim at it, so a click
                    // that already landed on the button is left to the button
                    // rather than dispatched twice.
                    onClick={(event) => {
                      if ((event.target as HTMLElement).closest('button')) return;
                      dispatch({ type: 'openBooking', date: day.date });
                    }}
                  >
                    <th scope="row">
                      <button
                        type="button"
                        className={s.rowBtn}
                        onClick={() => dispatch({ type: 'openBooking', date: day.date })}
                      >
                        {pretty(day.date)}
                      </button>
                    </th>
                    <td>{day.couple}</td>
                    <td className={s.numeric}>{day.guests}</td>
                    <td>{packageById(day.packageId)?.name ?? 'Not set'}</td>
                    <td className={s.numeric}>{money(valueOf(day))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td />
                  <td className={s.numeric}>
                    {rows.reduce((sum, day) => sum + (day.guests ?? 0), 0)}
                  </td>
                  <td />
                  <td className={s.numeric}>{money(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>

      {open && (
        <BookingDrawer key={open.date} day={open} dispatch={dispatch} returnFocusTo={sectionRef} />
      )}
    </div>
  );
}

function BookingDrawer({
  day,
  dispatch,
  returnFocusTo,
}: {
  day: DayRecord;
  dispatch: ViewProps['dispatch'];
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const pkg = packageById(day.packageId);
  const close = () => dispatch({ type: 'openBooking', date: null });

  return (
    <Drawer
      title={day.couple ?? 'Booking'}
      meta={pretty(day.date)}
      onClose={close}
      returnFocusTo={returnFocusTo}
      footer={
        <div className={s.btnRow}>
          <button
            type="button"
            className={s.btnPrimary}
            onClick={() => {
              dispatch({ type: 'openBooking', date: null });
              dispatch({ type: 'month', month: monthOf(day.date) });
              dispatch({ type: 'selectDay', date: day.date });
              dispatch({ type: 'go', view: 'calendar', focus: true });
            }}
          >
            Show in the calendar
          </button>
          <button
            type="button"
            className={s.btnQuiet}
            onClick={() => {
              dispatch({
                type: 'hold',
                date: day.date,
                couple: day.couple,
                guests: day.guests,
                packageId: day.packageId,
              });
              dispatch({ type: 'openBooking', date: null });
            }}
          >
            Move back to hold
          </button>
        </div>
      }
    >
      <dl className={s.facts}>
        <Fact label="Guests">{day.guests}</Fact>
        <Fact label="Package">{pkg?.name ?? 'Not set'}</Fact>
        <Fact label="Value">{money(valueOf(day))}</Fact>
        <Fact label="Capacity">{pkg ? `${pkg.capacity} guests` : 'Not set'}</Fact>
      </dl>

      {pkg && (
        <>
          <p className={s.panelNote}>{pkg.note}. What they have booked:</p>
          <ul className={s.bullets}>
            {pkg.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </>
      )}
    </Drawer>
  );
}
