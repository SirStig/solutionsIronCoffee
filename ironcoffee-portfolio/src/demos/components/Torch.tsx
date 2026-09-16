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
    if (!el) return;

    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || still) return;

    el.dataset.torch = 'on';

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--ty', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };

    const onLeave = () => {
      el.style.setProperty('--tr', '0%');
    };
    const onEnter = () => {
      el.style.removeProperty('--tr');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerenter', onEnter);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerenter', onEnter);
      delete el.dataset.torch;
    };
  }, []);

  return (
    <div ref={ref} className={styles.torch}>
      {children}
    </div>
  );
}
