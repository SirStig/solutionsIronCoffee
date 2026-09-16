import { useEffect, useState } from 'react';
import styles from './SpeedPanel.module.css';

/**
 * Measures the page you are currently reading and shows the result.
 *
 * Deliberately not a comparison table. Claiming a competitor's load time is
 * both unverifiable and the first thing a sceptical reader will check, so this
 * measures the only thing it can honestly vouch for, states Google's published
 * thresholds beside it, and invites the reader to go and measure anything else
 * themselves.
 *
 * Everything is read after mount, so the server and the browser render the
 * same markup and the numbers simply appear once there is something to show.
 */

interface Reading {
  lcp: number | null;
  cls: number | null;
  kb: number;
  requests: number;
}

/** Google's "good" thresholds for Core Web Vitals. */
const GOOD = { lcp: 2500, cls: 0.1 };

function useVitals(): Reading | null {
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    let lcp: number | null = null;
    let cls = 0;
    const observers: PerformanceObserver[] = [];

    const observe = (type: string, cb: (list: PerformanceObserverEntryList) => void) => {
      try {
        const o = new PerformanceObserver(cb);
        o.observe({ type, buffered: true } as PerformanceObserverInit);
        observers.push(o);
      } catch {
        /* Unsupported entry type. The panel degrades to what it can read. */
      }
    };

    observe('largest-contentful-paint', (l) => {
      const entries = l.getEntries();
      lcp = entries[entries.length - 1]?.startTime ?? null;
    });

    observe('layout-shift', (l) => {
      for (const entry of l.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      })[]) {
        if (!entry.hadRecentInput) cls += entry.value;
      }
    });

    const settle = window.setTimeout(() => {
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];
      const nav = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming | undefined;

      const bytes =
        resources.reduce((sum, r) => sum + (r.decodedBodySize || 0), 0) +
        (nav?.decodedBodySize ?? 0);

      setReading({
        lcp: lcp === null ? null : Math.round(lcp),
        cls: +cls.toFixed(3),
        kb: Math.round(bytes / 1024),
        requests: resources.length + 1,
      });
      for (const o of observers) o.disconnect();
    }, 1400);

    return () => {
      window.clearTimeout(settle);
      for (const o of observers) o.disconnect();
    };
  }, []);

  return reading;
}

function Metric({
  label,
  value,
  note,
  good,
}: {
  label: string;
  value: string;
  note: string;
  good?: boolean;
}) {
  return (
    <div className={styles.metric}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {value}
        {good !== undefined && (
          <span
            className={good ? styles.pass : styles.warn}
            aria-label={good ? 'Within Google’s good range' : 'Outside the good range'}
          >
            {good ? 'Good' : 'Check'}
          </span>
        )}
      </span>
      <span className={styles.note}>{note}</span>
    </div>
  );
}

export default function SpeedPanel() {
  const reading = useVitals();

  return (
    <section className={styles.panel} aria-live="polite">
      <header className={styles.head}>
        <h2 className={styles.title}>Measured on your device, just now</h2>
        <p className={styles.intro}>
          Not a screenshot of a score from somewhere else. Your browser timed
          this page as it loaded it, on whatever connection you are on.
        </p>
      </header>

      {reading === null ? (
        <p className={styles.waiting}>Measuring&hellip;</p>
      ) : (
        <div className={styles.grid}>
          <Metric
            label="Time to appear"
            value={
              reading.lcp === null
                ? 'n/a'
                : reading.lcp < 1000
                  ? `${reading.lcp} ms`
                  : `${(reading.lcp / 1000).toFixed(1)} s`
            }
            note={`Google counts anything under ${GOOD.lcp / 1000} seconds as good`}
            good={reading.lcp === null ? undefined : reading.lcp <= GOOD.lcp}
          />
          <Metric
            label="Jumping about"
            value={reading.cls === null ? 'n/a' : reading.cls.toFixed(3)}
            note="Whether things move under your thumb as it loads"
            good={reading.cls === null ? undefined : reading.cls <= GOOD.cls}
          />
          <Metric
            label="Data used"
            value={`${reading.kb} KB`}
            note="What it cost your phone plan to open this"
          />
          <Metric
            label="Files fetched"
            value={String(reading.requests)}
            note="Every one is another round trip on bad signal"
          />
        </div>
      )}

      <p className={styles.footnote}>
        Do not take my word for any of it. Run Google PageSpeed Insights on
        this page, then on any other small business site you can think of, and
        compare the two numbers yourself.
      </p>
    </section>
  );
}
