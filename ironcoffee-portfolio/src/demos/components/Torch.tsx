import { useEffect, useRef } from 'react';
import styles from '../Demo.module.css';

/**
 * Two photographs of the same place, hours apart, with the second revealed
 * under the pointer.
 *
 * Thematically it is the thing a couple actually wants to know about a venue
 * and never gets shown: what it looks like at four in the afternoon and what
 * it looks like at nine at night. Technically it is the cheapest possible
 * version of an effect that reads as expensive, which is the correct trade.
 *
 * Two decisions worth keeping:
 *
 *  - The pointer position is written to a custom property on the element, not
 *    to React state. A state update per pointermove would re-render the hero
 *    sixty times a second to move a gradient; a custom property is handled on
 *    the compositor and costs nothing.
 *  - It only arms for a device with a real pointer. On a phone there is no
 *    hover, so rather than a torch that follows taps, the reveal drifts across
 *    on its own once and settles, which is the same idea without asking
 *    anybody to discover it.
 */
export default function Torch({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    // The listeners go on the hero, not on this element.
    //
    // This layer covers the whole hero, so listening on it meant it had to
    // accept pointer events, and accepting pointer events meant it swallowed
    // every tap aimed at the buttons underneath it. It is now inert
    // (`pointer-events: none` in the stylesheet) and the parent reports the
    // pointer on its behalf, which is the same effect with none of the cost.
    const host = el?.parentElement;
    if (!el || !host) return;

    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || still) return;

    el.dataset.torch = 'on';

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Measured against the torch layer, which is taller than the hero by
        // the overscan the parallax needs, so the circle tracks the cursor
        // rather than drifting away from it down the page.
        const r = el.getBoundingClientRect();
        el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--ty', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };

    const onLeave = () => el.style.setProperty('--tr', '0px');
    const onEnter = () => el.style.removeProperty('--tr');

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerenter', onEnter);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerenter', onEnter);
      delete el.dataset.torch;
    };
  }, []);

  return (
    <div ref={ref} className={styles.torch}>
      {children}
    </div>
  );
}
