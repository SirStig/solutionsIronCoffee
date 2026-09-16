/**
 * The two pieces of chrome more than one view needs.
 *
 * The drawer is the only thing here with real machinery in it. A back office
 * gets driven from the keyboard by whoever uses it every day, so an overlay
 * that cannot be closed with Escape, or that drops focus back to the top of
 * the document when it goes, is broken in the way that costs the most time.
 */
import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react';
import { X } from 'lucide-react';
import type { BookingStatus } from '../data';
import s from '../Admin.module.css';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/** Focusable children that are actually on screen. A hidden control is not a stop. */
function focusableIn(node: HTMLElement): HTMLElement[] {
  return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0
  );
}

export const STATUS_LABEL: Record<BookingStatus, string> = {
  free: 'Free',
  held: 'On hold',
  confirmed: 'Confirmed',
  closed: 'Not offered',
};

export function StatusPill({ status }: { status: BookingStatus }) {
  return <span className={`${s.pill} ${s[`pill_${status}`]}`}>{STATUS_LABEL[status]}</span>;
}

export function Drawer({
  title,
  meta,
  onClose,
  returnFocusTo,
  children,
  footer,
}: {
  title: string;
  /** One line under the title: a date, a state, whatever identifies the record. */
  meta?: ReactNode;
  onClose: () => void;
  /**
   * Where focus goes if the control that opened the drawer is gone by the time
   * it closes. Working an enquiry moves it out of the filter you opened it
   * from, so that happens on the most ordinary path through the screen.
   */
  returnFocusTo?: RefObject<HTMLElement | null>;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Kept in a ref so a caller passing a fresh arrow function on every render
  // does not tear down the trap and yank focus back to the top of the panel.
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    const node = panel.current;
    if (!node) return undefined;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // The panel itself, not the first button, so the heading is read first.
    node.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const stops = focusableIn(node);
      if (stops.length === 0) {
        event.preventDefault();
        node.focus();
        return;
      }
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && (active === first || active === node)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    // Lock the page behind the drawer, and pay back the width of the scrollbar
    // that locking it removes. Without the padding the whole page jumps left
    // as the drawer opens.
    const bodyOverflow = document.body.style.overflow;
    const bodyPad = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = bodyOverflow;
      document.body.style.paddingRight = bodyPad;
      const back = opener && document.contains(opener) ? opener : returnFocusTo?.current;
      back?.focus();
    };
  }, [returnFocusTo]);

  return (
    <div className={s.overlay}>
      {/* Clicking away closes. The labeled button in the header is the
          keyboard path, so this one stays out of the accessibility tree. */}
      <div className={s.scrim} aria-hidden="true" onClick={onClose} />
      <div
        className={s.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panel}
      >
        <header className={s.drawerHead}>
          <div>
            <h3 className={s.drawerTitle} id={titleId}>
              {title}
            </h3>
            {meta && <p className={s.drawerMeta}>{meta}</p>}
          </div>
          <button type="button" className={s.iconBtn} onClick={onClose}>
            <X size={18} aria-hidden="true" />
            <span className={s.srOnly}>Close</span>
          </button>
        </header>
        <div className={s.drawerBody}>{children}</div>
        {footer && <footer className={s.drawerFoot}>{footer}</footer>}
      </div>
    </div>
  );
}

/** A label and a value, the shape every detail panel on this screen repeats. */
export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.fact}>
      <dt className={s.factKey}>{label}</dt>
      <dd className={s.factVal}>{children}</dd>
    </div>
  );
}
