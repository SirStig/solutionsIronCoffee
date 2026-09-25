import type { ReactNode } from 'react';
import { site } from '../../content/site';
import styles from '../Demo.module.css';

/** Section background treatments. `dark` paints the brand's deep tone. */
export type Tone = 'plain' | 'alt' | 'dark';

const toneClass: Record<Tone, string> = {
  plain: '',
  alt: styles.sectionAlt,
  dark: styles.sectionDark,
};

export function Section({
  id,
  tone = 'plain',
  narrow = false,
  reveal = false,
  children,
}: {
  id?: string;
  tone?: Tone;
  narrow?: boolean;
  /**
   * Lift the whole section in as it arrives.
   *
   * For a section whose contents are one thing rather than a row of things. A
   * row wants <stagger> on the row instead, so the cards arrive in sequence;
   * doing both animates the children twice and they fight.
   */
  reveal?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={[styles.section, toneClass[tone]].filter(Boolean).join(' ')}>
      <div
        className={[styles.container, narrow && styles.narrow, reveal && styles.rise]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * `center` is deliberately not the default any more.
 *
 * Every section on every sample used to open with a centered eyebrow over a
 * centered title over a centered sentence, ten times down the page. Nothing
 * says "bought a template" faster: real sites center a heading when they want
 * that one to feel like an announcement, and left-align the rest so the eye
 * has a margin to run down. Reach for `center` once per page, twice at most.
 *
 * `wide` drops the measure limit for a head that sits over a full-width band
 * rather than over a column of prose.
 */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'left',
  wide = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
  wide?: boolean;
}) {
  return (
    <header
      className={[
        styles.sectionHead,
        align === 'center' && styles.centered,
        wide && styles.sectionHeadWide,
        // Every section heading lifts in, on every template. Not decoration:
        // it is what tells a reader scrolling a long page that a new section
        // has started, which a flat page leaves entirely to the type.
        styles.rise,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
    </header>
  );
}

/**
 * A section that runs the full width of the viewport with no container.
 *
 * Used for the moments that are supposed to interrupt: a quote at display
 * size, a band of color, a photograph with nothing beside it. A page made
 * entirely of contained sections reads as one long column no matter what is
 * in it.
 */
export function Bleed({
  id,
  tone = 'brand',
  children,
}: {
  id?: string;
  tone?: 'brand' | 'deep' | 'alt';
  children: ReactNode;
}) {
  const bleedTone = {
    brand: styles.bleedBrand,
    deep: styles.bleedDeep,
    alt: styles.bleedAlt,
  }[tone];

  return (
    <section id={id} className={`${styles.bleed} ${bleedTone}`}>
      {children}
    </section>
  );
}

type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'outline' | 'onDark';

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.btnPrimary,
  accent: styles.btnAccent,
  ghost: styles.btnGhost,
  outline: styles.btnOutline,
  onDark: styles.btnOnDark,
};

/**
 * Every call to action on a demo is a link, to a phone number, an anchor or a
 * booking page. None of them are buttons, because none of them do anything
 * that needs JavaScript.
 */
export function Cta({
  href,
  variant = 'primary',
  block = false,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  block?: boolean;
  className?: string;
  children: ReactNode;
}) {
  // Links back to my own site are not third-party, even when a demo is being
  // served from its own subdomain and the URL is therefore absolute. Only a
  // genuinely outside destination, a booking system or a Facebook page, gets
  // taken out of the current tab.
  const external =
    /^https?:\/\//.test(href) && !href.startsWith(site.url);

  return (
    <a
      href={href}
      className={[styles.btn, variantClass[variant], block && styles.btnBlock, className]
        .filter(Boolean)
        .join(' ')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
