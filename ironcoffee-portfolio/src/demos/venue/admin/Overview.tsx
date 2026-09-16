/**
 * The shape of the year in one screen.
 *
 * Four numbers, a chart and a short list of things nobody else is going to
 * deal with. Every figure is derived from the same store the other four views
 * write to, so confirming a hold in the calendar moves the revenue number and
 * redraws a bar, which is the only convincing way to show that these screens
 * are one application.
 */
import { useMemo } from 'react';
import { CalendarDays, FileText, Inbox } from 'lucide-react';
import { MONTHS, money, pretty } from '../data';
import s from '../Admin.module.css';
import {
  heldDays,
  isDirty,
  monthOf,
  revenueByMonth,
  summarize,
  valueOf,
  type ViewProps,
} from './state';

/** Chart coordinate space. The SVG is stretched to fit, so these are ratios. */
const W = 720;
const H = 210;
const COL = W / 12;

export default function Overview({ state, dispatch }: ViewProps) {
  const summary = useMemo(() => summarize(state), [state]);
  const series = useMemo(() => revenueByMonth(state.days), [state.days]);
  const held = useMemo(() => heldDays(state.days), [state.days]);
  const unread = state.enquiries.filter((e) => e.state === 'new');
  const dirty = isDirty(state);

  const peak = series.reduce((best, m) =>
    m.confirmed + m.held > best.confirmed + best.held ? m : best
  );
  // Round the top of the scale up to a clean figure so the gridlines mean
  // something, and never divide by zero on a year with nothing in it.
  const ceiling = Math.max(5000, Math.ceil((peak.confirmed + peak.held) / 5000) * 5000);
  const y = (value: number) => H - (value / ceiling) * H;

  const tiles = [
    { label: 'Confirmed', value: String(summary.confirmed), note: 'weddings in 2027' },
    { label: 'On hold', value: String(summary.held), note: `${money(summary.heldValue)} if they land` },
    { label: 'New enquiries', value: String(summary.newEnquiries), note: 'nobody has answered' },
    { label: 'Booked', value: money(summary.revenue), note: 'confirmed packages' },
  ];

  return (
    <div className={s.view}>
      <ul className={s.tiles}>
        {tiles.map((tile) => (
          <li className={s.tile} key={tile.label}>
            <p className={s.tileLabel}>{tile.label}</p>
            <p className={s.tileValue}>{tile.value}</p>
            <p className={s.tileNote}>{tile.note}</p>
          </li>
        ))}
      </ul>

      <section className={s.card} aria-labelledby="ov-chart">
        <header className={s.cardHead}>
          <div>
            <h3 className={s.cardTitle} id="ov-chart">
              Revenue by month
            </h3>
            <p className={s.cardSub}>
              Busiest month is {MONTHS[peak.month]}, at{' '}
              {money(peak.confirmed + peak.held)}.
            </p>
          </div>
          <ul className={s.legend}>
            <li>
              <span className={`${s.swatch} ${s.swatchConfirmed}`} aria-hidden="true" /> Confirmed
            </li>
            <li>
              <span className={`${s.swatch} ${s.swatchHeld}`} aria-hidden="true" /> On hold
            </li>
          </ul>
        </header>

        <p className={s.chartCeiling}>{money(ceiling)}</p>
        <svg
          className={s.chartSvg}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {[0.25, 0.5, 0.75, 1].map((step) => (
            <line
              key={step}
              x1="0"
              x2={W}
              y1={H - step * H}
              y2={H - step * H}
              className={s.chartGrid}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {series.map((month) => {
            const confirmedHeight = H - y(month.confirmed);
            const heldHeight = H - y(month.held);
            const x = month.month * COL + COL * 0.22;
            const width = COL * 0.56;
            return (
              <g key={month.month}>
                <rect
                  x={x}
                  y={H - confirmedHeight - heldHeight}
                  width={width}
                  height={heldHeight}
                  className={s.barHeld}
                />
                <rect
                  x={x}
                  y={H - confirmedHeight}
                  width={width}
                  height={confirmedHeight}
                  className={s.barConfirmed}
                />
              </g>
            );
          })}
          <line
            x1="0"
            x2={W}
            y1={H}
            y2={H}
            className={s.chartAxis}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ol className={s.chartLabels}>
          {series.map((month) => (
            <li key={month.month}>
              <span className={s.labelLong}>{MONTHS[month.month].slice(0, 3)}</span>
              <span className={s.labelShort}>{MONTHS[month.month].slice(0, 1)}</span>
            </li>
          ))}
        </ol>

        {/* The bars are decoration to a screen reader. This is the same data as
            a table, which is the form that can actually be read out. */}
        <table className={s.srOnly}>
          <caption>Revenue booked by month, 2027</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Confirmed</th>
              <th scope="col">On hold</th>
            </tr>
          </thead>
          <tbody>
            {series.map((month) => (
              <tr key={month.month}>
                <th scope="row">{MONTHS[month.month]}</th>
                <td>{money(month.confirmed)}</td>
                <td>{money(month.held)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={s.card} aria-labelledby="ov-needs">
        <header className={s.cardHead}>
          <h3 className={s.cardTitle} id="ov-needs">
            Needs you
          </h3>
        </header>

        {unread.length === 0 && held.length === 0 && !dirty ? (
          <p className={s.empty}>Nothing waiting. The inbox is clear and every hold is settled.</p>
        ) : (
          <ul className={s.needs}>
            {unread.map((enquiry) => (
              <li key={enquiry.id}>
                <button
                  type="button"
                  className={s.need}
                  onClick={() => {
                    dispatch({ type: 'go', view: 'enquiries', focus: true });
                    dispatch({ type: 'openEnquiry', id: enquiry.id });
                  }}
                >
                  <Inbox className={s.needIcon} size={16} aria-hidden="true" />
                  <span className={s.needText}>
                    <strong>{enquiry.name}</strong> has not had a reply.
                    <span className={s.needSub}>
                      {enquiry.wants ? pretty(enquiry.wants) : 'No date yet'}, {enquiry.guests}{' '}
                      guests
                    </span>
                  </span>
                </button>
              </li>
            ))}

            {held.map((day) => (
              <li key={day.date}>
                <button
                  type="button"
                  className={s.need}
                  onClick={() => {
                    dispatch({ type: 'go', view: 'calendar', focus: true });
                    dispatch({ type: 'month', month: monthOf(day.date) });
                    dispatch({ type: 'selectDay', date: day.date });
                  }}
                >
                  <CalendarDays className={s.needIcon} size={16} aria-hidden="true" />
                  <span className={s.needText}>
                    <strong>{pretty(day.date)}</strong> is on hold, not confirmed.
                    <span className={s.needSub}>
                      {day.couple ?? 'No name on it'}
                      {valueOf(day) > 0 ? `, ${money(valueOf(day))}` : ''}
                    </span>
                  </span>
                </button>
              </li>
            ))}

            {dirty && (
              <li>
                <button
                  type="button"
                  className={s.need}
                  onClick={() => dispatch({ type: 'go', view: 'pages', focus: true })}
                >
                  <FileText className={s.needIcon} size={16} aria-hidden="true" />
                  <span className={s.needText}>
                    <strong>Page text</strong> has edits you have not saved.
                    <span className={s.needSub}>Nothing is live until you press Save</span>
                  </span>
                </button>
              </li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}
