/**
 * Sentry, loaded lazily and only in production.
 *
 * The SDK is heavy enough that it must never block first paint, so this module
 * is imported from an idle callback and imports Sentry itself dynamically.
 */

const dsn = import.meta.env.VITE_SENTRY_DSN;

export async function initErrorTracking(): Promise<void> {
  if (!dsn || !import.meta.env.PROD) return;

  try {
    const Sentry = await import('@sentry/react');
    Sentry.init({
      dsn,
      environment: 'production',
      // Sample lightly: this is a portfolio, not a system of record.
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications',
        'Non-Error promise rejection captured',
      ],
    });
  } catch {
    // Never let error tracking be the thing that breaks the page.
  }
}
