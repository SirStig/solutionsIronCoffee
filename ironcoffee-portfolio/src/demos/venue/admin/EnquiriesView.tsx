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
import { money, packageById, pretty, type Enquiry } from '../data';
import s from '../Admin.module.css';
import { Drawer, Fact, StatusPill } from './ui';
import { suggestPackage, type AdminState, type ViewProps } from './state';

const FILTERS: { id: Enquiry['state']; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'open', label: 'Open' },
  { id: 'replied', label: 'Replied' },
  { id: 'archived', label: 'Archived' },
];

const EMPTY: Record<Enquiry['state'], string> = {
  new: 'Nothing new. Every enquiry has been looked at.',
  open: 'Nothing open. Anything read has been answered or archived.',
  replied: 'No replies sent yet.',
  archived: 'Nothing archived.',
};

export default function EnquiriesView({ state, dispatch }: ViewProps) {
  const [filter, setFilter] = useState<Enquiry['state']>('new');
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const out: Record<Enquiry['state'], number> = { new: 0, open: 0, replied: 0, archived: 0 };
    for (const enquiry of state.enquiries) out[enquiry.state] += 1;
    return out;
  }, [state.enquiries]);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return state.enquiries.filter((enquiry) => {
      if (enquiry.state !== filter) return false;
      if (!needle) return true;
      return `${enquiry.name} ${enquiry.email} ${enquiry.message}`.toLowerCase().includes(needle);
    });
  }, [state.enquiries, filter, query]);

  const open = state.enquiries.find((e) => e.id === state.openEnquiry) ?? null;

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
              Search enquiries
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
              {shown.map((enquiry) => (
                <li key={enquiry.id}>
                  <button
                    type="button"
                    className={s.listItem}
                    onClick={() => dispatch({ type: 'openEnquiry', id: enquiry.id })}
                  >
                    <span className={s.listTop}>
                      <span className={s.listName}>{enquiry.name}</span>
                      <span className={s.listWhen}>{enquiry.received}</span>
                    </span>
                    <span className={s.listMeta}>
                      {enquiry.wants ? pretty(enquiry.wants) : 'No date yet'}, {enquiry.guests}{' '}
                      guests
                    </span>
                    <span className={s.listMsg}>{enquiry.message}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {open && (
        <EnquiryDrawer
          key={open.id}
          enquiry={open}
          state={state}
          dispatch={dispatch}
          returnFocusTo={listRef}
        />
      )}
    </div>
  );
}

function EnquiryDrawer({
  enquiry,
  state,
  dispatch,
  returnFocusTo,
}: {
  enquiry: Enquiry;
  state: AdminState;
  dispatch: ViewProps['dispatch'];
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const [replying, setReplying] = useState(false);
  const [text, setText] = useState(`Hi ${enquiry.name.split(' ')[0]},\n\n`);

  const day = enquiry.wants ? state.days[enquiry.wants] : undefined;
  const sent = state.replies[enquiry.id];
  const headcount = enquiry.seatsPlanned ?? enquiry.guests;
  const close = () => dispatch({ type: 'openEnquiry', id: null });

  // Why the hold button is or is not available, in the words you would use to
  // a colleague. A disabled button with no reason next to it is a bug report.
  const holdBlocked =
    !day ? 'No date on this one yet.'
    : day.status === 'confirmed' ? `Already booked for ${day.couple}.`
    : day.status === 'held' ? 'That date is already on hold.'
    : null;

  return (
    <Drawer
      title={enquiry.name}
      meta={
        <>
          {enquiry.email}, received {enquiry.received}
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
              if (!enquiry.wants) return;
              dispatch({
                type: 'hold',
                date: enquiry.wants,
                couple: enquiry.name,
                guests: headcount,
                packageId: suggestPackage(headcount),
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
                type: 'enquiryState',
                id: enquiry.id,
                state: enquiry.state === 'archived' ? 'open' : 'archived',
              })
            }
          >
            <Archive size={16} aria-hidden="true" />
            {enquiry.state === 'archived' ? 'Move back to open' : 'Archive'}
          </button>
        </div>
      }
    >
      <dl className={s.facts}>
        <Fact label="Date wanted">{enquiry.wants ? pretty(enquiry.wants) : 'Not said'}</Fact>
        <Fact label="Guests">{enquiry.guests}</Fact>
        <Fact label="That date">
          {day ? <StatusPill status={day.status} /> : 'Outside the 2027 calendar'}
        </Fact>
        <Fact label="Likely package">
          {packageById(suggestPackage(headcount))?.name}, {money(packageById(suggestPackage(headcount))?.price ?? 0)}
        </Fact>
      </dl>

      <p className={s.message}>{enquiry.message}</p>

      {enquiry.seatsPlanned !== undefined && (
        <p className={s.panelNote}>
          They used the seating planner on the site and laid out {enquiry.seatsPlanned} seats.
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
                dispatch({ type: 'reply', id: enquiry.id, text: text.trim() });
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
