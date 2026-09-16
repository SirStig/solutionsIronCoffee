import type { SVGProps } from 'react';

/**
 * A hand-drawn icon set for the demo templates.
 *
 * Every glyph is authored on the same 24 unit grid with a 1.7 stroke, round
 * caps and round joins, so a smoker and a tooth sit together without one
 * looking heavier than the other. They are drawn here rather than pulled from
 * a library because a roofing site and a feed store need a roof and a sack of
 * grain, and a generic icon pack is precisely what makes a template look like
 * a template.
 *
 * Configs reference them by name, so adding an icon to a service is a string
 * in a data file, never a component edit.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const paths: Record<string, React.ReactNode> = {
  /* --- Food ------------------------------------------------------------- */
  flame: (
    <>
      <path d="M12 3c.6 2.6 2.2 3.6 3.4 5.2A6 6 0 1 1 6 12c0-1.7.7-3 1.8-4 .2 1.2.9 2 1.9 2.2-.3-3 .9-5.6 2.3-7.2Z" />
      <path d="M12 20a2.8 2.8 0 0 0 2.8-2.8c0-1.6-1.3-2.4-2.8-4.2-1.5 1.8-2.8 2.6-2.8 4.2A2.8 2.8 0 0 0 12 20Z" />
    </>
  ),
  smoker: (
    <>
      <rect x="3" y="10" width="14" height="8" rx="2.4" />
      <path d="M17 13h2.2a1.8 1.8 0 0 1 1.8 1.8V18" />
      <path d="M6 18v3M14 18v3" />
      <path d="M8 7c0-1.2 1.4-1.2 1.4-2.4S8 2.2 8 2.2" />
      <path d="M12.6 7c0-1.2 1.4-1.2 1.4-2.4s-1.4-2.4-1.4-2.4" />
    </>
  ),
  slice: (
    <>
      <path d="M3 14.5 15.5 4.2c1.2-1 2.6-1.4 3.4-.6.9.9.4 2.4-.7 3.7L9.4 18.2Z" />
      <path d="M8.6 17.4 6.2 19.8a2 2 0 0 1-2.8-2.8l2.2-2.2" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
    </>
  ),
  box: (
    <>
      <path d="M3 8.2 12 4l9 4.2v7.6L12 20l-9-4.2Z" />
      <path d="M3 8.2 12 12.5l9-4.3M12 12.5V20" />
    </>
  ),
  drumstick: (
    <>
      <path d="M19 5a4.4 4.4 0 0 0-7.3 3.3c0 1.4-.4 2.2-1.3 3.1l-1.1 1.1a3.4 3.4 0 1 0 2.9 2.9l1.1-1.1c.9-.9 1.7-1.3 3.1-1.3A4.4 4.4 0 0 0 19 5Z" />
      <path d="M8.6 15.4 4.4 19.6" />
      <path d="M6.6 17.4 3.4 20.6" />
    </>
  ),

  /* --- Booking ---------------------------------------------------------- */
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8 7.6 20 18M20 6 8 16.4" />
    </>
  ),
  comb: (
    <>
      <rect x="3" y="7" width="18" height="4.2" rx="1.4" />
      <path d="M6 11.2V17M9.6 11.2V17M13.2 11.2V17M16.8 11.2V17" />
    </>
  ),
  razor: (
    <>
      <path d="M3.2 12.4 13.6 2a2 2 0 0 1 2.8 2.8L6 15.2Z" />
      <path d="M6 15.2h11a3.5 3.5 0 0 1 0 7H8.5" />
    </>
  ),
  chair: (
    <>
      <path d="M6.5 11.5h11v3a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z" />
      <path d="M7.5 11.5V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5.5" />
      <path d="M12 16.5V19M8 21h8" />
      <path d="M17.5 13.5h2.2v3.2" />
    </>
  ),
  brush: (
    <>
      <path d="M9 14 4.8 18.2A2.5 2.5 0 0 0 8.4 21.8L12.6 17.6" />
      <path d="M11.5 15.5 19 8a2.8 2.8 0 0 0-4-4l-7.5 7.5Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9Z" />
      <path d="M18.5 16.5 19.2 18.6l2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7Z" />
    </>
  ),

  /* --- Trades ----------------------------------------------------------- */
  roof: (
    <>
      <path d="M2.5 12 12 4.5 21.5 12" />
      <path d="M5.5 11.2V19h13v-7.8" />
      <path d="M9.5 19v-4.6h5V19" />
    </>
  ),
  gutter: (
    <>
      <path d="M2.5 9.5 12 3.5l9.5 6" />
      <path d="M4.5 12.5h13a1.5 1.5 0 0 0 1.5-1.5" />
      <path d="M4.5 12.5v-1.5" />
      <path d="M17.5 12.5V16a2 2 0 0 0 2 2h.5v3" />
    </>
  ),
  hammer: (
    <>
      <path d="M13.5 6.5 9.8 2.8 6 6.5l3.7 3.7Z" />
      <path d="M11.6 8.6 3.5 16.7a2.5 2.5 0 0 0 3.5 3.5l8.1-8.1" />
      <path d="M14.5 5.5 21 12l-3 3-6.5-6.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19.5 6v6c0 4.2-3 7.4-7.5 9-4.5-1.6-7.5-4.8-7.5-9V6Z" />
      <path d="M9 12.2 11.2 14.4 15.4 10.2" />
    </>
  ),
  storm: (
    <>
      <path d="M7 15.5a4 4 0 0 1 .4-8 5.5 5.5 0 0 1 10.5 1.6 3.5 3.5 0 0 1-.4 6.9" />
      <path d="M12.5 12.5 10 17h3.4l-2 4" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 7h11v9h-11Z" />
      <path d="M13.5 10.5H17l3.5 3.2V16h-7Z" />
      <circle cx="7" cy="18" r="1.9" />
      <circle cx="17" cy="18" r="1.9" />
    </>
  ),

  /* --- Professional ----------------------------------------------------- */
  tooth: (
    <>
      <path d="M12 4.2c-1.6-1-3-1.3-4.4-1.3C5.2 2.9 4 4.6 4 7.2c0 2 .5 3.3 1.1 5.5.5 1.8.7 3.2 1 4.8.3 1.7.8 3 1.9 3 1.4 0 1.6-1.6 1.9-3.5.2-1.5.5-2.6 2.1-2.6s1.9 1.1 2.1 2.6c.3 1.9.5 3.5 1.9 3.5 1.1 0 1.6-1.3 1.9-3 .3-1.6.5-3 1-4.8.6-2.2 1.1-3.5 1.1-5.5 0-2.6-1.2-4.3-3.6-4.3-1.4 0-2.8.3-4.4 1.3Z" />
    </>
  ),
  calendarCheck: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
      <path d="M3.5 9.8h17M8 3v4M16 3v4" />
      <path d="M9.4 14.6 11.4 16.6 15 13" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.4" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h4" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20.2C7 17 4 14 4 10.4A4.4 4.4 0 0 1 12 7.8 4.4 4.4 0 0 1 20 10.4c0 3.6-3 6.6-8 9.8Z" />
    </>
  ),
  scan: (
    <>
      <path d="M3.5 8.5V6a2.5 2.5 0 0 1 2.5-2.5h2.5M15.5 3.5H18A2.5 2.5 0 0 1 20.5 6v2.5" />
      <path d="M20.5 15.5V18a2.5 2.5 0 0 1-2.5 2.5h-2.5M8.5 20.5H6A2.5 2.5 0 0 1 3.5 18v-2.5" />
      <path d="M7 12h10" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M6 20.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M10.4 6.6h.01M13.6 6.6h.01" />
    </>
  ),

  /* --- Retail ----------------------------------------------------------- */
  sack: (
    <>
      <path d="M8.5 3.5h7l-1.6 3.1c3 1.3 4.6 4 4.6 7.4 0 4-2.6 6.5-6.5 6.5S5.5 18 5.5 14c0-3.4 1.6-6.1 4.6-7.4Z" />
      <path d="M9.5 6.6h5" />
    </>
  ),
  chick: (
    <>
      <circle cx="12" cy="12.5" r="5.5" />
      <circle cx="12" cy="6.8" r="3" />
      <path d="M13.6 6.4 15.6 7l-2 .8" />
      <path d="M10 18.5 9 21M14 18.5 15 21" />
    </>
  ),
  hay: (
    <>
      <rect x="3" y="7" width="18" height="10.5" rx="1.8" />
      <path d="M3 10.5h18M3 14h18" />
      <path d="M8 7v10.5M16 7v10.5" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 2.5h4v3.2c0 1.2 2.2 2.3 2.2 4.5V19a2.5 2.5 0 0 1-2.5 2.5h-3.4A2.5 2.5 0 0 1 7.8 19v-8.8c0-2.2 2.2-3.3 2.2-4.5Z" />
      <path d="M7.8 13h8.4" />
    </>
  ),
  /* The beer half of a bottle shop. A can rather than a glass, because what
     people actually carry out of one is a twelve pack. */
  can: (
    <>
      <path d="M7.4 5.2h9.2v13a2.8 2.8 0 0 1-2.8 2.8h-3.6a2.8 2.8 0 0 1-2.8-2.8Z" />
      <path d="M7.4 5.2a2 1.4 0 0 1 9.2 0" />
      <path d="M7.4 9h9.2" />
      <path d="M10.6 12.4v5M13.4 12.4v5" />
    </>
  ),
  /* And the wine half. */
  grapes: (
    <>
      <path d="M12 8.6c2 0 2 3 0 3s-2-3 0-3Z" />
      <path d="M9 11.6c2 0 2 3 0 3s-2-3 0-3ZM15 11.6c2 0 2 3 0 3s-2-3 0-3ZM12 14.6c2 0 2 3 0 3s-2-3 0-3Z" />
      <path d="M12 8.6V5.4c0-1.4 1.3-2.4 3-2.4" />
      <path d="M12 5.8c1.6-1 3.4-.8 4.4.2" />
    </>
  ),
  basket: (
    <>
      <path d="M3 9h18l-1.8 9.2a2.4 2.4 0 0 1-2.4 1.9H7.2a2.4 2.4 0 0 1-2.4-1.9Z" />
      <path d="M8.2 9 10 3.5M15.8 9 14 3.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c-1.5-6 2-13.5 16-15 .5 9-4.5 15.5-11.5 15.5A6 6 0 0 1 4 20Z" />
      <path d="M11 13c-2.5 1.7-4.4 4.2-5.5 7.5" />
    </>
  ),
  mower: (
    <>
      <path d="M3 16.5h9.5l1.5-6h4.5" />
      <path d="M12.5 16.5H21v-4h-6.5" />
      <path d="M18.5 10.5V7.5h-4" />
      <circle cx="6" cy="18.5" r="2.2" />
      <circle cx="17" cy="18.5" r="2.2" />
    </>
  ),

  /* --- Venue ------------------------------------------------------------ */
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.2" />
      <path d="M3.5 10h17" />
      <path d="M8.2 3.5v4M15.8 3.5v4" />
      <path d="M8 14h2.4M13.6 14H16M8 17.4h2.4" />
    </>
  ),
  bed: (
    <>
      <path d="M3.2 19.5v-13" />
      <path d="M3.2 11.5h17.6a2 2 0 0 1 2 2v6" />
      <path d="M3.2 16.2h19.6" />
      <circle cx="7.6" cy="8.8" r="2.1" />
      <path d="M11.4 11.5V9.6a1.6 1.6 0 0 1 1.6-1.6h4.2" />
    </>
  ),

  /* --- Generic ---------------------------------------------------------- */
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4.2-4.2 6.5-7.2 6.5-10.2a6.5 6.5 0 0 0-13 0C5.5 13.8 7.8 16.8 12 21Z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </>
  ),
  phone: (
    <>
      <path d="M8.2 4.5 9.8 8.3 7.9 9.9a10.5 10.5 0 0 0 5.9 5.9l1.6-1.9 3.8 1.6v3.1a1.6 1.6 0 0 1-1.8 1.6C9.6 19.5 4.5 14.4 3.8 6.3A1.6 1.6 0 0 1 5.4 4.5Z" />
    </>
  ),
  star: (
    <>
      <path d="M12 3.8 14.4 9l5.6.7-4.1 3.9 1.1 5.6L12 16.5 7 19.2l1.1-5.6L4 9.7 9.6 9Z" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 5.5C6.4 6.9 4.5 9.6 4.5 13v5.5h6.4V13H7.6c0-2.3.9-3.9 2.9-4.9Z" />
      <path d="M20 5.5c-3.1 1.4-5 4.1-5 7.5v5.5h6.4V13h-3.3c0-2.3.9-3.9 2.9-4.9Z" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6h5A4 4 0 0 1 13.5 14h-3a4 4 0 0 0 0 4h5" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export const iconNames = Object.keys(paths) as IconName[];

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg {...base} width={size} height={size} className={className}>
      {d}
    </svg>
  );
}
