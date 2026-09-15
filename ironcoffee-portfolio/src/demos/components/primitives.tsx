import type { ReactNode } from 'react';
import { site } from '../../content/site';
import styles from '../Demo.module.css';

/** Section background treatments. `dark` paints the brand's deep tone. */
type Tone = 'plain' | 'alt' | 'dark';

const toneClass: Record<Tone, string> = {
  plain: '',
  alt: styles.sectionAlt,
  dark: styles.sectionDark,
};

export function Section({
  id,
  tone = 'plain',
  narrow = false,
  children,
}: {
  id?: string;
  tone?: Tone;
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={[styles.section, toneClass[tone]].filter(Boolean).join(' ')}>
      <div className={[styles.container, narrow && styles.narrow].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  centered?: boolean;
}) {
  return (
    <header
      className={[styles.sectionHead, centered && styles.centered]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
    </header>
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
