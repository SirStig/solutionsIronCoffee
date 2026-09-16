import { useMemo, useState } from 'react';
import { Check, Inbox, Pencil, Users } from 'lucide-react';
import type { DemoConfig } from '../types';
import styles from '../Demo.module.css';

/**
 * The owner's side of the site.
 *
 * This page exists to answer one objection, and it is the objection that costs
 * the most money: "your samples look great, so why is the next tier up three
 * times the price?" Every sample in the gallery is words and photographs, and
 * from the outside a booking form that writes to a database looks exactly like
 * a booking form that sends an email. The difference is this screen, and until
 * somebody sees it the higher tiers read as the same work with a bigger number
 * attached.
 *
 * So: a real calendar with real state, an enquiry list you can work through,
 * and page content you can edit and watch change. It runs on `useState` rather
 * than on a server, and it says so on the page, because a demonstration that
 * quietly implies a backend it does not have is the same dishonesty in the
 * other direction.
 */

type Status = 'free' | 'held' | 'booked';

interface Enquiry {
  id: string;
  name: string;
  date: string;
  people: number;
  note: string;
  read: boolean;
}

const SEED_ENQUIRIES: Enquiry[] = [
  { id: 'e1', name: 'Nadia Farrow', date: 'Sat 12 Sep', people: 120, note: 'Ceremony outside if the weather holds. Is the loft free the night before?', read: false },
  { id: 'e2', name: 'Tom and Ruth', date: 'Fri 27 Nov', people: 45, note: 'Small winter one. Do you do the Friday rate in November?', read: false },
  { id: 'e3', name: 'The Ortegas', date: 'Sat 14 Feb', people: 90, note: 'Bringing our own caterer, is that still fine?', read: true },
  { id: 'e4', name: 'Beth Mullins', date: 'Sun 6 Jun', people: 60, note: 'Dog in the ceremony. Non-negotiable.', read: true },
];

/** A month of squares. Deterministic, so the server and the browser agree. */
const SEED_DAYS: Status[] = Array.from({ length: 30 }, (_, i) => {
  if ([5, 12, 19, 26].includes(i)) return 'booked';
  if ([9, 23].includes(i)) return 'held';
  return 'free';
});

export default function AdminView({ config }: { config: DemoConfig }) {
  const [days, setDays] = useState<Status[]>(SEED_DAYS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(SEED_ENQUIRIES);
  const [headline, setHeadline] = useState(
    config.hero.headline.replace(/ \/ /g, ' ')
  );
  const [saved, setSaved] = useState(false);

  const counts = useMemo(
    () => ({
      booked: days.filter((d) => d === 'booked').length,
      held: days.filter((d) => d === 'held').length,
      unread: enquiries.filter((e) => !e.read).length,
    }),
    [days, enquiries]
  );

  const cycle = (i: number) =>
    setDays((prev) =>
      prev.map((d, j) =>
        j === i
          ? d === 'free'
            ? 'held'
            : d === 'held'
              ? 'booked'
              : 'free'
          : d
      )
    );

  return (
    <div className={styles.admin}>
      <p className={styles.adminNote}>
        This is the screen the owner sees, and everything on it works. Change a
        date, read an enquiry, edit the headline. Nothing is saved anywhere:
        it runs in this browser tab, because a sample site has no business
        holding real bookings. On a real build this is the same screen with a
        database behind it.
      </p>

      <div className={styles.adminGrid}>
        {/* --- Calendar ------------------------------------------------- */}
        <section className={styles.adminCard}>
          <header className={styles.adminCardHead}>
            <h3>
              <Users size={16} aria-hidden="true" />
              September
            </h3>
            <p>
              {counts.booked} booked, {counts.held} held
            </p>
          </header>

          <div className={styles.adminCal}>
            {days.map((status, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.adminDay} ${styles[`day_${status}`]}`}
                onClick={() => cycle(i)}
                aria-label={`September ${i + 1}, ${status}. Click to change.`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <ul className={styles.adminKey}>
            <li>
              <span className={styles.day_free} /> Free
            </li>
            <li>
              <span className={styles.day_held} /> Held
            </li>
            <li>
              <span className={styles.day_booked} /> Booked
            </li>
          </ul>
        </section>

        {/* --- Enquiries ------------------------------------------------- */}
        <section className={styles.adminCard}>
          <header className={styles.adminCardHead}>
            <h3>
              <Inbox size={16} aria-hidden="true" />
              Enquiries
            </h3>
            <p>{counts.unread} unread</p>
          </header>

          <ul className={styles.adminList}>
            {enquiries.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  className={[styles.adminRow, !e.read && styles.adminUnread]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() =>
                    setEnquiries((prev) =>
                      prev.map((x) =>
                        x.id === e.id ? { ...x, read: !x.read } : x
                      )
                    )
                  }
                >
                  <span className={styles.adminRowTop}>
                    <strong>{e.name}</strong>
                    <span>
                      {e.date} &middot; {e.people}
                    </span>
                  </span>
                  <span className={styles.adminRowNote}>{e.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* --- Content editor -------------------------------------------- */}
        <section className={`${styles.adminCard} ${styles.adminWide}`}>
          <header className={styles.adminCardHead}>
            <h3>
              <Pencil size={16} aria-hidden="true" />
              The front page
            </h3>
            <p>What visitors read first</p>
          </header>

          <label className={styles.adminLabel} htmlFor="admin-headline">
            Headline
          </label>
          <input
            id="admin-headline"
            className={styles.adminInput}
            value={headline}
            onChange={(e) => {
              setHeadline(e.target.value);
              setSaved(false);
            }}
          />

          <div className={styles.adminPreview}>
            <span className={styles.adminLabel}>Preview</span>
            <p className={styles.adminPreviewLine}>{headline || ' '}</p>
          </div>

          <button
            type="button"
            className={styles.adminSave}
            onClick={() => setSaved(true)}
          >
            {saved ? (
              <>
                <Check size={15} aria-hidden="true" />
                Saved
              </>
            ) : (
              'Save changes'
            )}
          </button>
        </section>
      </div>
    </div>
  );
}
