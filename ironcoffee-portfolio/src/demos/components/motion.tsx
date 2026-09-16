import type { ReactNode } from 'react';
import styles from '../Demo.module.css';

/**
 * Scroll-driven presentation, in CSS only.
 *
 * Everything in this file compiles down to `animation-timeline`, which the
 * browser runs off the scroller rather than off a rAF loop. There is no
 * IntersectionObserver, no scroll listener and no JavaScript of any kind, so
 * none of it can jank, none of it blocks the main thread, and all of it works
 * on a page that has finished prerendering before React ever hydrates.
 *
 * Three rules hold the whole thing together.
 *
 * One: the starting state lives inside `@supports (animation-timeline: view())`
 * in the stylesheet, never outside it. Written the usual way, a browser
 * without support would apply `opacity: 0` and then wait forever for an
 * animation that will not run, and the page would be blank. Here, no support
 * means no starting state, which means the finished state, which is the page.
 *
 * Two: nothing moves for anyone who has asked their system to stop moving
 * things. `prefers-reduced-motion` switches every animation off.
 *
 * Three: nothing here changes layout. Transforms and opacity only, so none of
 * it can contribute to layout shift no matter how it lands.
 */

/** Fades and lifts as it comes into view. */
export function Rise({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  /** 1, 2 or 3. Staggers siblings so a row does not arrive as one slab. */
  delay?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={[
        styles.rise,
        delay && styles[`riseDelay${delay}` as const],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

/**
 * A photograph that drifts inside its own frame as the page scrolls past.
 *
 * The image is deliberately taller than the frame so there is somewhere for it
 * to go; without the overscan the parallax would pull a blank edge into view.
 */
export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.parallax, className].filter(Boolean).join(' ')}>
      <div className={styles.parallaxInner}>{children}</div>
    </div>
  );
}

/** A word or line revealed one part at a time, on load rather than on scroll. */
export function Reveal({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className={styles.revealLine}>
          <span
            className={styles.revealInner}
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}
