/**
 * Everything the owner dashboard knows, in one reducer.
 *
 * The five views share a single store because that sharing is the whole
 * argument the screen exists to make. Holding a date from an inquiry has to
 * land in the calendar and move the revenue number, otherwise this is five
 * mockups standing next to each other rather than one piece of software.
 *
 * Nothing in here reads the clock, the network or storage. The page is
 * rendered on the server and then hydrated, so a seed that differs between
 * those two passes is a hydration error rather than a detail. Every value
 * below is fixed, and the only thing that ever changes it is a user action.
 */
import type { Dispatch } from 'react';
import {
  CONTENT,
  INQUIRIES,
  PACKAGES,
  SEASON_YEAR,
  YEAR,
  packageBlock,
  packageById,
  pretty,
  type ContentBlock,
  type DayRecord,
  type Inquiry,
} from '../data';

export type ViewId = 'overview' | 'calendar' | 'inquiries' | 'bookings' | 'pages';
export type SortColumn = 'date' | 'couple' | 'guests' | 'package' | 'value';
export type SortDir = 'asc' | 'desc';

/**
 * The sample owns one fixed year of dates, so this is a constant, not a clock
 * read. Taken from the data so the year is written down in exactly one place.
 */
export const CAL_YEAR = SEASON_YEAR;

/** Every date in the year, in order. Fixed at module load. */
export const DATES: string[] = YEAR.map((d) => d.date);

export interface AdminState {
  view: ViewId;
  /**
   * Bumped only when a cross-link sends the user somewhere they did not click
   * to, so the target view can take focus without stealing it on every tap of
   * the sidebar.
   */
  focusTick: number;
  /** 0 to 11 inside CAL_YEAR. */
  month: number;
  selectedDate: string | null;
  days: Record<string, DayRecord>;
  inquiries: Inquiry[];
  /** Replies typed in this session, keyed by inquiry id. */
  replies: Record<string, string>;
  openInquiry: string | null;
  openBooking: string | null;
  sort: { column: SortColumn; dir: SortDir };
  /** What the public page currently shows. */
  content: ContentBlock[];
  /** What the editor shows. Equal to `content` when there is nothing to save. */
  drafts: Record<string, string>;
  savedLabel: string;
  /** One short line for the status region. Cleared when the view changes. */
  notice: string | null;
}

export type Action =
  | { type: 'go'; view: ViewId; focus?: boolean }
  | { type: 'month'; month: number }
  | { type: 'selectDay'; date: string | null }
  | { type: 'hold'; date: string; couple?: string; guests?: number; packageId?: string }
  | { type: 'confirm'; date: string; couple: string; guests: number; packageId: string }
  | { type: 'free'; date: string }
  | { type: 'closeDay'; date: string }
  | { type: 'openInquiry'; id: string | null }
  | { type: 'inquiryState'; id: string; state: Inquiry['state'] }
  | { type: 'reply'; id: string; text: string }
  | { type: 'openBooking'; date: string | null }
  | { type: 'sort'; column: SortColumn }
  | { type: 'edit'; id: string; value: string }
  | { type: 'save' }
  | { type: 'discard' };

export interface ViewProps {
  state: AdminState;
  dispatch: Dispatch<Action>;
}

/* --- Reading dates without a date library -------------------------------- */

export const monthOf = (iso: string) => Number(iso.slice(5, 7)) - 1;
export const dayOf = (iso: string) => Number(iso.slice(8, 10));

/**
 * The cells of one month, Sunday first, with leading blanks.
 *
 * `new Date` gets a fully qualified UTC string, so it means the same day in
 * Denver, in a CI container set to UTC and in the Node process that
 * prerenders this page.
 */
export function monthCells(month: number): (string | null)[] {
  const first = `${CAL_YEAR}-${String(month + 1).padStart(2, '0')}-01`;
  const lead = new Date(`${first}T00:00:00Z`).getUTCDay();
  const cells: (string | null)[] = Array.from({ length: lead }, () => null);
  for (const date of DATES) if (monthOf(date) === month) cells.push(date);
  return cells;
}

/**
 * Smallest package that covers the headcount and runs on the date, largest if
 * none of them do. Without a date, every package is a candidate.
 */
export function suggestPackage(guests: number, date = ''): string {
  const byCapacity = [...PACKAGES].sort((a, b) => a.capacity - b.capacity);
  const offered = byCapacity.filter((p) => !packageBlock(p, date));
  const pool = offered.length ? offered : byCapacity;
  const fits = pool.find((p) => p.capacity >= guests);
  return (fits ?? pool[pool.length - 1]).id;
}

export const valueOf = (day: DayRecord) => packageById(day.packageId)?.price ?? 0;

export const daysIn = (days: Record<string, DayRecord>) => DATES.map((d) => days[d]);

export const confirmedDays = (days: Record<string, DayRecord>) =>
  daysIn(days).filter((d) => d.status === 'confirmed');

export const heldDays = (days: Record<string, DayRecord>) =>
  daysIn(days).filter((d) => d.status === 'held');

export interface Summary {
  confirmed: number;
  held: number;
  newInquiries: number;
  revenue: number;
  /** What the holds would be worth if every one of them came through. */
  heldValue: number;
}

export function summarize(state: AdminState): Summary {
  const confirmed = confirmedDays(state.days);
  const held = heldDays(state.days);
  return {
    confirmed: confirmed.length,
    held: held.length,
    newInquiries: state.inquiries.filter((e) => e.state === 'new').length,
    revenue: confirmed.reduce((sum, d) => sum + valueOf(d), 0),
    heldValue: held.reduce((sum, d) => sum + valueOf(d), 0),
  };
}

export interface MonthRevenue {
  month: number;
  confirmed: number;
  held: number;
}

export function revenueByMonth(days: Record<string, DayRecord>): MonthRevenue[] {
  const out: MonthRevenue[] = Array.from({ length: 12 }, (_, month) => ({
    month,
    confirmed: 0,
    held: 0,
  }));
  for (const day of daysIn(days)) {
    if (day.status === 'confirmed') out[monthOf(day.date)].confirmed += valueOf(day);
    else if (day.status === 'held') out[monthOf(day.date)].held += valueOf(day);
  }
  return out;
}

export const isDirty = (state: AdminState) =>
  state.content.some((block) => state.drafts[block.id] !== block.value);

/** The saved value of one content field, by its role on the public page. */
export const draftFor = (state: AdminState, field: ContentBlock['field']) => {
  const block = state.content.find((b) => b.field === field);
  return block ? state.drafts[block.id] : '';
};

/* --- The store ------------------------------------------------------------ */

export const initialState: AdminState = {
  view: 'overview',
  focusTick: 0,
  // May, because that is the first month of the season with anything in it.
  // An owner opening this on an empty January learns nothing.
  month: 4,
  selectedDate: null,
  days: Object.fromEntries(YEAR.map((d) => [d.date, d])),
  inquiries: INQUIRIES,
  replies: {},
  openInquiry: null,
  openBooking: null,
  sort: { column: 'date', dir: 'asc' },
  content: CONTENT,
  drafts: Object.fromEntries(CONTENT.map((c) => [c.id, c.value])),
  // A fixed label rather than a formatted clock read. The line has to say the
  // same thing in the prerendered HTML and in the browser a moment later.
  savedLabel: 'Tuesday at 9:12 am',
  notice: null,
};

export function reducer(state: AdminState, action: Action): AdminState {
  switch (action.type) {
    case 'go':
      return {
        ...state,
        view: action.view,
        notice: null,
        focusTick: action.focus ? state.focusTick + 1 : state.focusTick,
      };

    case 'month':
      // Clamped, not wrapped. The sample holds one year, and a calendar that
      // pages into an empty following year is a worse answer than a disabled arrow.
      return { ...state, month: Math.min(11, Math.max(0, action.month)) };

    case 'selectDay':
      return { ...state, selectedDate: action.date };

    case 'hold': {
      const prev = state.days[action.date];
      if (!prev) return state;
      // A free date can be held, and a confirmed one can be moved back to a
      // hold. A closed date is not on offer at all, so holding it would put a
      // booking on a day the public calendar says does not exist.
      if (prev.status === 'closed') {
        return { ...state, notice: `${pretty(action.date)} is not offered. Open it on the calendar first.` };
      }
      if (prev.status === 'held') {
        return { ...state, notice: `${pretty(action.date)} is already on hold.` };
      }
      const guests = action.guests ?? prev.guests;
      const day: DayRecord = {
        date: action.date,
        status: 'held',
        couple: action.couple ?? prev.couple,
        guests,
        packageId:
          action.packageId ??
          prev.packageId ??
          (guests ? suggestPackage(guests, action.date) : undefined),
      };
      return {
        ...state,
        days: { ...state.days, [action.date]: day },
        // A hold placed from the inquiry list moves the calendar with it, so
        // the next click on Calendar lands on the date that just changed.
        month: monthOf(action.date),
        selectedDate: action.date,
        notice: `${pretty(action.date)} is on hold.`,
      };
    }

    case 'confirm': {
      if (!state.days[action.date]) return state;
      const day: DayRecord = {
        date: action.date,
        status: 'confirmed',
        couple: action.couple,
        guests: action.guests,
        packageId: action.packageId,
      };
      return {
        ...state,
        days: { ...state.days, [action.date]: day },
        selectedDate: action.date,
        notice: `${pretty(action.date)} confirmed for ${action.couple}.`,
      };
    }

    case 'free': {
      if (!state.days[action.date]) return state;
      return {
        ...state,
        days: { ...state.days, [action.date]: { date: action.date, status: 'free' } },
        selectedDate: action.date,
        notice: `${pretty(action.date)} is open for inquiries.`,
      };
    }

    case 'closeDay': {
      if (!state.days[action.date]) return state;
      return {
        ...state,
        days: { ...state.days, [action.date]: { date: action.date, status: 'closed' } },
        selectedDate: action.date,
        notice: `${pretty(action.date)} is off the calendar.`,
      };
    }

    case 'openInquiry': {
      if (action.id === null) return { ...state, openInquiry: null };
      // Opening one counts as reading it. A badge that only goes down when you
      // press a separate button is a badge nobody trusts.
      return {
        ...state,
        openInquiry: action.id,
        inquiries: state.inquiries.map((e) =>
          e.id === action.id && e.state === 'new' ? { ...e, state: 'open' } : e
        ),
      };
    }

    case 'inquiryState': {
      const who = state.inquiries.find((e) => e.id === action.id)?.name ?? 'Inquiry';
      return {
        ...state,
        inquiries: state.inquiries.map((e) =>
          e.id === action.id ? { ...e, state: action.state } : e
        ),
        notice:
          action.state === 'archived' ? `${who} archived.` : `${who} moved to ${action.state}.`,
      };
    }

    case 'reply':
      return {
        ...state,
        inquiries: state.inquiries.map((e) =>
          e.id === action.id ? { ...e, state: 'replied' } : e
        ),
        replies: { ...state.replies, [action.id]: action.text },
        notice: 'Reply sent. In the demonstration it goes no further than this tab.',
      };

    case 'openBooking':
      return { ...state, openBooking: action.date };

    case 'sort':
      return {
        ...state,
        sort: {
          column: action.column,
          dir: state.sort.column === action.column && state.sort.dir === 'asc' ? 'desc' : 'asc',
        },
      };

    case 'edit':
      return { ...state, drafts: { ...state.drafts, [action.id]: action.value } };

    case 'save':
      return {
        ...state,
        content: state.content.map((c) => ({ ...c, value: state.drafts[c.id] })),
        savedLabel: 'a moment ago',
        notice: 'Page text saved.',
      };

    case 'discard':
      return {
        ...state,
        drafts: Object.fromEntries(state.content.map((c) => [c.id, c.value])),
        notice: 'Edits discarded.',
      };
  }
}
