import { useId, type ReactNode } from 'react';
import type { Category } from '../content/projects';

/**
 * One drawn mark per project category.
 *
 * The work page groups ten projects under four headings, and with nothing but
 * type to separate them it reads as a single long column with some bold words
 * in it. A drawing per section fixes that faster than any amount of spacing:
 * a handset for apps, a branch for open source, a d-pad for games, a window
 * for client work.
 *
 * Two forms, because they do different jobs.
 *
 * `mark` is one centered glyph that has to survive at 24 pixels inside the
 * badge, so it is drawn upright on a 48 unit square with the stroke weight
 * that size wants.
 *
 * `tile` is the same idea as texture, repeated behind the heading band. It
 * follows the rules the demo motifs follow: authored on a 120 unit square,
 * with nothing that has an up. A tile with a top edge reads as wallpaper hung
 * wrong the moment the band changes height, and this band changes height on
 * every breakpoint.
 *
 * Both draw in `currentColor` and set no size of their own, so a placement
 * decides both from CSS.
 */

const marks: Record<Category, ReactNode> = {
  /* --- A handset, because every app here shipped to a phone first. ------- */
  apps: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="15" y="6" width="18" height="36" rx="5" />
      <path d="M21 11.5 h6" />
      <path d="M20 36.5 h8" />
    </g>
  ),

  /* --- A branch. Two commits and somebody else's fork. ------------------- */
  'open-source': (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 16.5 V31.5" />
      <path d="M16 28 C16 20 23 16.5 29.5 16" />
      <circle cx="16" cy="12" r="4.5" />
      <circle cx="16" cy="36" r="4.5" />
      <circle cx="34" cy="16" r="4.5" />
    </g>
  ),

  /* --- A d-pad and two buttons, drawn as a controller would wear them. --- */
  games: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 20 h6 v-6 h8 v6 h6 v8 h-6 v6 h-8 v-6 h-6 Z" />
      <circle cx="37" cy="19" r="3" />
      <circle cx="37" cy="29" r="3" />
    </g>
  ),

  /* --- A window. Client work is somebody else's site, not mine. --------- */
  client: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="10" width="36" height="28" rx="4.5" />
      <path d="M6 18.5 H42" />
      <g fill="currentColor" stroke="none">
        <circle cx="11.5" cy="14.2" r="1.3" />
        <circle cx="16" cy="14.2" r="1.3" />
        <circle cx="20.5" cy="14.2" r="1.3" />
      </g>
    </g>
  ),
};

const tiles: Record<Category, ReactNode> = {
  apps: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(30 34) rotate(-18)">
        <rect x="-9" y="-17" width="18" height="34" rx="5" />
        <path d="M-3 -12 h6" />
      </g>
      <g transform="translate(88 88) rotate(24)">
        <rect x="-9" y="-17" width="18" height="34" rx="5" />
        <path d="M-3 -12 h6" />
      </g>
      <g transform="translate(112 10) rotate(-44)">
        <rect x="-7" y="-13" width="14" height="26" rx="4" />
      </g>
    </g>
  ),

  'open-source': (
    <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
      <path d="M22 18 V64" />
      <path d="M22 40 q0 -14 15 -18" />
      <circle cx="22" cy="12" r="5.5" />
      <circle cx="22" cy="70" r="5.5" />
      <circle cx="42" cy="20" r="5.5" />
      <path d="M84 60 V106" />
      <path d="M84 82 q0 -14 15 -18" />
      <circle cx="84" cy="54" r="5.5" />
      <circle cx="84" cy="112" r="5.5" />
      <circle cx="104" cy="62" r="5.5" />
    </g>
  ),

  games: (
    <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round">
      <g transform="translate(34 36) rotate(-15)">
        <path d="M-16 -5 H-5 V-16 H5 V-5 H16 V5 H5 V16 H-5 V5 H-16 Z" />
      </g>
      <g transform="translate(92 94) rotate(28)">
        <path d="M-16 -5 H-5 V-16 H5 V-5 H16 V5 H5 V16 H-5 V5 H-16 Z" />
      </g>
      <circle cx="94" cy="24" r="6" />
      <circle cx="112" cy="40" r="6" />
      <circle cx="12" cy="98" r="6" />
    </g>
  ),

  client: (
    <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round">
      <g transform="translate(34 32) rotate(-14)">
        <rect x="-22" y="-16" width="44" height="32" rx="5" />
        <path d="M-22 -7 H22" />
      </g>
      <g transform="translate(94 96) rotate(20)">
        <rect x="-22" y="-16" width="44" height="32" rx="5" />
        <path d="M-22 -7 H22" />
      </g>
    </g>
  ),
};

/** The single glyph, upright, for a badge or a legend. */
export function CategoryMark({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      {marks[category]}
    </svg>
  );
}

/**
 * The tile as a surface that fills its positioned parent.
 *
 * The pattern is sized in user units against a userSpaceOnUse grid rather than
 * as a fraction of the box, so the mark comes out the same size on a phone and
 * on a 27 inch monitor instead of turning into either confetti or wallpaper.
 */
export function CategoryField({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  // useId emits colons, which are legal in an id but not in a url() reference
  // without escaping, so strip everything that is not alphanumeric.
  const id = `cf${useId().replace(/[^a-zA-Z0-9]/g, '')}${category.replace('-', '')}`;

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
          {tiles[category]}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
