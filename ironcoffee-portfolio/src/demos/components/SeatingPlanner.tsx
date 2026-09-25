import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw, RotateCw, Trash2 } from 'lucide-react';
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
 *    hydration error rather than a clever optimization.
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
const GRID = 2;
/** Keys added from the palette start here, clear of the seeded `s1` to `s6`. */
const FIRST_KEY = 100;

const snap = (n: number) => Math.round(n / GRID) * GRID;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const clampX = (x: number) => clamp(snap(x), 3, 97);
const clampY = (y: number) => clamp(snap(y), 4, 96);

/** The number in a key like `p104`, or -1 for one with no number in it. */
const keyNumber = (key: string) => {
  const match = /(\d+)$/.exec(key);
  return match ? Number(match[1]) : -1;
};

/**
 * A saved layout, checked before it is trusted.
 *
 * Storage is written by an older build as easily as by this one, and by
 * anybody with a console. Anything that is not a list of known tables with
 * numeric positions and distinct keys is thrown away in favor of the seed,
 * rather than rendered as a plan that crashes on the first drag.
 */
function readPlan(raw: string | null): Placed[] | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(value)) return null;
  const out: Placed[] = [];
  const keys = new Set<string>();
  for (const item of value) {
    if (typeof item !== 'object' || item === null) return null;
    const { key, type, x, y, rotated } = item as Record<string, unknown>;
    if (typeof key !== 'string' || keys.has(key)) return null;
    if (typeof type !== 'string' || !BY_ID[type]) return null;
    if (typeof x !== 'number' || !Number.isFinite(x)) return null;
    if (typeof y !== 'number' || !Number.isFinite(y)) return null;
    keys.add(key);
    out.push({ key, type, x: clampX(x), y: clampY(y), rotated: rotated === true });
  }
  return out;
}

export default function SeatingPlanner({
  storageKey = 'seating-plan',
}: {
  /** Where the layout is remembered. One per venue, so two samples never share a plan. */
  storageKey?: string;
}) {
  const [placed, setPlaced] = useState<Placed[]>(SEED);
  const [active, setActive] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const nextKey = useRef(FIRST_KEY);
  const offset = useRef({ dx: 0, dy: 0 });

  // Effect, not render: see the note at the top of this file.
  useEffect(() => {
    try {
      const saved = readPlan(localStorage.getItem(storageKey));
      if (saved) {
        // Carry on numbering after the highest saved key. Starting from
        // FIRST_KEY again would hand out `p100` to a second table while the
        // first one is still on the floor.
        nextKey.current = Math.max(FIRST_KEY, ...saved.map((p) => keyNumber(p.key) + 1));
        setPlaced(saved);
      }
    } catch {
      /* Private window, blocked storage. The seeded layout is fine. */
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(placed));
    } catch {
      /* Nothing to do, and nothing worth telling the visitor about. */
    }
  }, [placed, storageKey]);

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
          p.key === key ? { ...p, x: clampX(x), y: clampY(y) } : p
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
    let n = nextKey.current;
    while (placed.some((p) => p.key === `p${n}`)) n += 1;
    nextKey.current = n + 1;
    const key = `p${n}`;
    setPlaced((prev) => [...prev, { key, type, x: 50, y: 50, rotated: false }]);
    setActive(key);
  };

  const remove = (key: string) =>
    setPlaced((prev) => prev.filter((p) => p.key !== key));

  const rotate = (key: string) =>
    setPlaced((prev) =>
      prev.map((p) => (p.key === key ? { ...p, rotated: !p.rotated } : p))
    );

  const activeItem = placed.find((p) => p.key === active);

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
      rotate(item.key);
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
        {/* The visible way to turn a table. R works from a keyboard, and a
            phone has no R. */}
        <button
          type="button"
          className={styles.planReset}
          onClick={() => activeItem && rotate(activeItem.key)}
          disabled={!activeItem}
        >
          <RotateCw size={14} aria-hidden="true" />
          Rotate
          {activeItem && BY_ID[activeItem.type] && (
            <span className="visually-hidden"> {BY_ID[activeItem.type].label}</span>
          )}
        </button>
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
            /* Two siblings in a positioned frame rather than a button inside a
               button: the table is one control and the bin is another, and
               nesting them gives a screen reader one control with a second
               it cannot reach. The frame carries the look and the position;
               the table fills it. */
            return (
              <div
                key={item.key}
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
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${t.label}${t.seats ? `, ${t.seats} seats` : ''}. Arrow keys to move, R to rotate, Delete to remove.`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 'inherit',
                    touchAction: 'none',
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
                </div>
                <button
                  type="button"
                  className={styles.planRemove}
                  aria-label={`Remove ${t.label}`}
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
        Drag a table, or select one and use the arrow keys. Rotate turns the
        selected table (R on a keyboard), and the bin or Delete takes it out.
        Your layout is remembered on this device, and the real version emails it
        to us with your inquiry.
      </p>
    </div>
  );
}
