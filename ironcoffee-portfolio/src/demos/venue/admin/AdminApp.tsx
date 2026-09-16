/**
 * The owner's side of the sample, as an application rather than a screenshot.
 *
 * It exists to answer the only question that decides the price: a visitor
 * looking at a booking form cannot tell whether it writes to a database or
 * sends an email, so the tier above "a nice page" reads as a markup until
 * somebody sees the screen the owner gets. This is that screen, and everything
 * on it works.
 *
 * One reducer holds the lot. The sidebar switches views with local state, not
 * with the router, because this is one screen of one demo page and a URL per
 * tab would leak into the site's sitemap and its prerendered routes for no
 * benefit to anybody.
 */
import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
  CalendarDays,
  FileText,
  Inbox,
  Info,
  LayoutDashboard,
  Table2,
  type LucideIcon,
} from 'lucide-react';
import type { DemoConfig } from '../../types';
import s from '../Admin.module.css';
import BookingsView from './BookingsView';
import CalendarView from './CalendarView';
import EnquiriesView from './EnquiriesView';
import Overview from './Overview';
import PagesView from './PagesView';
import { initialState, reducer, summarize, type ViewId } from './state';

const NAV: { id: ViewId; label: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox },
  { id: 'bookings', label: 'Bookings', icon: Table2 },
  { id: 'pages', label: 'Pages', icon: FileText },
];

export default function AdminApp({ config }: { config: DemoConfig }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const main = useRef<HTMLElement>(null);
  const summary = useMemo(() => summarize(state), [state]);

  /**
   * Focus follows a cross-link, never a sidebar click.
   *
   * Somebody who pressed "Nadia has not had a reply" on the overview has been
   * moved to a different view and needs to be told where they landed. Somebody
   * who pressed Calendar in the sidebar knows, and wants to keep arrowing down
   * the sidebar.
   */
  useEffect(() => {
    if (state.focusTick === 0) return;
    main.current?.focus();
  }, [state.focusTick]);

  const current = NAV.find((item) => item.id === state.view) ?? NAV[0];
  const initials = config.business.name
    .split(' ')
    .map((word) => word.slice(0, 1))
    .slice(0, 2)
    .join('');

  return (
    <div className={s.shell}>
      <div className={s.side}>
        <p className={s.mark}>
          <span className={s.markInitials} aria-hidden="true">
            {initials}
          </span>
          <span className={s.markText}>
            <span className={s.markName}>{config.business.name}</span>
            <span className={s.markRole}>Owner dashboard</span>
          </span>
        </p>

        <nav className={s.nav} aria-label="Dashboard sections">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = item.id === state.view;
            const badge = item.id === 'enquiries' ? summary.newEnquiries : 0;
            return (
              <button
                key={item.id}
                type="button"
                className={`${s.navBtn} ${on ? s.navBtnOn : ''}`}
                aria-current={on ? 'page' : undefined}
                onClick={() => dispatch({ type: 'go', view: item.id })}
              >
                <Icon className={s.navIcon} size={16} aria-hidden="true" />
                <span className={s.navLabel}>{item.label}</span>
                {badge > 0 && (
                  <span className={s.navBadge}>
                    {badge}
                    <span className={s.srOnly}> new</span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className={s.pane}>
        <header className={s.bar}>
          <div>
            <p className={s.eyebrow}>2027 season</p>
            <h2 className={s.viewTitle} id="admin-view">
              {current.label}
            </h2>
          </div>
          <p className={s.demoNote}>
            <Info size={14} aria-hidden="true" />
            <span>
              A demonstration. It runs in this browser tab with no server behind it, so nothing you
              change here is saved.
            </span>
          </p>
        </header>

        <p className={s.live} role="status">
          {state.notice}
        </p>

        <main className={s.main} ref={main} tabIndex={-1} aria-labelledby="admin-view">
          {state.view === 'overview' && <Overview state={state} dispatch={dispatch} />}
          {state.view === 'calendar' && <CalendarView state={state} dispatch={dispatch} />}
          {state.view === 'enquiries' && <EnquiriesView state={state} dispatch={dispatch} />}
          {state.view === 'bookings' && <BookingsView state={state} dispatch={dispatch} />}
          {state.view === 'pages' && (
            <PagesView state={state} dispatch={dispatch} config={config} />
          )}
        </main>
      </div>
    </div>
  );
}
