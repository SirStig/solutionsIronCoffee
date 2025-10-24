import * as Sentry from '@sentry/react';

export const initSentry = () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN;
  if (dsn) {
    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      enabled: process.env.NODE_ENV === 'production',
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.1
    });
  } else {
    console.warn('Sentry DSN is not defined');
  }
};

export const logError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context
  });
};

export const setUserContext = (userId: string, email?: string) => {
  Sentry.setUser({
    id: userId,
    email
  });
}; 