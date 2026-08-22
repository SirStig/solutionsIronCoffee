/**
 * GA4, loaded lazily and only in production.
 *
 * `react-ga4` is imported dynamically so the tag never lands in the entry
 * chunk. Page views fired before init are dropped rather than queued — losing
 * the first hit is a better trade than holding a buffer forever.
 */

let ready = false;

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export async function initAnalytics(): Promise<void> {
  if (ready || !measurementId || !import.meta.env.PROD) return;

  try {
    const ReactGA = (await import('react-ga4')).default;
    ReactGA.initialize(measurementId);
    ready = true;
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
    });
  } catch {
    // Blocked by an extension or offline — analytics is never load-bearing.
  }
}

export function logPageView(path: string): void {
  if (!ready) return;

  import('react-ga4')
    .then(({ default: ReactGA }) =>
      ReactGA.send({ hitType: 'pageview', page: path })
    )
    .catch(() => {
      /* ignore */
    });
}
