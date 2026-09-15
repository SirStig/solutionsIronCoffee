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
import { directionsHref, fullAddress, telHref, todayName } from '../index';
import DemoImage from './DemoImage';
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
    <div className={styles.serviceGrid}>
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
    <dl className={styles.stats}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          {stat.icon && (
            <span className={styles.statIcon}>
              <Icon name={stat.icon} size={22} />
            </span>
          )}
          <dt className={styles.statValue}>{stat.value}</dt>
          <dd className={styles.statLabel}>{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Customer quotes. Gallery samples only; see DemoTestimonial. */
export function Testimonials({ items }: { items: DemoTestimonial[] }) {
  return (
    <div className={styles.quotes}>
      {items.map((t) => (
        <figure key={t.name} className={styles.quoteCard}>
          <span className={styles.quoteMark} aria-hidden="true">
            <Icon name="quote" size={28} />
          </span>
          <blockquote className={styles.quoteText}>{t.quote}</blockquote>
          <figcaption className={styles.quoteBy}>
            <span className={styles.quoteName}>{t.name}</span>
            {t.detail && <span className={styles.quoteDetail}>{t.detail}</span>}
          </figcaption>
        </figure>
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
 */
export function ServiceRows({ items }: { items: DemoService[] }) {
  return (
    <ul className={styles.serviceRows}>
      {items.map((service) => (
        <li key={service.title} className={styles.serviceRow}>
          <div className={styles.serviceRowHead}>
            <span className={styles.serviceRowTitle}>{service.title}</span>
            {service.price && (
              <>
                <span className={styles.menuLeader} aria-hidden="true" />
                <span className={styles.menuPrice}>{service.price}</span>
              </>
            )}
          </div>
          <p className={styles.serviceRowBody}>{service.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Services as a numbered sequence. Reads as a process, which suits trades. */
export function ServiceSteps({ items }: { items: DemoService[] }) {
  return (
    <ol className={styles.serviceSteps}>
      {items.map((service, index) => (
        <li key={service.title} className={styles.serviceStep}>
          <span className={styles.serviceStepNum} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
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
  return (
    <div>
      {groups.map((group) => (
        <div key={group.group} className={styles.productGroup}>
          <h3 className={styles.menuSectionTitle}>
            {group.icon && <Icon name={group.icon} size={22} />}
            {group.group}
          </h3>
          <div className={styles.productGrid}>
            {group.items.map((item) => (
              <article key={item.name} className={styles.productCard}>
                <h4 className={styles.productName}>{item.name}</h4>
                {item.desc && <p className={styles.productDesc}>{item.desc}</p>}
                <div className={styles.productFoot}>
                  {item.price ? (
                    <span className={styles.productPrice}>{item.price}</span>
                  ) : (
                    <span />
                  )}
                  {item.availability && (
                    <span
                      className={[styles.avail, availTone(item.availability)]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {item.availability}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* --- Hours --------------------------------------------------------------- */

/**
 * Marks the current day, but only after the page has hydrated.
 *
 * Pages here are built ahead of time, so a weekday resolved during render would
 * be the weekday the build ran. Reading the clock in an effect means the server
 * and the browser produce identical markup, and the highlight appears a frame
 * later once there is a real clock to read.
 */
export function HoursList({ hours }: { hours: DemoConfig['hours'] }) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => setToday(todayName()), []);

  return (
    <ul className={styles.hours}>
      {hours.map((row) => {
        const closed = /^closed$/i.test(row.open.trim());
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
export function HoursStrip({ hours }: { hours: DemoConfig['hours'] }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayName()), []);

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

/* --- Gallery ------------------------------------------------------------- */

export function GalleryGrid({
  images,
  business,
  fullBleed = false,
}: {
  images: string[];
  business: string;
  /** Edge to edge, with no section padding. Breaks up a page of containers. */
  fullBleed?: boolean;
}) {
  if (images.length === 0) return null;

  if (fullBleed) {
    // A fixed column count leaves holes whenever the photo count is not a
    // multiple of it. Pick the widest column count that divides evenly.
    const cols = [5, 4, 3, 2].find((n) => images.length % n === 0) ?? 3;
    return (
      <div
        className={styles.galleryBand}
        style={{ '--band-cols': cols } as React.CSSProperties}
      >
        {images.map((name, index) => (
          <div key={name} className={styles.galleryBandItem}>
            <DemoImage
              name={name}
              alt={`${business}, photo ${index + 1}`}
              mark={initials(business)}
              sizes="(min-width: 900px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {images.map((name, index) => (
        <div key={name} className={styles.galleryItem}>
          <DemoImage
            name={name}
            alt={`${business}, photo ${index + 1}`}
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
    <div className={styles.teamGrid}>
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
    <div className={styles.faqList}>
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
          alt={`Inside ${business.name}`}
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
            <span className={styles.contactLabel}>Find us</span>
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
            <a className={styles.contactValue} href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </span>
        </li>
      )}
    </ul>
  );
}

/** Contact details, hours and a directions link: the "where and when" block. */
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
        <h3 className={styles.blockTitle}>
          <Clock size={18} aria-hidden="true" />
          Hours
        </h3>
        <HoursList hours={config.hours} />
      </div>
    </div>
  );
}

/* --- Sticky mobile action bar ------------------------------------------- */

export function CallBar({ config }: { config: DemoConfig }) {
  const { business, hero } = config;

  return (
    <div className={styles.callBar}>
      {business.phone && (
        <a className={styles.callBarItem} href={telHref(business.phone)}>
          <Phone size={17} aria-hidden="true" />
          Call
        </a>
      )}
      <a
        className={`${styles.callBarItem} ${styles.callBarPrimary}`}
        href={hero.ctaHref}
      >
        {hero.ctaLabel}
      </a>
    </div>
  );
}
