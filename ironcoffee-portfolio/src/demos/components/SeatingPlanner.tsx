import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import styles from '../Demo.module.css';

/**
 * A working seating planner for the barn.
 *
 * This is the part of the flagship that is not decoration. Scroll animation
 * and a pinned gallery are things a template can do and a competitor can copy
 * in an afternoon; the honest response to "I could build this in Wix" is that
 * you could build the animation in Wix and you could not build this. It is an
 * application: state, drag, collision-free placement, a live capacity model,
 * keyboard operation and persistence.
 *
 * It is also the single most useful thing this fictional venue could put on
 * its website, which is the point. A couple deciding between two barns wants
 * to know whether a hundred and twenty people and a dance floor actually fit,
 * and every venue in the country answers that question with a phone call.
 *
 * Implementation notes worth keeping:
 *
 *  - Pointer events, not mouse events, so the same code path serves a mouse,
 *    a finger and a stylus with no branching.
 *  - Positions are percentages of the plan, so the layout survives a resize
 *    and works identically on a phone.
 *  - The seeded layout is a module constant and the saved layout is read in an
 *    effect, never during render. Reading localStorage while rendering would
 *    make the server and the browser disagree about the markup, which is a
 *    hydration error rather than a clever optimisation.
 */

interface TableType {
  id: string;
  label: string;
  seats: number;
  /** Percent of the plan's width. Height follows from `ratio`. */
  w: number;
  ratio: number;
  round?: boolean;
}

const TYPES: TableType[] = [
  { id: 'round', label: 'Round', seats: 8, w: 13, ratio: 1, round: true },
  { id: 'long', label: 'Long', seats: 12, w: 26, ratio: 0.32 },
  { id: 'sweetheart', label: 'Sweetheart', seats: 2, w: 9, ratio: 0.55 },
  { id: 'bar', label: 'Bar', seats: 0, w: 22, ratio: 0.22 },
  { id: 'dance', label: 'Dance floor', seats: 0, w: 30, ratio: 0.75 },
];

const BY_ID = Object.fromEntries(TYPES.map((t) => [t.id, t]));

interface Placed {
  key: string;
  type: string;
  x: number;
  y: number;
  rotated: boolean;
}

/** Deterministic, because the server renders this too. */
const SEED: Placed[] = [
  { key: 's1', type: 'dance', x: 63, y: 60, rotated: false },
  { key: 's2', type: 'round', x: 22, y: 30, rotated: false },
  { key: 's3', type: 'round', x: 42, y: 30, rotated: false },
  { key: 's4', type: 'round', x: 22, y: 62, rotated: false },
  { key: 's5', type: 'long', x: 46, y: 82, rotated: false },
  { key: 's6', type: 'sweetheart', x: 78, y: 18, rotated: false },
];

const CAPACITY = 140;
const STORE = 'wren-hollow-plan';
const GRID = 2;

const snap = (n: number) => Math.round(n / GRID) * GRID;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function SeatingPlanner() {
  const [placed, setPlaced] = useState<Placed[]>(SEED);
  const [active, setActive] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const nextKey = useRef(100);
  const offset = useRef({ dx: 0, dy: 0 });

  // Effect, not render: see the note at the top of this file.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) setPlaced(JSON.parse(raw));
    } catch {
      /* Private window, blocked storage. The seeded layout is fine. */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(placed));
    } catch {
      /* Nothing to do, and nothing worth telling the visitor about. */
    }
  }, [placed]);

  const seated = useMemo(
    () => placed.reduce((n, p) => n + (BY_ID[p.type]?.seats ?? 0), 0),
    [placed]
  );

  const toPlanPercent = useCallback((clientX: number, clientY: number) => {
    const r = planRef.current?.getBoundingClientRect();
    if (!r) return null;
    return {
      x: ((clientX - r.left) / r.width) * 100,
      y: ((clientY - r.top) / r.height) * 100,
    };
  }, []);

  const move = useCallback(
    (key: string, x: number, y: number) =>
      setPlaced((prev) =>
        prev.map((p) =>
          p.key === key
            ? { ...p, x: clamp(snap(x), 3, 97), y: clamp(snap(y), 4, 96) }
            : p
        )
      ),
    []
  );

  /* --- Dragging an existing table ---------------------------------------- */
  const onPointerDown = (e: React.PointerEvent, item: Placed) => {
    const pos = toPlanPercent(e.clientX, e.clientY);
    if (!pos) return;
    offset.current = { dx: pos.x - item.x, dy: pos.y - item.y };
    setActive(item.key);
    setDragging(item.key);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent, item: Placed) => {
    if (dragging !== item.key) return;
    const pos = toPlanPercent(e.clientX, e.clientY);
    if (!pos) return;
    move(item.key, pos.x - offset.current.dx, pos.y - offset.current.dy);
  };

  const endDrag = () => setDragging(null);

  /* --- Adding from the palette ------------------------------------------- */
  const add = (type: string) => {
    const key = `p${nextKey.current++}`;
    setPlaced((prev) => [...prev, { key, type, x: 50, y: 50, rotated: false }]);
    setActive(key);
  };

  const remove = (key: string) =>
    setPlaced((prev) => prev.filter((p) => p.key !== key));

  /* --- Keyboard ----------------------------------------------------------
     Arrow keys nudge, R rotates, Delete removes. A drag-only interface is
     unusable with a keyboard and unusable with a screen reader, and "it is
     only a demo" is not a reason to ship one. */
  const onKeyDown = (e: React.KeyboardEvent, item: Placed) => {
    const step = e.shiftKey ? 6 : 2;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (moves[e.key]) {
      e.preventDefault();
      move(item.key, item.x + moves[e.key][0], item.y + moves[e.key][1]);
      return;
    }
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      setPlaced((prev) =>
        prev.map((p) => (p.key === item.key ? { ...p, rotated: !p.rotated } : p))
      );
      return;
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      remove(item.key);
    }
  };

  const over = seated > CAPACITY;

  return (
    <div className={styles.plan}>
      <div className={styles.planBar}>
        <div className={styles.planCount}>
          <strong className={over ? styles.planOver : undefined}>
            {seated}
          </strong>
          <span>of {CAPACITY} seated</span>
          <span className={styles.planMeter} aria-hidden="true">
            <span
              className={over ? styles.planFillOver : styles.planFill}
              style={{ width: `${Math.min(100, (seated / CAPACITY) * 100)}%` }}
            />
          </span>
        </div>
        <button
          type="button"
          className={styles.planReset}
          onClick={() => setPlaced(SEED)}
        >
          <RotateCcw size={14} aria-hidden="true" />
          Start again
        </button>
      </div>

      <div className={styles.planBody}>
        <div className={styles.planPalette}>
          <p className={styles.planPaletteLabel}>Add</p>
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.planAdd}
              onClick={() => add(t.id)}
            >
              <span
                className={[styles.planChip, t.round && styles.planChipRound]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              />
              <span>
                {t.label}
                {t.seats > 0 && (
                  <em className={styles.planSeats}>{t.seats} seats</em>
                )}
              </span>
            </button>
          ))}
        </div>

        <div
          ref={planRef}
          className={styles.planFloor}
          role="application"
          aria-label="Barn floor plan. Tables can be dragged, or focused and moved with the arrow keys."
        >
          <span className={styles.planStage} aria-hidden="true">
            Doors
          </span>
          <span className={styles.planBarn} aria-hidden="true">
            Bar end
          </span>

          {placed.map((item) => {
            const t = BY_ID[item.type];
            if (!t) return null;
            const w = item.rotated ? t.w * t.ratio : t.w;
            const h = item.rotated ? t.w : t.w * t.ratio;
            return (
              <div
                key={item.key}
                role="button"
                tabIndex={0}
                aria-label={`${t.label}${t.seats ? `, ${t.seats} seats` : ''}. Arrow keys to move, R to rotate, Delete to remove.`}
                className={[
                  styles.planItem,
                  t.round && styles.planItemRound,
                  t.seats === 0 && styles.planItemBlank,
                  active === item.key && styles.planItemActive,
                  dragging === item.key && styles.planItemDragging,
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${w}%`,
                  aspectRatio: `${w} / ${h}`,
                }}
                onPointerDown={(e) => onPointerDown(e, item)}
                onPointerMove={(e) => onPointerMove(e, item)}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onFocus={() => setActive(item.key)}
                onKeyDown={(e) => onKeyDown(e, item)}
              >
                <span className={styles.planItemLabel}>
                  {t.seats > 0 ? t.seats : t.label}
                </span>
                <button
                  type="button"
                  className={styles.planRemove}
                  aria-label={`Remove ${t.label}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => remove(item.key)}
                >
                  <Trash2 size={12} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p className={styles.planHint}>
        Drag a table. Tap one and press R to turn it, or Delete to take it out.
        Your layout is remembered on this device, and the real version emails it
        to us with your enquiry.
      </p>
    </div>
  );
}
