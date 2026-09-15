import { useEffect, useState } from 'react';
import { Check, Clock, MapPin, Navigation, Phone, Mail } from 'lucide-react';
import type {
  DemoConfig,
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
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <p className={styles.serviceBody}>{service.body}</p>
          {service.price && <p className={styles.servicePrice}>{service.price}</p>}
        </article>
      ))}
    </div>
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
          <h3 className={styles.menuSectionTitle}>{group.group}</h3>
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

/* --- Gallery ------------------------------------------------------------- */

export function GalleryGrid({
  images,
  business,
}: {
  images: string[];
  business: string;
}) {
  if (images.length === 0) return null;

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
        <h3 className={styles.formTitle}>
          <Clock size={18} aria-hidden="true" /> Hours
        </h3>
        <div style={{ marginTop: '1rem' }}>
          <HoursList hours={config.hours} />
        </div>
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
