/**
 * The inbox.
 *
 * Filter, search, read, answer, and put a hold on the date without leaving the
 * message. That last button is the one worth the money: the couple asked about
 * a Saturday, and the answer to their question is a change to the calendar,
 * not a note to make one later.
 */
import { useMemo, useRef, useState, type RefObject } from 'react';
import { Archive, Reply, Search, Send } from 'lucide-react';
import { money, packageById, pretty, type Inquiry } from '../data';
import s from '../Admin.module.css';
import { Drawer, Fact, StatusPill } from './ui';
import { CAL_YEAR, suggestPackage, type AdminState, type ViewProps } from './state';

const FILTERS: { id: Inquiry['state']; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'open', label: 'Open' },
  { id: 'replied', label: 'Replied' },
  { id: 'archived', label: 'Archived' },
];

const EMPTY: Record<Inquiry['state'], string> = {
  new: 'Nothing new. Every inquiry has been looked at.',
  open: 'Nothing open. Anything read has been answered or archived.',
  replied: 'No replies sent yet.',
  archived: 'Nothing archived.',
};

export default function InquiriesView({ state, dispatch }: ViewProps) {
  const [filter, setFilter] = useState<Inquiry['state']>('new');
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const out: Record<Inquiry['state'], number> = { new: 0, open: 0, replied: 0, archived: 0 };
    for (const inquiry of state.inquiries) out[inquiry.state] += 1;
    return out;
  }, [state.inquiries]);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return state.inquiries.filter((inquiry) => {
      if (inquiry.state !== filter) return false;
      if (!needle) return true;
      return `${inquiry.name} ${inquiry.email} ${inquiry.message}`.toLowerCase().includes(needle);
    });
  }, [state.inquiries, filter, query]);

  const open = state.inquiries.find((e) => e.id === state.openInquiry) ?? null;

  return (
    <div className={s.view}>
      <div className={s.card}>
        <div className={s.filterBar}>
          <div className={s.tabs} role="group" aria-label="Filter by state">
            {FILTERS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`${s.tab} ${filter === tab.id ? s.tabOn : ''}`}
                aria-pressed={filter === tab.id}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
                <span className={s.tabCount}>{counts[tab.id]}</span>
              </button>
            ))}
          </div>

          <div className={s.searchWrap}>
            <label className={s.srOnly} htmlFor="enq-search">
              Search inquiries
            </label>
            <Search className={s.searchIcon} size={16} aria-hidden="true" />
            <input
              id="enq-search"
              className={s.search}
              type="search"
              value={query}
              placeholder="Name, email or words in the message"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div ref={listRef} tabIndex={-1} className={s.listWrap}>
          {shown.length === 0 ? (
            <p className={s.empty}>{query.trim() ? 'Nothing matches that search.' : EMPTY[filter]}</p>
          ) : (
            <ul className={s.list}>
              {shown.map((inquiry) => (
                <li key={inquiry.id}>
                  <button
                    type="button"
                    className={s.listItem}
                    onClick={() => dispatch({ type: 'openInquiry', id: inquiry.id })}
                  >
                    <span className={s.listTop}>
                      <span className={s.listName}>{inquiry.name}</span>
                      <span className={s.listWhen}>{inquiry.received}</span>
                    </span>
                    <span className={s.listMeta}>
                      {inquiry.wants ? pretty(inquiry.wants) : 'No date yet'}, {inquiry.guests}{' '}
                      guests
                    </span>
                    <span className={s.listMsg}>{inquiry.message}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {open && (
        <InquiryDrawer
          key={open.id}
          inquiry={open}
          state={state}
          dispatch={dispatch}
          returnFocusTo={listRef}
        />
      )}
    </div>
  );
}

function InquiryDrawer({
  inquiry,
  state,
  dispatch,
  returnFocusTo,
}: {
  inquiry: Inquiry;
  state: AdminState;
  dispatch: ViewProps['dispatch'];
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const [replying, setReplying] = useState(false);
  const [text, setText] = useState(`Hi ${inquiry.name.split(' ')[0]},\n\n`);

  const day = inquiry.wants ? state.days[inquiry.wants] : undefined;
  const sent = state.replies[inquiry.id];
  const headcount = inquiry.seatsPlanned ?? inquiry.guests;
  const likely = packageById(suggestPackage(headcount, inquiry.wants));
  const close = () => dispatch({ type: 'openInquiry', id: null });

  // Why the hold button is or is not available, in the words you would use to
  // a colleague. A disabled button with no reason next to it is a bug report.
  const holdBlocked =
    !inquiry.wants ? 'No date on this one yet.'
    : !day ? `That date is outside the ${CAL_YEAR} calendar.`
    : day.status === 'confirmed' ? `Already booked for ${day.couple}.`
    : day.status === 'held' ? 'That date is already on hold.'
    : day.status === 'closed' ? 'That date is not offered. Open it on the calendar first if you want to take it.'
    : null;

  return (
    <Drawer
      title={inquiry.name}
      meta={
        <>
          {inquiry.email}, received {inquiry.received}
        </>
      }
      onClose={close}
      returnFocusTo={returnFocusTo}
      footer={
        <div className={s.btnRow}>
          <button
            type="button"
            className={s.btnPrimary}
            onClick={() => setReplying((was) => !was)}
            aria-expanded={replying}
          >
            <Reply size={16} aria-hidden="true" />
            {sent ? 'Reply again' : 'Reply'}
          </button>
          <button
            type="button"
            className={s.btn}
            disabled={holdBlocked !== null}
            onClick={() => {
              if (!inquiry.wants) return;
              dispatch({
                type: 'hold',
                date: inquiry.wants,
                couple: inquiry.name,
                guests: headcount,
                packageId: likely?.id,
              });
            }}
          >
            Hold this date
          </button>
          <button
            type="button"
            className={s.btnQuiet}
            onClick={() =>
              dispatch({
                type: 'inquiryState',
                id: inquiry.id,
                state: inquiry.state === 'archived' ? 'open' : 'archived',
              })
            }
          >
            <Archive size={16} aria-hidden="true" />
            {inquiry.state === 'archived' ? 'Move back to open' : 'Archive'}
          </button>
        </div>
      }
    >
      <dl className={s.facts}>
        <Fact label="Date wanted">{inquiry.wants ? pretty(inquiry.wants) : 'Not said'}</Fact>
        <Fact label="Guests">{inquiry.guests}</Fact>
        <Fact label="That date">
          {day ? <StatusPill status={day.status} /> : `Outside the ${CAL_YEAR} calendar`}
        </Fact>
        <Fact label="Likely package">
          {likely ? `${likely.name}, ${money(likely.price)}` : 'None'}
        </Fact>
      </dl>

      <p className={s.message}>{inquiry.message}</p>

      {inquiry.seatsPlanned !== undefined && (
        <p className={s.panelNote}>
          They used the seating planner on the site and laid out {inquiry.seatsPlanned} seats.
        </p>
      )}

      {holdBlocked && <p className={s.panelNote}>{holdBlocked}</p>}

      {sent && (
        <blockquote className={s.sent}>
          <p className={s.sentLabel}>You replied</p>
          {sent}
        </blockquote>
      )}

      {replying && (
        <div className={s.field}>
          <label className={s.fieldLabel} htmlFor="reply-body">
            Your reply
          </label>
          <textarea
            id="reply-body"
            className={s.textarea}
            rows={6}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className={s.btnRow}>
            <button
              type="button"
              className={s.btnPrimary}
              disabled={text.trim().length === 0}
              onClick={() => {
                dispatch({ type: 'reply', id: inquiry.id, text: text.trim() });
                setReplying(false);
              }}
            >
              <Send size={16} aria-hidden="true" />
              Send reply
            </button>
            <button type="button" className={s.btnQuiet} onClick={() => setReplying(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
