import { useState, type FormEvent } from 'react';
import Seo from '../components/Seo';
import SocialLinks from '../components/SocialLinks';
import { site } from '../content/site';
import styles from './Contact.module.css';

type State = 'idle' | 'sending' | 'sent' | 'error';

const env = import.meta.env;
const emailjsConfigured = Boolean(
  env.VITE_EMAILJS_PUBLIC_KEY &&
    env.VITE_EMAILJS_SERVICE_ID &&
    env.VITE_EMAILJS_TEMPLATE_ID
);

export default function Contact() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Bots fill every field, including the one nobody can see.
    if ((form.elements.namedItem('company') as HTMLInputElement)?.value) {
      setState('sent');
      return;
    }

    setState('sending');
    setError('');

    try {
      // Loaded on submit so the SDK never reaches visitors who don't write.
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
          : 'Something went wrong. Email me directly instead.'
      );
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with Joshua Kac — available for contract work and engineering roles. ${site.email}`}
        path="/contact"
      />

      <div className="container-wide">
        <header className={styles.header}>
          <h1>Get in touch</h1>
          <p className={styles.intro}>
            Available for contract work and engineering roles. Email is fastest
            &mdash; I read everything and reply to anything real.
          </p>
        </header>

        <SocialLinks variant="labelled" className={styles.socials} />

        {emailjsConfigured ? (
          <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
            <h2 className={styles.formTitle}>Or send a message here</h2>

            <div className={styles.row}>
              <label className={styles.field}>
                <span>Name</span>
                <input type="text" name="from_name" required autoComplete="name" />
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input
                  type="email"
                  name="reply_to"
                  required
                  autoComplete="email"
                  inputMode="email"
                />
              </label>
            </div>

            <label className={styles.field}>
              <span>Message</span>
              <textarea name="message" rows={6} required />
            </label>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <label className={styles.honeypot} aria-hidden="true">
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submit}
                disabled={state === 'sending'}
              >
                {state === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <p
                className={styles.status}
                role="status"
                aria-live="polite"
                data-state={state}
              >
                {state === 'sent' && 'Thanks — I’ll get back to you shortly.'}
                {state === 'error' && error}
              </p>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}
