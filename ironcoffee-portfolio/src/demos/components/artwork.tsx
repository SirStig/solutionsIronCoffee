import { useId, type ReactNode } from 'react';

/**
 * Original illustration for the demos.
 *
 * Every image slot in a config is a manifest key that resolves to a
 * photograph. A preview built for a real business has no photographs yet, and
 * for a while the answer was a gradient: a page of six colored rectangles
 * that reads, correctly, as a wireframe. Nobody buys a wireframe.
 *
 * So the fallback is drawing instead. A key prefixed `art:` resolves here, to
 * a scene composed for that trade and inked in that business's own three brand
 * colors. It is not a substitute photograph and is not trying to be one,
 * which matters more than it sounds: a stock interior passed off as their shop
 * is a small lie an owner spots instantly, and a picture of somebody else's
 * building with a sign on it is a claim about their premises. A drawing claims
 * nothing. It shows the layout, carries the brand, and leaves the photography
 * as the thing they bring.
 *
 * ## The house style
 *
 * Screen print. Flat inks, no gradients inside the subject, one halftone
 * field per scene, and a deliberate registration offset on a single layer so
 * the plates look very slightly misaligned the way a real two-color print is.
 * That last detail is doing most of the work: a perfectly aligned flat vector
 * reads as clip art, and a press that missed by two millimeters reads as
 * something a person made.
 *
 * Scenes share that grammar and nothing else. Five businesses drawn in one
 * pose with the props swapped is the same failure as five copies of one
 * template, one layer further down where it is harder to notice.
 *
 * ## Why this is cheap
 *
 * A scene is between one and three kilobytes of path data that gzips to a few
 * hundred bytes, against forty kilobytes for the AVIF it stands in for. The
 * previews load faster with the drawings than they would with photographs, and
 * they stay sharp at any width because there is no raster to run out of.
 *
 * ## Adding one
 *
 * Draw it on the 1200 x 900 grid, add it to `scenes`, reference it from a
 * config as `art:<name>`. Templates and components never learn its name, which
 * is the same contract the icon set has: adding a business is a data file.
 */

/* ---------------------------------------------------------------------------
   Shared ink.

   Scenes paint with four variables rather than literal colors so one drawing
   works for a green feed store and a wine-red bottle shop without a second
   version of it existing. `--paper` is warmed by the accent rather than being
   a neutral gray, because a true gray behind a warm palette looks like a
   printing fault.
--------------------------------------------------------------------------- */

const INK = 'var(--art-ink)';
const MID = 'var(--art-mid)';
const POP = 'var(--art-pop)';
const PAPER = 'var(--art-paper)';
const WASH = 'var(--art-wash)';

/**
 * The five inks are CSS variables and are deliberately not set here.
 *
 * `.artFill` in Demo.module.css declares the daylight colorway and `.artDark`
 * swaps it for a deep one: the ground goes to the brand's darkest tone and the
 * line work goes pale, the way a two-color job looks printed light-on-dark.
 *
 * That is one drawing with two colorways rather than two drawings, and it is
 * what lets a scene sit under white hero copy without a scrim over it. Scrims
 * were the first attempt and they were wrong twice over: a drawing under 80%
 * black is a silhouette, and the contrast the copy needs then depends on
 * whatever happens to be behind each line of it.
 */

/**
 * The plates every scene can call on.
 *
 * Ids are namespaced with `useId` because a gallery renders four scenes into
 * one document and the UI audit fails the build on a duplicate id, rightly:
 * two elements answering to `#halftone` is also how one scene ends up wearing
 * another's texture.
 */
function Plates({ id }: { id: string }) {
  return (
    <defs>
      {/* Halftone. A dot grid at 40% coverage, used as a fill on its own
          shape so a flat area can be shaded without a gradient. */}
      <pattern
        id={`${id}-tone`}
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)"
      >
        <circle cx="4" cy="4" r="3.1" fill="currentColor" />
      </pattern>
      {/* The same, finer and sparser, for distance. */}
      <pattern
        id={`${id}-tone-fine`}
        width="14"
        height="14"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)"
      >
        <circle cx="3.5" cy="3.5" r="1.7" fill="currentColor" />
      </pattern>
      {/* Hatching, for anything that wants a direction: fields, timber,
          water, the side of a thing that is turned away from the light. */}
      <pattern
        id={`${id}-hatch`}
        width="13"
        height="13"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-38)"
      >
        <rect width="4.2" height="13" fill="currentColor" />
      </pattern>
    </defs>
  );
}

/** Fill referencing a plate from the enclosing scene. */
const tone = (id: string) => `url(#${id}-tone)`;
const toneFine = (id: string) => `url(#${id}-tone-fine)`;
const hatch = (id: string) => `url(#${id}-hatch)`;

/* ---------------------------------------------------------------------------
   Scene registry.

   Each entry is a function of the namespaced id, returning everything inside
   the <svg>. The 1200 x 900 grid is 4:3; frames are every shape from a wide
   hero band to a square gallery tile, and the scene is drawn to survive being
   cropped to any of them, so the subject stays inside the middle 900 x 700
   and only sky, ground and texture run out to the edges.
--------------------------------------------------------------------------- */

/**
 * A scene is a drawing plus the sentence that describes it.
 *
 * The description is not optional and is not generated. A template calling
 * these knows only that it has "the third gallery item", so the alt text it
 * can write on its own is "photo 3", which is worse than useless: it is wrong
 * about the medium and tells a screen reader nothing. The person who drew the
 * thing is the only one who can say what is in it, so they say it here, once,
 * and every frame the scene lands in gets it.
 */
interface Scene {
  draw: (id: string) => ReactNode;
  /** Completes "Illustration: ...". A sentence, not a label. */
  alt: string;
}

const scenes: Record<string, Scene> = {};

export function registerScenes(entries: Record<string, Scene>) {
  Object.assign(scenes, entries);
}

/** The drawn description, for a caller composing alt text. */
export function sceneAlt(name: string): string | undefined {
  return scenes[name]?.alt;
}

export function hasScene(name: string): boolean {
  return name in scenes;
}

/**
 * One scene, filling its frame the way a photograph would.
 *
 * `slice` rather than `meet` on purpose. These stand in for photographs in
 * slots sized for photographs, and a drawing that letterboxes itself inside a
 * hero announces that something is missing.
 */
export default function Artwork({
  name,
  alt,
  className,
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  const reactId = useId();
  const id = `a${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const scene = scenes[name];

  if (!scene) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
    >
      <Plates id={id} />
      {scene.draw(id)}
    </svg>
  );
}

export { INK, MID, POP, PAPER, WASH, tone, toneFine, hatch };
export type { Scene };
