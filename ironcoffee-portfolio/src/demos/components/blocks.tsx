import { useEffect, useState } from 'react';
import { Check, Clock, MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { Icon } from './icons';
import type {
  DemoConfig,
  DemoStat,
  DemoTestimonial,
  DemoFaq,
  DemoMenuSection,
  DemoProductGroup,
  DemoService,
  DemoTeamMember,
} from '../types';
import { artName, directionsHref, fullAddress, telHref } from '../index';
import DemoImage from './DemoImage';
import MotifField, { hasMotif } from './motifs';
import { initials } from './DemoNav';
import { Cta } from './primitives';
import styles from '../Demo.module.css';

/* --- Trust badges -------------------------------------------------------- */

export function Badges({ items }: { items: string[] }) {
  return (
    <ul className={styles.badges}>
      {items.map((item) => (
        <li key={item} className={styles.badge}>
          <Check size={14} className={styles.badgeIcon} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Full-width strip under the hero. Used by trades and professional. */
export function BadgeBar({ items }: { items: string[] }) {
  return (
    <div className={styles.badgeBar}>
      <div className={styles.container}>
        <Badges items={items} />
      </div>
    </div>
  );
}

/* --- Services ------------------------------------------------------------ */

export function ServiceCards({
  items,
  bordered = false,
}: {
  items: DemoService[];
  bordered?: boolean;
}) {
  return (
    <div className={`${styles.serviceGrid} ${styles.stagger}`}>
      {items.map((service) => (
        <article
          key={service.title}
          className={[styles.serviceCard, bordered && styles.bordered]
            .filter(Boolean)
            .join(' ')}
        >
          {service.icon && (
            <span className={styles.serviceIcon}>
              <Icon name={service.icon} size={26} />
            </span>
          )}
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <p className={styles.serviceBody}>{service.body}</p>
          {service.price && <p className={styles.servicePrice}>{service.price}</p>}
        </article>
      ))}
    </div>
  );
}

/**
 * A band of plain numbers.
 *
 * The cheapest-looking thing a small business site can do is talk about itself
 * in adjectives. Four numerals set large say more than a paragraph, and they
 * give a page of text blocks something with weight in it.
 */
export function StatsBand({ stats }: { stats: DemoStat[] }) {
  return (
    <dl className={`${styles.stats} ${styles.stagger}`}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <dt className={styles.statValue}>
            {/* Inside the dt so the dl holds only dt and dd. */}
            {stat.icon && (
              <span className={styles.statIcon} aria-hidden="true">
                <Icon name={stat.icon} size={22} />
              </span>
            )}
            {stat.value}
          </dt>
          <dd className={styles.statLabel}>{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Customer quotes in a row of cards.
 *
 * On a sample these are written. On a preview they are verbatim public
 * reviews and carry a `source`, which is printed under the name: the
 * attribution is the difference between repeating a claim and making one.
 */
export function Testimonials({ items }: { items: DemoTestimonial[] }) {
  return (
    <div className={`${styles.quotes} ${styles.stagger}`}>
      {items.map((t) => (
        <figure key={t.quote} className={styles.quoteCard}>
          <span className={styles.quoteMark} aria-hidden="true">
            <Icon name="quote" size={28} />
          </span>
          <blockquote className={styles.quoteText}>{t.quote}</blockquote>
          <figcaption className={styles.quoteBy}>
            {t.name && <span className={styles.quoteName}>{t.name}</span>}
            {t.detail && <span className={styles.quoteDetail}>{t.detail}</span>}
            {t.source && (
              <span
                className={[styles.quoteSource, !t.name && styles.quoteSourceOnly]
                  .filter(Boolean)
                  .join(' ')}
              >
                {t.source} review
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * The sentence under a reviews heading, or nothing.
 *
 * It names the platform only when every quote it introduces carries one. The
 * templates used to write `source ?? 'Google'`, so each gallery sample, whose
 * customers are invented and whose quotes deliberately carry no source,
 * printed "Google reviews, copied word for word" over them: the exact claim
 * the tests forbid a sample's quotes from making, made by the heading instead.
 */
export function reviewsIntro(items: DemoTestimonial[]): string | undefined {
  if (!items.length || items.some((t) => !t.source)) return undefined;

  const sources = [...new Set(items.map((t) => t.source))];
  return sources.length === 1
    ? `Left in public by their own customers. ${sources[0]} reviews, copied word for word.`
    : 'Left in public by their own customers and copied word for word. Each one says where.';
}

/**
 * The quote <PullQuote> will set at display size: the shortest on file,
 * because that treatment falls apart past about thirty words.
 *
 * Exported so a template can render the remaining quotes in a row underneath
 * without printing one of them twice.
 */
export function pullQuotePick(
  items: DemoTestimonial[]
): DemoTestimonial | undefined {
  return [...items].sort((a, b) => a.quote.length - b.quote.length)[0];
}

/**
 * The quote that gets set at display size, and the ones that do not.
 *
 * Every template that shows reviews needs this split, and doing it by hand in
 * each one is how the same review ends up printed twice on a page: once as the
 * band and once in a card underneath it.
 */
export function splitQuotes(items?: DemoTestimonial[]): {
  lead?: DemoTestimonial;
  others: DemoTestimonial[];
} {
  const lead = items?.length ? pullQuotePick(items) : undefined;
  return { lead, others: items?.filter((t) => t !== lead) ?? [] };
}

/**
 * One quote, at the size a billboard would use it, on the brand color.
 *
 * Three quotes in three equal cards is a row every visitor has learned to skip.
 * One of them, given the whole width and a display face, is the only place on
 * these pages where a customer's sentence is the loudest thing on screen.
 */
export function PullQuote({ items }: { items: DemoTestimonial[] }) {
  const pick = pullQuotePick(items);
  if (!pick) return null;

  return (
    <figure className={styles.pullQuote}>
      <div className={styles.container}>
        <blockquote className={styles.pullQuoteText}>{pick.quote}</blockquote>
        <figcaption className={styles.pullQuoteBy}>
          {pick.name && (
            <span className={styles.pullQuoteName}>{pick.name}</span>
          )}
          {pick.detail && (
            <span className={styles.pullQuoteDetail}>{pick.detail}</span>
          )}
          {/* On a preview this line is the whole point of the section. It says
              the sentence above is not marketing copy, it is something a
              customer already wrote somewhere the owner can go and check. */}
          {pick.source && (
            <span className={styles.pullQuoteDetail}>
              {pick.source} review
            </span>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * One line of the business's own words, the full width of the screen, over a
 * photograph or a tiled motif.
 *
 * The same weight in the layout as <PullQuote>, for a page with no quote to
 * give it. A gallery sample has written testimonials; a preview for a real
 * business can only quote reviews it has in public, with the platform cited
 * (see DemoTestimonial), and some businesses have none worth quoting. Invented
 * words in a real customer's mouth are never the fallback. This band is, and
 * every word in it is the business's own line.
 *
 * `motif` is the drawn version and is not a downgrade. The band runs at about
 * 4:1, and a scene composed for a 4:3 frame arrives here cropped to a detail
 * of itself: the lawn sample showed nine inches of the middle of a mower,
 * which reads as a beige lump behind the type. A tiled mark is what this band
 * always wanted, because the band is a surface rather than a picture.
 */
export function StatementBand({
  image,
  motif,
  line,
  business,
  kicker,
}: {
  image: string;
  /** Motif name. Takes the place of the image when the demo is drawn. */
  motif?: string;
  line: string;
  business: string;
  kicker?: string;
}) {
  const surface = hasMotif(motif);

  return (
    <section
      className={[styles.statement, surface && styles.statementSurface]
        .filter(Boolean)
        .join(' ')}
    >
      {surface ? (
        <MotifField name={motif} className={styles.statementMotif} />
      ) : (
        <div className={styles.statementMedia}>
          <DemoImage
            name={image}
            alt=""
            mark={initials(business)}
            sizes="100vw"
            artTone="dark"
          />
        </div>
      )}
      {!surface && <div className={styles.statementScrim} aria-hidden="true" />}
      <div className={styles.container}>
        <div className={styles.statementCopy}>
          {kicker && <span className={styles.statementKicker}>{kicker}</span>}
          <p className={styles.statementLine}>{line}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * A band of short claims sliding past.
 *
 * The list is duplicated so the second copy is arriving as the first leaves,
 * which is what makes the loop seamless; the copy is hidden from assistive
 * technology so nobody hears the same six phrases twice. Anyone who has asked
 * their system to stop moving things gets one still row instead, scrolling
 * sideways when it is wider than the screen, which is why the phrases are
 * short enough to read that way too.
 */
export function Marquee({ items }: { items: string[] }) {
  if (!items.length) return null;
  const run = (
    <ul className={styles.marqueeRun}>
      {items.map((item) => (
        <li key={item} className={styles.marqueeItem}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeTrack}>
        {run}
        <div aria-hidden="true">{run}</div>
      </div>
    </div>
  );
}

/**
 * Alternating rows of photograph and copy, the image running past the column
 * it belongs to.
 *
 * The overhang is the whole point. A picture that sits neatly inside the text
 * column is a card; one that breaks the margin looks like somebody laid the
 * page out on purpose.
 */
export function FeatureRows({
  items,
  business,
}: {
  items: { title: string; body: string; image: string; kicker?: string }[];
  business: string;
}) {
  return (
    <div className={styles.featureRows}>
      {items.map((item, i) => (
        <article
          key={item.title}
          className={[styles.featureRow, i % 2 === 1 && styles.reversed]
            .filter(Boolean)
            .join(' ')}
        >
          <div className={styles.featureMedia}>
            <DemoImage
              name={item.image}
              alt={`${item.title} at ${business}`}
              mark={initials(business)}
              sizes="(min-width: 900px) 55vw, 100vw"
            />
          </div>
          <div>
            {item.kicker && (
              <span className={styles.featureKicker}>{item.kicker}</span>
            )}
            <h3 className={styles.featureTitle}>{item.title}</h3>
            <p className={styles.featureBody}>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Services as a priced list rather than a grid of cards.
 *
 * A salon or barber reads its own service list this way, as a column of names
 * with prices on the right, and it makes the page feel unlike the card grids
 * every other template uses.
 *
 * `numbered` is for the shop that publishes no prices, and it is not a
 * cosmetic choice. Priced, the row is a name, a leader and a figure, and the
 * figure is what the eye lands on. Unpriced, that same layout renders four
 * rows of "Call for pricing" down the right hand edge: a column whose only job
 * is to repeat one sentence, on the widest, emptiest part of the page. The
 * number takes that anchor back and the description gets the width instead, so
 * a shop that will not publish prices gets a service list that looks
 * deliberate rather than one that looks unfinished.
 */
export function ServiceRows({
  items,
  numbered = false,
}: {
  items: DemoService[];
  numbered?: boolean;
}) {
  return (
    <ul
      className={[
        styles.serviceRows,
        numbered && styles.serviceRowsNumbered,
        styles.stagger,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((service, index) => (
        <li key={service.title} className={styles.serviceRow}>
          {/* The icon if there is one, the numeral if there is not. Every
              config already names an icon per service and the priced layout
              has nowhere to put it; in this one the leading slot is free, and
              a drawn mark carries more of a shop's character than 01 does. */}
          {numbered && (
            <span className={styles.serviceRowMark} aria-hidden="true">
              {service.icon ? (
                <Icon name={service.icon} size={22} />
              ) : (
                <span className={styles.serviceRowNum}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </span>
          )}
          <div className={styles.serviceRowMain}>
            <div className={styles.serviceRowHead}>
              <span className={styles.serviceRowTitle}>{service.title}</span>
              {!numbered && service.price && (
                <>
                  <span className={styles.menuLeader} aria-hidden="true" />
                  <span className={styles.menuPrice}>{service.price}</span>
                </>
              )}
            </div>
            <p className={styles.serviceRowBody}>{service.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Services as a numbered sequence. Reads as a process, which suits trades. */
export function ServiceSteps({ items }: { items: DemoService[] }) {
  return (
    <ol className={`${styles.serviceSteps} ${styles.stagger}`}>
      {items.map((service, index) => (
        <li key={service.title} className={styles.serviceStep}>
          <span className={styles.serviceStepNum} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className={styles.serviceStepBody}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceBody}>{service.body}</p>
            {service.price && (
              <p className={styles.servicePrice}>{service.price}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Services as a two-column definition list, calm and clinical. */
export function ServiceList({ items }: { items: DemoService[] }) {
  return (
    <dl className={styles.serviceDefs}>
      {items.map((service) => (
        <div key={service.title} className={styles.serviceDef}>
          <dt className={styles.serviceDefTitle}>
            {service.title}
            {service.price && (
              <span className={styles.serviceDefPrice}>{service.price}</span>
            )}
          </dt>
          <dd className={styles.serviceDefBody}>{service.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* --- Menu ---------------------------------------------------------------- */

export function MenuBlock({ sections }: { sections: DemoMenuSection[] }) {
  return (
    <div className={styles.menuSections}>
      {sections.map((section) => (
        <div key={section.section}>
          <h3 className={styles.menuSectionTitle}>{section.section}</h3>
          <ul className={styles.menuItems}>
            {section.items.map((item) => (
              <li key={item.name}>
                <div className={styles.menuItemHead}>
                  <span className={styles.menuName}>{item.name}</span>
                  {item.price && (
                    <>
                      <span className={styles.menuLeader} aria-hidden="true" />
                      <span className={styles.menuPrice}>{item.price}</span>
                    </>
                  )}
                </div>
                {item.desc && <p className={styles.menuDesc}>{item.desc}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* --- Products (retail) --------------------------------------------------- */

/** Maps free-text availability to a color without hard-coding a vocabulary. */
function availTone(text: string): string {
  const lower = text.toLowerCase();
  if (/(out|sold out|none|unavailable|back soon)/.test(lower)) return styles.availOut;
  if (/(in stock|available|on hand|yes)/.test(lower)) return styles.availIn;
  return '';
}

export function ProductBlock({ groups }: { groups: DemoProductGroup[] }) {
  // One group means the group name is doing the same job as the section
  // heading directly above it, and the page says "What we carry" twice.
  const showHeadings = groups.length > 1;

  return (
    <div>
      {groups.map((group) => {
        // A group where nothing has a price, a description or a stock note is
        // a list of category names. Six of those rendered as cards is six
        // mostly-empty boxes, which is exactly what a preview for a business
        // that has not sent its details through looks like. A dense row of
        // tags says the same thing and looks deliberate.
        const bare = group.items.every(
          (item) => !item.desc && !item.price && !item.availability
        );

        return (
        <div key={group.group} className={styles.productGroup}>
          {showHeadings && (
            <h3 className={styles.menuSectionTitle}>
              {group.icon && <Icon name={group.icon} size={22} />}
              {group.group}
            </h3>
          )}
          {bare ? (
            <ul className={styles.productTags}>
              {group.items.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          ) : (
          <div className={`${styles.productGrid} ${styles.stagger}`}>
            {group.items.map((item) => (
              <article key={item.name} className={styles.productCard}>
                <h4 className={styles.productName}>{item.name}</h4>
                {item.desc && <p className={styles.productDesc}>{item.desc}</p>}
                {/* The stock note first and the price last, stacked and pinned
                    to the foot of the card, so every price in a row sits on
                    the same line. Side by side, a short badge shared the
                    price's line and a long one wrapped under it, and the
                    prices in one row landed at two different heights. */}
                {(item.price || item.availability) && (
                  <div className={styles.productFoot}>
                    {item.availability && (
                      <span
                        className={[styles.avail, availTone(item.availability)]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {item.availability}
                      </span>
                    )}
                    {item.price && (
                      <span className={styles.productPrice}>{item.price}</span>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
          )}
        </div>
        );
      })}
    </div>
  );
}

/* --- Hours --------------------------------------------------------------- */

/* --- Open now -----------------------------------------------------------
 *
 * Whether the shop is open at this moment, worked out from the hours table.
 *
 * The one piece of a small business site that a Facebook page cannot do and
 * every owner immediately understands. It is also the cheapest possible proof
 * that the page is running code rather than sitting there as a picture, which
 * matters when the thing being sold is a site rather than a subscription.
 *
 * Four rules keep it honest.
 *
 * It only ever reads the same strings the hours table prints two inches below
 * it, so the badge and the table cannot disagree. If the hours on the page are
 * wrong, the badge is wrong in exactly the same way, which is the correction
 * a preview is meant to provoke.
 *
 * Anything it cannot parse renders nothing at all. 'By appointment', 'Call or
 * message' and 'Emergency calls only' are real values in these configs and
 * none of them is a time. Guessing "Open now" from a sentence the parser did
 * not understand would put a false claim about a real business on a page with
 * that business's name at the top.
 *
 * It tells the time where the business is, not where the visitor is. An owner
 * in Denver checking the page from a trip to Chicago should see their own
 * hours, not hours shifted by one.
 *
 * And like <HoursList>, it reads the clock in an effect rather than during
 * render. These pages are built hours or weeks ahead of being looked at, so a
 * time resolved at render would be the build machine's, baked into the HTML
 * and wrong by the time anybody sees it.
 * ----------------------------------------------------------------------- */

/** Every business in these configs is in Colorado. */
export const DEFAULT_TIME_ZONE = 'America/Denver';

/** The zone a demo's clock runs in. */
export const businessTimeZone = (config: DemoConfig): string =>
  config.business.timeZone ?? DEFAULT_TIME_ZONE;

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export interface ZonedClock {
  /** 'Wednesday'. */
  day: string;
  /** 0 for Sunday, matching `Date.getDay()`. */
  dayIndex: number;
  /** Minutes past midnight on that day. */
  minutes: number;
}

/**
 * The weekday and time of day at `now`, on the wall clock in `timeZone`.
 *
 * Falls back to the device's own clock for a zone the runtime does not know,
 * because a badge an hour out is better than a page that throws.
 */
export function zonedClock(now: Date, timeZone: string): ZonedClock {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value;
    const day = get('weekday') ?? '';
    const dayIndex = WEEKDAYS.indexOf(day);
    // Some runtimes still print midnight as 24 under h23.
    const hour = Number(get('hour')) % 24;
    const minute = Number(get('minute'));
    if (dayIndex >= 0 && Number.isFinite(hour) && Number.isFinite(minute)) {
      return { day, dayIndex, minutes: hour * 60 + minute };
    }
  } catch {
    // An unknown zone. Fall through to the local clock.
  }
  return {
    day: WEEKDAYS[now.getDay()],
    dayIndex: now.getDay(),
    minutes: now.getHours() * 60 + now.getMinutes(),
  };
}

/** '5:30pm' -> 1050. Minutes past midnight, or null if it is not a time. */
function clockMinutes(text: string): number | null {
  const m = text.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!m) return null;

  const hour12 = Number(m[1]);
  if (hour12 < 1 || hour12 > 12) return null;

  const mins = m[2] ? Number(m[2]) : 0;
  if (mins > 59) return null;

  const pm = m[3].toLowerCase() === 'pm';
  // 12am is midnight and 12pm is noon, so the hour wraps rather than adds.
  const hour24 = (hour12 % 12) + (pm ? 12 : 0);
  return hour24 * 60 + mins;
}

export interface Span {
  /** Minutes past midnight. */
  open: number;
  /** Minutes past midnight, past 1440 when it closes the next morning. */
  close: number;
  /** The strings as the config wrote them, so the badge quotes rather than
      reformats. '10am' stays '10am' and never becomes '10:00 AM'. */
  opensAt: string;
  closesAt: string;
}

/**
 * '10am to 6pm' -> a span. Anything else -> null.
 *
 * Exported so the order page offers pickup times from the same hours the
 * badge reads, rather than from a range typed into the component.
 */
export function parseSpan(text: string): Span | null {
  // Hyphen, en dash or em dash between the times, written as escapes so the
  // source itself carries neither dash.
  const parts = text
    .trim()
    .split(/\s*(?:\s(?:to|until|till|through)\s|-|\u2013|\u2014)\s*/i);
  if (parts.length !== 2) return null;

  const open = clockMinutes(parts[0]);
  const close = clockMinutes(parts[1]);
  if (open === null || close === null) return null;

  return {
    open,
    // A close earlier than the open is the next morning, not a negative day.
    close: close <= open ? close + 24 * 60 : close,
    opensAt: parts[0].trim(),
    closesAt: parts[1].trim(),
  };
}

const isClosed = (text: string) => /^closed$/i.test(text.trim());

export interface OpenState {
  open: boolean;
  /** 'until 6pm', 'opens 10am', 'opens Tuesday'. */
  note: string;
}

/**
 * Exported for the tests, which is the only way to check this without
 * pretending to be a browser at half past four on a Wednesday.
 */
export function openState(
  hours: DemoConfig['hours'],
  now = new Date(),
  timeZone: string = DEFAULT_TIME_ZONE
): OpenState | null {
  const clock = zonedClock(now, timeZone);
  const today = clock.day;
  const minutesNow = clock.minutes;

  // Last night's hours first: a bar open 6pm to 1am is still open at half
  // past midnight, on a day whose own row might say something else entirely.
  const yesterdayName = WEEKDAYS[(clock.dayIndex + 6) % 7];
  const yesterday = hours.find((h) => h.day === yesterdayName);
  const lastNight = yesterday ? parseSpan(yesterday.open) : null;
  if (lastNight && lastNight.close > 24 * 60 && minutesNow < lastNight.close - 24 * 60) {
    return { open: true, note: `Until ${lastNight.closesAt}` };
  }

  const row = hours.find((h) => h.day === today);
  if (!row) return null;

  // The next day that states a time, for the "opens Thursday" case. Starts at
  // tomorrow and gives up after a full week rather than looping forever on a
  // config where nothing parses.
  const nextOpenDay = (): string | null => {
    const index = hours.findIndex((h) => h.day === today);
    for (let step = 1; step <= hours.length; step += 1) {
      const candidate = hours[(index + step) % hours.length];
      if (parseSpan(candidate.open)) return candidate.day;
    }
    return null;
  };

  if (isClosed(row.open)) {
    const day = nextOpenDay();
    return { open: false, note: day ? `Opens ${day}` : 'Closed today' };
  }

  const span = parseSpan(row.open);
  // 'By appointment', 'Call or message', anything else with no clock in it.
  // Saying nothing is the only safe answer.
  if (!span) return null;

  if (minutesNow < span.open) {
    return { open: false, note: `Opens ${span.opensAt}` };
  }
  if (minutesNow < span.close) {
    return { open: true, note: `Until ${span.closesAt}` };
  }

  const day = nextOpenDay();
  return { open: false, note: day ? `Opens ${day}` : 'Closed now' };
}

export function OpenNow({
  hours,
  timeZone = DEFAULT_TIME_ZONE,
  className,
}: {
  hours: DemoConfig['hours'];
  /** IANA zone the business keeps its hours in. */
  timeZone?: string;
  className?: string;
}) {
  const [state, setState] = useState<OpenState | null>(null);

  // Once on mount, then every minute, so a page left open across closing time
  // does not keep saying "Open now".
  useEffect(() => {
    const tick = () => setState(openState(hours, new Date(), timeZone));
    tick();
    const id = window.setInterval(tick, 60 * 1000);
    return () => window.clearInterval(id);
  }, [hours, timeZone]);

  if (!state) return null;

  return (
    <span
      className={[
        styles.openNow,
        state.open ? styles.openNowYes : styles.openNowNo,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.openNowDot} aria-hidden="true" />
      <span className={styles.openNowLabel}>
        {state.open ? 'Open now' : 'Closed'}
      </span>
      <span className={styles.openNowNote}>{state.note}</span>
    </span>
  );
}

/**
 * Today's weekday in the business's zone, or null until the page has mounted.
 *
 * Pages here are built ahead of time, so a weekday resolved during render would
 * be the weekday the build ran. Reading the clock in an effect means the server
 * and the browser produce identical markup, and anything keyed on today
 * appears a frame later once there is a real clock to read.
 */
export function useToday(timeZone: string = DEFAULT_TIME_ZONE): string | null {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(zonedClock(new Date(), timeZone).day), [timeZone]);
  return today;
}

/**
 * Consecutive days with the same hours, folded into one row each.
 *
 * "Call or message" printed seven times down a footer is noise, and so is
 * "By appointment" four times running. The full table stays where the hours
 * are the subject; this is for places that only need to be read at a glance.
 * Days are shortened to three letters so a range fits a narrow column, and a
 * week where every day says the same thing becomes "Every day". Pure string
 * work, no clock, so the server and the browser always agree.
 */
export function hourRanges(
  hours: DemoConfig['hours']
): { label: string; open: string }[] {
  const short = (day: string) => day.slice(0, 3);
  const groups: { first: string; last: string; open: string }[] = [];
  for (const row of hours) {
    const prev = groups[groups.length - 1];
    if (prev && prev.open.trim().toLowerCase() === row.open.trim().toLowerCase()) {
      prev.last = row.day;
    } else {
      groups.push({ first: row.day, last: row.day, open: row.open });
    }
  }
  if (hours.length === 7 && groups.length === 1) {
    return [{ label: 'Every day', open: groups[0].open }];
  }
  return groups.map((group) => ({
    label:
      group.first === group.last
        ? short(group.first)
        : `${short(group.first)} to ${short(group.last)}`,
    open: group.open,
  }));
}

/** Marks the current day, but only after the page has hydrated. */
export function HoursList({
  hours,
  timeZone,
}: {
  hours: DemoConfig['hours'];
  timeZone?: string;
}) {
  const today = useToday(timeZone);

  // Seven identical rows are one fact said seven times. There is no "today"
  // to mark when every day reads the same.
  const uniform =
    hours.length === 7 &&
    hours.every(
      (row) => row.open.trim().toLowerCase() === hours[0].open.trim().toLowerCase()
    );
  if (uniform) {
    return (
      <ul className={styles.hours}>
        <li className={styles.hoursRow}>
          <span className={styles.hoursDay}>Every day</span>
          <span
            className={[styles.hoursOpen, isClosed(hours[0].open) && styles.hoursClosed]
              .filter(Boolean)
              .join(' ')}
          >
            {hours[0].open}
          </span>
        </li>
      </ul>
    );
  }

  return (
    <ul className={styles.hours}>
      {hours.map((row) => {
        const closed = isClosed(row.open);
        const isToday = today === row.day;

        return (
          <li
            key={row.day}
            className={[styles.hoursRow, isToday && styles.hoursToday]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.hoursDay}>
              {row.day}
              {isToday && <span className={styles.hoursTodayTag}>Today</span>}
            </span>
            <span
              className={[styles.hoursOpen, closed && styles.hoursClosed]
                .filter(Boolean)
                .join(' ')}
            >
              {row.open}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Hours as a row of chips. Compact enough to sit directly under a hero. */
export function HoursStrip({
  hours,
  timeZone,
}: {
  hours: DemoConfig['hours'];
  timeZone?: string;
}) {
  const today = useToday(timeZone);

  return (
    <ul className={styles.hoursStrip}>
      {hours.map((row) => (
        <li
          key={row.day}
          className={[styles.hoursChip, today === row.day && styles.hoursChipToday]
            .filter(Boolean)
            .join(' ')}
        >
          <span className={styles.hoursChipDay}>{row.day.slice(0, 3)}</span>
          <span className={styles.hoursChipOpen}>{row.open}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Hours and the one action, as a card that sits over the hero.
 *
 * The roofing sample puts a quote form here and it is the strongest opening in
 * the set, because something useful is on screen before the visitor has
 * scrolled at all. A barbershop has no form worth filling in: the useful thing
 * is whether they are open right now and what the number is.
 *
 * The whole week is printed rather than just today, which looks like more work
 * and is in fact less: seven static rows are the same markup on the server and
 * in the browser, so there is nothing to reconcile and nothing that pops in a
 * beat after the page paints. The two live parts, the badge and the highlight
 * on today's row, each arrive on their own once there is a real clock to read.
 */
export function HoursCard({ config }: { config: DemoConfig }) {
  const { hero } = config;
  const timeZone = businessTimeZone(config);
  // The hero beside this card already carries the one action. When that
  // action is a phone call, a second copy of it here is the same button twice
  // within one screen, so the card leaves it out.
  const heroIsCall = hero.ctaHref.startsWith('tel:');

  return (
    <div className={styles.hoursCard}>
      <div className={styles.hoursCardHead}>
        <h2 className={styles.hoursCardTitle}>Hours</h2>
        <OpenNow hours={config.hours} timeZone={timeZone} />
      </div>
      <HoursList hours={config.hours} timeZone={timeZone} />
      {!heroIsCall && (
        <Cta href={hero.ctaHref} block>
          {hero.ctaLabel}
        </Cta>
      )}
    </div>
  );
}

/* --- Gallery ------------------------------------------------------------- */

/**
 * Column count and whether the first tile takes a double-width span.
 *
 * The rule is only "leave no holes". A trailing gap in a photo grid is the
 * single most common way a page that is otherwise fine starts looking
 * unfinished, and the photo count is config data, so it will keep changing.
 */
function layout(count: number): { cols: number; lead: boolean } {
  const plain = [3, 2].find((n) => count % n === 0);
  if (plain && count > 2) return { cols: plain, lead: false };
  // One extra cell from the lead tile's span, then the same question again.
  const spanned = [3, 2].find((n) => (count + 1) % n === 0);
  if (spanned && count > 2) return { cols: spanned, lead: true };
  return { cols: Math.max(count, 1), lead: false };
}

/**
 * Alt text for one gallery tile.
 *
 * A drawing ignores this and describes itself (see DemoImage). A photograph
 * gets the business's name only when it is the business's own: on a preview
 * dressed in stock, "Acme, photograph 2" is a claim about their premises the
 * picture cannot back up.
 */
function galleryAlt(business: string, index: number, count: number, sample: boolean) {
  return sample
    ? `Sample photograph ${index + 1} of ${count}, not taken at ${business}`
    : `${business}, photograph ${index + 1} of ${count}`;
}

export function GalleryGrid({
  images,
  business,
  fullBleed = false,
  cols: forcedCols,
  sample = false,
}: {
  images: string[];
  business: string;
  /** The photographs are generic stock: `config.placeholderPhotos`. */
  sample?: boolean;
  /** Edge to edge, with no section padding. Breaks up a page of containers. */
  fullBleed?: boolean;
  /**
   * Override the column count `layout()` would pick.
   *
   * There for a set of drawings, which want to run as one band across the
   * page. Four photographs in a two by two grid read as four photographs;
   * four illustrations in the same grid read as four pieces of clip art in
   * boxes, and the same four in a single row read as one frieze, which is a
   * thing somebody drew on purpose.
   */
  cols?: number;
}) {
  if (images.length === 0) return null;

  // Three columns at most. Four across a 1440 frame makes every tile a narrow
  // portrait slot, which is how a photograph of somebody getting a haircut ends
  // up cropped through the head.
  //
  // `lead` is the escape hatch for a count that divides by nothing: giving the
  // first tile a double-width span adds one cell, and a count that was awkward
  // becomes one that is not. Five photos is the common case and the result is
  // a better layout than five equal squares would have been anyway.
  const auto = layout(images.length);
  const cols = forcedCols ?? auto.cols;
  // A forced column count is a deliberate shape; the lead tile's double span
  // exists only to rescue a count that divides by nothing, and applying it
  // here would put a hole back in the row it was asked to make.
  const lead = forcedCols ? false : auto.lead;

  if (fullBleed) {
    return (
      <div
        className={`${styles.galleryBand} ${styles.stagger}`}
        style={{ '--band-cols': cols } as React.CSSProperties}
      >
        {images.map((name, index) => (
          <div
            key={name}
            className={[
              styles.galleryBandItem,
              lead && index === 0 && styles.galleryLead,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <DemoImage
              name={name}
              alt={galleryAlt(business, index, images.length, sample)}
              mark={initials(business)}
              sizes="(min-width: 900px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${styles.gallery} ${styles.stagger}`}
      style={{ '--band-cols': cols } as React.CSSProperties}
    >
      {images.map((name, index) => (
        <div
          key={name}
          className={[
            styles.galleryItem,
            lead && index === 0 && styles.galleryLead,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <DemoImage
            name={name}
            alt={galleryAlt(business, index, images.length, sample)}
            mark={initials(business)}
            sizes="(min-width: 720px) 33vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}

/* --- Team ---------------------------------------------------------------- */

export function TeamGrid({ members }: { members: DemoTeamMember[] }) {
  return (
    <div className={`${styles.teamGrid} ${styles.stagger}`}>
      {members.map((member) => (
        <article key={member.name} className={styles.teamCard}>
          <div className={styles.teamPhoto}>
            <DemoImage
              name={member.image}
              alt={member.name}
              mark={initials(member.name)}
              sizes="(min-width: 860px) 20vw, 50vw"
            />
          </div>
          <h3 className={styles.teamName}>{member.name}</h3>
          <p className={styles.teamRole}>{member.role}</p>
          {member.bio && <p className={styles.teamBio}>{member.bio}</p>}
        </article>
      ))}
    </div>
  );
}

/* --- FAQ ----------------------------------------------------------------- */

export function FaqList({ items }: { items: DemoFaq[] }) {
  return (
    <div className={`${styles.faqList} ${styles.stagger}`}>
      {items.map((item) => (
        <article key={item.q} className={styles.faqItem}>
          <h3 className={styles.faqQ}>{item.q}</h3>
          <p className={styles.faqA}>{item.a}</p>
        </article>
      ))}
    </div>
  );
}

/* --- About --------------------------------------------------------------- */

export function AboutBlock({
  config,
  reversed = false,
}: {
  config: DemoConfig;
  reversed?: boolean;
}) {
  const { about, business } = config;
  // A drawing describes itself. A stock photograph must not say it was taken
  // inside the business.
  const aboutAlt =
    config.placeholderPhotos && !artName(about.image)
      ? `Sample photograph, not taken at ${business.name}`
      : `Inside ${business.name}`;

  return (
    <div
      className={[styles.aboutGrid, reversed && styles.reversed]
        .filter(Boolean)
        .join(' ')}
    >
      <div>
        <h2 className={styles.sectionTitle}>{about.heading}</h2>
        <p className={styles.aboutBody}>{about.body}</p>
      </div>

      <div className={styles.aboutMedia}>
        <DemoImage
          name={about.image}
          alt={aboutAlt}
          mark={initials(business.name)}
          sizes="(min-width: 860px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}

/* --- Service areas / insurance ------------------------------------------ */

export function ServiceAreas({ areas }: { areas: string[] }) {
  return (
    <ul className={styles.areaList}>
      {areas.map((area) => (
        <li key={area} className={styles.areaItem}>
          {area}
        </li>
      ))}
    </ul>
  );
}

export function InsuranceList({ plans }: { plans: string[] }) {
  return (
    <ul className={styles.insuranceGrid}>
      {plans.map((plan) => (
        <li key={plan} className={styles.insuranceItem}>
          <Check size={15} className={styles.badgeIcon} aria-hidden="true" />
          {plan}
        </li>
      ))}
    </ul>
  );
}

/* --- Visit / contact details -------------------------------------------- */

export function ContactDetails({ config }: { config: DemoConfig }) {
  const { business } = config;
  const address = fullAddress(config);

  return (
    <ul className={styles.contactList}>
      {business.phone && (
        <li className={styles.contactRow}>
          <span className={styles.contactIcon}>
            <Phone size={18} aria-hidden="true" />
          </span>
          <span>
            <span className={styles.contactLabel}>Phone</span>
            <a className={styles.contactValue} href={telHref(business.phone)}>
              {business.phone}
            </a>
          </span>
        </li>
      )}

      {address && (
        <li className={styles.contactRow}>
          <span className={styles.contactIcon}>
            <MapPin size={18} aria-hidden="true" />
          </span>
          <span>
            <span className={styles.contactLabel}>Address</span>
            <a
              className={styles.contactValue}
              href={directionsHref(config)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {address}
            </a>
          </span>
        </li>
      )}

      {business.email && (
        <li className={styles.contactRow}>
          <span className={styles.contactIcon}>
            <Mail size={18} aria-hidden="true" />
          </span>
          <span>
            <span className={styles.contactLabel}>Email</span>
            {/* A break opportunity after the @, so a narrow screen splits the
                address where a reader expects rather than wherever the
                letters run out: "examp / le" at 390px. */}
            <a className={styles.contactValue} href={`mailto:${business.email}`}>
              {business.email.split('@')[0]}@<wbr />
              {business.email.split('@').slice(1).join('@')}
            </a>
          </span>
        </li>
      )}
    </ul>
  );
}

/**
 * Contact details, hours and a directions link: the "where and when" block.
 *
 * The week is printed here even on a template whose hero already carries an
 * hours card. Dropping it to avoid the repetition was tried and was worse: the
 * section is titled "Where to come", and with one short column under that
 * heading it reads as a page that ran out of things to say. A visitor looking
 * for opening times in the place opening times belong is not annoyed to find
 * them.
 */
export function VisitBlock({ config }: { config: DemoConfig }) {
  return (
    <div className={styles.visitGrid}>
      <div>
        <ContactDetails config={config} />
        <Cta href={directionsHref(config)}>
          <Navigation size={17} aria-hidden="true" />
          Get directions
        </Cta>
      </div>

      <div>
        {/* The badge sits beside the heading rather than inside it, so a
            screen reader's list of headings says "Hours" and nothing that
            changes by the minute. */}
        <div className={`${styles.blockTitle} ${styles.blockTitleRow}`}>
          <h3 className={`${styles.blockTitle} ${styles.blockTitleFlush}`}>
            <Clock size={18} aria-hidden="true" />
            Hours
          </h3>
          <OpenNow hours={config.hours} timeZone={businessTimeZone(config)} />
        </div>
        <HoursList hours={config.hours} timeZone={businessTimeZone(config)} />
      </div>
    </div>
  );
}

/* --- Sticky mobile action bar ------------------------------------------- */

export function CallBar({
  config,
  subPage = false,
}: {
  config: DemoConfig;
  subPage?: boolean;
}) {
  const { business, hero } = config;
  const base = config.showcase
    ? `/templates/${config.slug}`
    : `/demo/${config.slug}`;
  const ctaHref =
    subPage && hero.ctaHref.startsWith('#')
      ? `${base}${hero.ctaHref}`
      : hero.ctaHref;

  // When the one action already is the phone call, a separate Call item would
  // put the same number on the bar twice.
  const heroIsCall = hero.ctaHref.startsWith('tel:');

  return (
    <div className={styles.callBar}>
      {business.phone && !heroIsCall && (
        <a className={styles.callBarItem} href={telHref(business.phone)}>
          <Phone size={17} aria-hidden="true" />
          Call
        </a>
      )}
      <a
        className={`${styles.callBarItem} ${styles.callBarPrimary}`}
        href={ctaHref}
      >
        {hero.ctaLabel}
      </a>
    </div>
  );
}
