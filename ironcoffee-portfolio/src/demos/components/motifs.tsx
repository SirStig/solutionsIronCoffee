import { useId, type ReactNode } from 'react';

/**
 * A signature mark, tiled.
 *
 * Every business gets one small drawing that repeats: grain heads for a feed
 * store, blades for a lawn crew, shears for a barber. It runs at low contrast
 * behind the deep bands on the page, the way a letterhead has something
 * printed under the type.
 *
 * It exists because of a specific failure. The statement band paints a photo
 * across the full width of the screen at about 4:1, and a scene composed for
 * a 4:3 frame gets cropped to a detail of itself: the lawn sample showed the
 * middle nine inches of a mower, which read as a beige lump. The honest fix
 * was not a wider drawing. It was noticing that the band never wanted a
 * picture, it wanted a surface, and a surface is a tile.
 *
 * Tiles are authored on a 120 unit square and have to work rotated and offset,
 * which is why none of them has an up. A motif with a top edge reads as
 * wallpaper hung wrong the moment the band changes height.
 */

type Tile = ReactNode;

const tiles: Record<string, Tile> = {
  /* --- Grain. Feed stores, mills, anything agricultural. ---------------- */
  wheat: (
    <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
      <path d="M30 96 L30 42" />
      <path d="M30 46 q-13 -9 -13 -21 q13 3 13 21 M30 46 q13 -9 13 -21 q-13 3 -13 21" />
      <path d="M30 62 q-13 -9 -13 -21 q13 3 13 21 M30 62 q13 -9 13 -21 q-13 3 -13 21" />
      <path d="M90 108 L90 54" />
      <path d="M90 58 q-13 -9 -13 -21 q13 3 13 21 M90 58 q13 -9 13 -21 q-13 3 -13 21" />
      <path d="M90 74 q-13 -9 -13 -21 q13 3 13 21 M90 74 q13 -9 13 -21 q-13 3 -13 21" />
    </g>
  ),

  /* --- Cut grass. --------------------------------------------------------- */
  blades: (
    <g fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round">
      <path d="M22 100 q-4 -34 10 -54 M34 100 q8 -30 2 -50" />
      <path d="M78 64 q-4 -34 10 -54 M90 64 q8 -30 2 -50" />
      <path d="M58 120 q10 -28 -2 -46" />
    </g>
  ),

  /* --- Shears. Barbers and salons, turned so they never line up. -------- */
  shears: (
    <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
      <g transform="translate(34 34) rotate(-24)">
        <circle cx="-16" cy="-14" r="7" />
        <circle cx="-16" cy="14" r="7" />
        <path d="M-10 -10 L24 16 M24 -16 L-10 10" />
      </g>
      <g transform="translate(92 92) rotate(64)">
        <circle cx="-16" cy="-14" r="7" />
        <circle cx="-16" cy="14" r="7" />
        <path d="M-10 -10 L24 16 M24 -16 L-10 10" />
      </g>
    </g>
  ),

  /* --- Bottles. ---------------------------------------------------------- */
  bottles: (
    <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round">
      <path d="M24 100 v-30 q0 -12 7 -19 v-15 h10 v15 q7 7 7 19 v30 Z" />
      <path d="M78 66 v-26 q0 -11 6 -17 v-13 h9 v13 q6 6 6 17 v26 Z" />
      <path d="M62 120 v-18 q0 -10 6 -16" />
    </g>
  ),

  /* --- Pines. The country half of a country salon. ---------------------- */
  pines: (
    <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round">
      <path d="M32 82 L44 46 L56 82 Z M38 64 L44 50 L50 64" />
      <path d="M44 82 v12" strokeLinecap="round" />
      <path d="M86 40 L96 12 L106 40 Z" />
      <path d="M96 40 v10" strokeLinecap="round" />
      <path d="M74 118 L84 92 L94 118 Z" />
    </g>
  ),
};

export function hasMotif(name: string | undefined): name is string {
  return Boolean(name && name in tiles);
}

/**
 * The motif as a full-bleed surface.
 *
 * Sized in CSS pixels rather than as a fraction of the box, so the mark stays
 * the same size on a phone and on a 2560 monitor instead of turning into
 * either confetti or wallpaper. `--motif-size` overrides it per placement.
 */
export default function MotifField({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const reactId = useId();
  const id = `m${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const tile = tiles[name];
  if (!tile) return null;

  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id={id}
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-12)"
        >
          {tile}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
