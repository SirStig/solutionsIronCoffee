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

/**
 * The lead form a visitor would fill in on the finished site.
 *
 * It deliberately does not send anything. A preview is shown to the owner, not
 * to their customers, so a live form here would either deliver strangers' leads
 * to the wrong inbox or quietly drop them. Instead it validates, accepts the
 * submission, and says exactly where the message would arrive once the site is
 * real, which answers the question every owner asks anyway.
 */
export function BusinessForm({
  config,
  variant = 'quote',
}: {
  config: DemoConfig;
  variant?: 'quote' | 'appointment';
}) {
  const [state, setState] = useState<SendState>('idle');

  const destination =
    config.business.email ?? config.business.phone ?? 'your inbox';
  const isAppointment = variant === 'appointment';

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setState('demo');
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} id={isAppointment ? 'appointment' : 'quote'}>
      <h3 className={styles.formTitle}>
        {isAppointment ? 'Request an appointment' : 'Get a free quote'}
      </h3>
      <p className={styles.formIntro}>
        {isAppointment
          ? 'Tell us when suits you and the front desk will confirm by phone, usually the same day.'
          : 'Tell us what is going on and we will get you on the schedule for a free inspection.'}
      </p>

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

      {isAppointment ? (
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Best time to reach you</span>
            <select name="window" defaultValue="Morning">
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Insurance (optional)</span>
            <input type="text" name="insurance" autoComplete="off" />
          </label>
        </div>
      ) : (
        <label className={styles.field}>
          <span>Property address</span>
          <input type="text" name="address" autoComplete="street-address" />
        </label>
      )}

      <label className={styles.field}>
        <span>{isAppointment ? 'What do you need seen to?' : 'What is going on?'}</span>
        <textarea name="message" rows={4} required />
      </label>

      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
        {isAppointment ? 'Request appointment' : 'Request my free quote'}
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
      setState('error');
      setError(
        err instanceof Error
          ? err.message
          : `That did not go through. Email ${site.email} instead.`
      );
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
