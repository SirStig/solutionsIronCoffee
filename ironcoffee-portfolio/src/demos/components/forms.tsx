import { useState, type FormEvent } from 'react';
import { site } from '../../content/site';
import type { DemoConfig } from '../types';
import styles from '../Demo.module.css';

type SendState = 'idle' | 'sending' | 'sent' | 'error' | 'demo';

const env = import.meta.env;

const emailjsConfigured = Boolean(
  env.VITE_EMAILJS_PUBLIC_KEY &&
    env.VITE_EMAILJS_SERVICE_ID &&
    env.VITE_EMAILJS_TEMPLATE_ID
);

type FormVariant = 'quote' | 'appointment' | 'booking';

/**
 * The words each trade actually uses, kept in one place.
 *
 * There used to be two variants and a chain of ternaries, and a barbershop got
 * the roofing one: "Property address", "free inspection", "Request my free
 * quote", on a page about haircuts. Every one of those is checkable nonsense to
 * the owner reading it, and an owner who catches the form describing somebody
 * else's trade has no reason to believe the opening hours either.
 *
 * The defaults promise nothing a particular business might not offer: no
 * "free", no "same day". A config that knows its own promise is true sets it
 * through `copy.formTitle`, `copy.formIntro` and `copy.formSubmit`.
 *
 * `extra` is the one field that differs between them. A dental practice asks
 * about insurance, a roofer needs the address of the roof, and a barbershop
 * needs neither and must not ask: a form that wants a stranger's home address
 * before it will book a haircut is a form nobody fills in.
 */
const copy: Record<
  FormVariant,
  {
    title: string;
    intro: string;
    detail: string;
    submit: string;
    extra: 'address' | 'insurance' | 'none';
  }
> = {
  quote: {
    title: 'Ask for a quote',
    intro: 'Tell us what is going on and we will get back to you about a visit.',
    detail: 'What is going on?',
    submit: 'Request a quote',
    extra: 'address',
  },
  appointment: {
    title: 'Request an appointment',
    intro:
      'Tell us what time works for you and the front desk will get back to you to confirm.',
    detail: 'What can we help with?',
    submit: 'Request appointment',
    extra: 'insurance',
  },
  booking: {
    title: 'Ask for a time',
    intro:
      'Say what you are looking for and when works for you, and the shop will get back to you to set a time.',
    detail: 'What are you looking for?',
    submit: 'Send the request',
    extra: 'none',
  },
};

/**
 * Which set of words a template's contact form should use.
 *
 * Read off the template rather than the slug, so a new business in an existing
 * trade needs no change here.
 */
export function formVariant(config: DemoConfig): FormVariant {
  if (config.template === 'professional') return 'appointment';
  if (config.template === 'booking') return 'booking';
  return 'quote';
}

/**
 * The lead form a visitor would fill in on the finished site.
 *
 * It deliberately does not send anything. A preview is shown to the owner, not
 * to their customers, so a live form here would either deliver strangers' leads
 * to the wrong inbox or quietly drop them. Instead it validates, accepts the
 * submission, and says where the message would arrive once the site is real,
 * which answers the question every owner asks anyway.
 */
export function BusinessForm({
  config,
  variant = 'quote',
  compact = false,
  headingLevel = 2,
  heading,
}: {
  config: DemoConfig;
  variant?: FormVariant;
  /** Tighter, for the trades hero where the form sits over the photograph. */
  compact?: boolean;
  /**
   * 2 where the form is the first thing under the page's h1, 3 where it sits
   * inside a section that already has its own h2.
   */
  headingLevel?: 2 | 3;
  /**
   * The heading printed directly above the form, if any. When the form's own
   * title would say the same words ("Request an appointment" under "Request
   * an appointment") the card says what it is asking for instead.
   */
  heading?: string;
}) {
  const [state, setState] = useState<SendState>('idle');

  // A web form arrives in an inbox, never down a phone line, so a business
  // with no published address gets a description rather than its phone number.
  const destination = config.business.email ?? "the owner's inbox";
  const own = config.copy;
  const words = {
    ...copy[variant],
    ...(own?.formTitle && { title: own.formTitle }),
    ...(own?.formIntro && { intro: own.formIntro }),
    ...(own?.formSubmit && { submit: own.formSubmit }),
  };
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const same = (a: string, b: string) =>
    a.trim().toLowerCase() === b.trim().toLowerCase();
  const title = heading && same(heading, words.title) ? 'Your details' : words.title;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setState('demo');
  }

  // The hero form is short on purpose; the extra field is the one to drop.
  const extra = compact ? 'none' : words.extra;

  return (
    <form
      className={[styles.form, compact && styles.formCompact]
        .filter(Boolean)
        .join(' ')}
      onSubmit={onSubmit}
    >
      <Heading className={styles.formTitle}>{title}</Heading>
      <p className={styles.formIntro}>{words.intro}</p>

      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Name</span>
          <input type="text" name="name" required autoComplete="name" />
        </label>

        <label className={styles.field}>
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
      </div>

      {(variant === 'appointment' || variant === 'booking') && !compact && (
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Best time to reach you</span>
            <select name="window" defaultValue="Morning">
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>

          {extra === 'insurance' && (
            <label className={styles.field}>
              <span>Insurance (optional)</span>
              <input type="text" name="insurance" autoComplete="off" />
            </label>
          )}
        </div>
      )}

      {extra === 'address' && (
        <label className={styles.field}>
          <span>Property address</span>
          <input type="text" name="address" autoComplete="street-address" />
        </label>
      )}

      <label className={styles.field}>
        <span>{words.detail}</span>
        <textarea name="message" rows={compact ? 3 : 4} required />
      </label>

      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
        {words.submit}
      </button>

      <p className={styles.formStatus} role="status" aria-live="polite" data-state={state}>
        {state === 'demo' &&
          `That worked. On the live site this would reach ${destination} straight away.`}
      </p>
    </form>
  );
}

/**
 * The form that actually sends, and it sends to me rather than to the business.
 * Every preview carries one so an owner reading this at eleven at night has
 * somewhere obvious to put a question.
 */
export function PreviewContact({ config }: { config: DemoConfig }) {
  const [state, setState] = useState<SendState>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if ((form.elements.namedItem('company') as HTMLInputElement)?.value) {
      setState('sent');
      return;
    }

    setState('sending');
    setError('');

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.sendForm(
        env.VITE_EMAILJS_SERVICE_ID,
        env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: env.VITE_EMAILJS_PUBLIC_KEY }
      );
      form.reset();
      setState('sent');
    } catch (err) {
      // The library's own message ("The public key is required") means
      // nothing to the person who pressed the button. Say what to do instead.
      console.error(err);
      setState('error');
      setError(`That did not go through. Email ${site.email} instead.`);
    }
  }

  if (!emailjsConfigured) {
    return (
      <div className={styles.form}>
        <h3 className={styles.formTitle}>Questions about this preview?</h3>
        <p className={styles.formIntro}>
          Email Joshua at{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> and you will hear
          back the same day.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.formTitle}>Questions about this preview?</h3>
      <p className={styles.formIntro}>
        This goes to Joshua, not to {config.business.name}. Ask anything, or say
        you want it taken down and it comes down today.
      </p>

      {/* Tells me which preview the message came from without asking the sender. */}
      <input type="hidden" name="preview_slug" value={config.slug} />
      <input type="hidden" name="preview_business" value={config.business.name} />

      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Name</span>
          <input type="text" name="from_name" required autoComplete="name" />
        </label>

        <label className={styles.field}>
          <span>Email or phone</span>
          <input type="text" name="reply_to" required autoComplete="email" />
        </label>
      </div>

      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={4} required />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        className={`${styles.btn} ${styles.btnPrimary}`}
        disabled={state === 'sending'}
      >
        {state === 'sending' ? 'Sending' : 'Send it'}
      </button>

      <p className={styles.formStatus} role="status" aria-live="polite" data-state={state}>
        {state === 'sent' && 'Got it. I will reply today.'}
        {state === 'error' && error}
      </p>
    </form>
  );
}
