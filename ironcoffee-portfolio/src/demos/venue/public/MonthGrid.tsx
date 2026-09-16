import type { DayRecord } from '../data';
import { pretty } from '../data';
import styles from '../Public.module.css';

/**
 * One month of the calendar, as a table.
 *
 * A table rather than a grid of divs because a month is tabular data and
 * screen readers already know how to walk one: column headers give the
 * weekday, so a cell announces "Saturday 15" without any ARIA at all.
 *
 * Only free dates render as buttons. A disabled button is still reachable in
 * some browsers and announces itself as a thing you could press if only you
 * were allowed, which is a worse answer than not being an option at all. The
 * day number still renders, with the reason attached for anyone reading the
 * table cell by cell, so nobody has to guess why a Wednesday is missing.
 */

const WEEKDAYS = [
  { short: 'Sun', full: 'Sunday' },
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
];

/** What a visitor is told about a date they cannot have. */
const REASON: Record<string, string> = {
  closed: 'not available',
  held: 'on hold',
  confirmed: 'booked',
};

export interface MonthGridProps {
  /** Every record for this month, in date order. */
  days: DayRecord[];
  /** Weekday the first of the month falls on, 0 for Sunday. */
  firstWeekday: number;
  /** 'May 2027'. Used for the table caption. */
  label: string;
  /** ISO date, or empty. */
  selected: string;
  onPick: (iso: string) => void;
}

export default function MonthGrid({
  days,
  firstWeekday,
  label,
  selected,
  onPick,
}: MonthGridProps) {
  const cells: (DayRecord | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...days,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (DayRecord | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <table className={styles.cal}>
      <caption className={styles.sr}>{label}, open dates only</caption>
      <thead>
        <tr>
          {WEEKDAYS.map((w) => (
            <th key={w.short} scope="col" className={styles.calHeadCell}>
              <abbr title={w.full}>{w.short}</abbr>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, wi) => (
          <tr key={`${label}-w${wi}`}>
            {week.map((day, di) => {
              if (!day) {
                return <td key={`${label}-w${wi}-b${di}`} className={styles.calCell} />;
              }

              const num = Number(day.date.slice(8, 10));

              if (day.status === 'free') {
                const isSelected = day.date === selected;
                return (
                  <td key={day.date} className={styles.calCell}>
                    <button
                      type="button"
                      className={[styles.day, isSelected && styles.daySel]
                        .filter(Boolean)
                        .join(' ')}
                      aria-label={pretty(day.date)}
                      aria-pressed={isSelected}
                      onClick={() => onPick(day.date)}
                    >
                      {num}
                    </button>
                  </td>
                );
              }

              return (
                <td key={day.date} className={styles.calCell}>
                  <span className={styles.dayOff}>
                    {num}
                    <span className={styles.sr}>
                      , {REASON[day.status] ?? 'not available'}
                    </span>
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
