import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DemoImage from '../../components/DemoImage';
import styles from '../Public.module.css';

/**
 * A gallery that opens.
 *
 * Three things make the difference between this and a row of thumbnails with a
 * link on each: the overlay is a real dialog, it can be driven entirely from a
 * keyboard, and it can be driven entirely from a thumb. Most venue galleries
 * manage none of the three, which is why people give up and go back to
 * Instagram.
 *
 * Two traps are worth naming, because both are invisible until they bite.
 *
 * The overlay is portaled to <body>. It has to be: `position: fixed` resolves
 * against the nearest transformed ancestor rather than the viewport, and this
 * sits in a page full of scroll-driven transforms, so an overlay left in place
 * would be pinned inside a gallery track instead of covering the screen. The
 * cost is that it leaves the demo's `.root`, where the design tokens are
 * declared, so the two it reads are copied across when it opens. The viewer
 * itself is deliberately neutral, black behind white, because brand color
 * around a photograph is color competing with the photograph.
 *
 * And the portal is only ever created in response to a click, so it never
 * exists during the server render. Calling `createPortal` while prerendering
 * would be an error, not a mismatch.
 */

export interface LightboxImage {
  /** Manifest key, e.g. `demos/wren-hollow/meadow`. */
  name: string;
  caption: string;
  /** Defaults to the caption. Set it when the caption is not a description. */
  alt?: string;
}

export interface LightboxProps {
  /**
   * Manifest keys, or keys with captions. A bare key gets a caption made from
   * its last path segment, which is the right answer for a config that lists
   * `gallery: [...]` and nothing else.
   */
  images: ReadonlyArray<string | LightboxImage>;
  /** Accessible name for the grid of thumbnails. */
  label?: string;
}

/** The tokens the overlay actually reads, once it is no longer inside `.root`. */
const TOKENS = ['--d-font', '--d-radius'] as const;

/** 'demos/wren-hollow/evening light' reads better than 'evening-light'. */
function captionFromKey(key: string): string {
  const last = key.split('/').pop() ?? key;
  const words = last.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** A swipe has to be sideways and mean it, or a scroll would page the gallery. */
const SWIPE_MIN = 45;

export default function Lightbox({ images, label = 'Gallery' }: LightboxProps) {
  const items = useMemo<LightboxImage[]>(
    () =>
      images.map((image) =>
        typeof image === 'string'
          ? { name: image, caption: captionFromKey(image) }
          : image
      ),
    [images]
  );

  const [open, setOpen] = useState<number | null>(null);
  const thumbs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionId = useId();

  const isOpen = open !== null;
  const current = open === null ? null : items[open];

  const close = useCallback(() => {
    const returnTo = open;
    setOpen(null);
    // Focus goes back where it came from, not to the top of the document.
    if (returnTo !== null) thumbs.current[returnTo]?.focus();
  }, [open]);

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length]
  );

  const openAt = (index: number) => {
    const source = gridRef.current;
    if (source) {
      const computed = getComputedStyle(source);
      const copied: Record<string, string> = {};
      for (const token of TOKENS) {
        const value = computed.getPropertyValue(token).trim();
        if (value) copied[token] = value;
      }
      setTokens(copied);
    }
    setOpen(index);
  };

  // Background scroll lock. The previous value is restored rather than cleared,
  // so this cannot quietly unlock a page something else had locked.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Set on the node rather than through `style`, which does not type custom
  // properties without a cast.
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    for (const [token, value] of Object.entries(tokens)) {
      el.style.setProperty(token, value);
    }
  }, [tokens, isOpen]);

  // Focus into the dialog on open only. Stepping through images must not yank
  // focus off the next button the visitor is pressing.
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  /* Keys are heard on the document while the viewer is open, not on the
     dialog. A click on the photograph or the dark stage lands on something
     that is not focusable, and in Safari a click on a button does not focus
     it either, so a handler on the dialog would go deaf the moment anybody
     used a mouse and then reached for the arrow keys. */
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
      return;
    }
    if (event.key !== 'Tab') return;

    // The trap. Everything focusable in here is a button, so the query stays
    // this short; widen it if the dialog ever grows a link or a field.
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])'
      ) ?? []
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    const inside = active !== dialogRef.current && dialogRef.current?.contains(active);

    if (!inside) {
      // Focus is on the dialog itself or has escaped it: bring it back in.
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // The latest handler, read through a ref so the listener is attached once
  // per opening rather than on every render.
  const keyHandler = useRef(onKeyDown);
  useEffect(() => {
    keyHandler.current = onKeyDown;
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    const listener = (event: KeyboardEvent) => keyHandler.current(event);
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [isOpen]);

  const overlay =
    open === null || current === null ? null : (
      <div
        className={styles.overlay}
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className={styles.dialog}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={captionId}
          // Focusable by script and by click, never by Tab, so a click on
          // the photograph keeps focus inside the dialog instead of
          // dropping it to <body>.
          tabIndex={-1}
        >
          <div className={styles.bar}>
            <p className={styles.counter}>
              {open + 1} of {items.length}
            </p>
            <button
              type="button"
              className={styles.close}
              ref={closeRef}
              onClick={close}
            >
              <span aria-hidden="true">&times;</span>
              <span className={styles.sr}>Close gallery</span>
            </button>
          </div>

          <div
            className={styles.stage}
            onPointerDown={(e) => {
              swipe.current = { x: e.clientX, y: e.clientY };
            }}
            onPointerUp={(e) => {
              const start = swipe.current;
              swipe.current = null;
              if (!start) return;
              const dx = e.clientX - start.x;
              const dy = e.clientY - start.y;
              if (Math.abs(dx) < SWIPE_MIN || Math.abs(dy) > Math.abs(dx)) return;
              step(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              swipe.current = null;
            }}
          >
            <button
              type="button"
              className={styles.arrow}
              onClick={() => step(-1)}
            >
              <span aria-hidden="true">&lsaquo;</span>
              <span className={styles.sr}>Previous photo</span>
            </button>

            <figure className={styles.figure}>
              <DemoImage
                key={current.name}
                name={current.name}
                alt={current.alt ?? current.caption}
                sizes="(min-width: 60rem) 60rem, 100vw"
              />
            </figure>

            <button
              type="button"
              className={styles.arrow}
              onClick={() => step(1)}
            >
              <span aria-hidden="true">&rsaquo;</span>
              <span className={styles.sr}>Next photo</span>
            </button>
          </div>

          <p className={styles.caption} id={captionId} aria-live="polite">
            {current.caption}
          </p>
        </div>
      </div>
    );

  if (items.length === 0) return null;

  return (
    <>
      <ul className={styles.grid} ref={gridRef} aria-label={label}>
        {items.map((item, i) => (
          <li key={item.name}>
            <button
              type="button"
              className={styles.thumb}
              aria-label={`View ${item.caption}`}
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              onClick={() => openAt(i)}
            >
              <span className={styles.thumbFrame}>
                <DemoImage
                  name={item.name}
                  alt={item.alt ?? item.caption}
                  sizes="(min-width: 60rem) 20rem, 45vw"
                />
              </span>
              <span className={styles.thumbCap} aria-hidden="true">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {overlay && createPortal(overlay, document.body)}
    </>
  );
}
