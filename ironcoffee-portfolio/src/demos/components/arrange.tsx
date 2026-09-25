import { Fragment, type ReactNode } from 'react';
import type { DemoConfig, DemoHeading, SectionKey } from '../types';
import { pictureKind } from '../index';
import type { Tone } from './primitives';

/**
 * One block a template can place anywhere in its order.
 *
 * `band` is for the full-width interruptions (a pull quote, a photo wall) that
 * paint their own ground. Everything else is a section and gets its tone from
 * where it lands rather than from where the template first put it, because a
 * reordered page with tones fixed per block puts two tinted sections back to
 * back and the join between them disappears.
 */
export interface Slot {
  /** Render nothing at all, and take no tone, when this is false. */
  show: boolean;
  band?: boolean;
  /** Forces a tone, e.g. a dark visit section. The alternation carries on. */
  tone?: Tone;
  render: (tone: Tone) => ReactNode;
}

/**
 * Lays the slots out in `order`, alternating plain and tinted grounds.
 *
 * A key the template has no slot for is skipped, and a slot the order leaves
 * out is not rendered: the order is the page.
 */
export function Arranged({
  order,
  slots,
}: {
  order: SectionKey[];
  slots: Partial<Record<SectionKey, Slot>>;
}) {
  let next: Tone = 'plain';
  const out: ReactNode[] = [];

  for (const key of order) {
    const slot = slots[key];
    if (!slot || !slot.show) continue;
    if (slot.band) {
      out.push(<Fragment key={key}>{slot.render('plain')}</Fragment>);
      // Whatever follows a band starts clean.
      next = 'plain';
      continue;
    }
    const tone: Tone = slot.tone ?? next;
    out.push(<Fragment key={key}>{slot.render(tone)}</Fragment>);
    next = tone === 'plain' ? 'alt' : 'plain';
  }

  return <>{out}</>;
}

/** A section's heading: the template's default, with the config's overrides. */
export function heading(
  config: DemoConfig,
  key: SectionKey,
  fallback: DemoHeading & { title: string }
): DemoHeading & { title: string } {
  const own = config.copy?.headings?.[key];
  return {
    eyebrow: own?.eyebrow ?? fallback.eyebrow,
    title: own?.title ?? fallback.title,
    sub: own?.sub ?? fallback.sub,
  };
}

/**
 * The line under a gallery heading, true to what the pictures are.
 *
 * Asked about the gallery alone, so a drawing further down the page does not
 * change what this heading says about these photographs.
 */
export function gallerySub(config: DemoConfig): string | undefined {
  return {
    drawn: 'Drawn for this preview. The finished site uses your own pictures.',
    placeholder:
      'Stand-in photographs to show the layout. The finished site uses your own.',
    mixed:
      'Stand-in photographs to show the layout. The finished site uses your own.',
    own: undefined,
  }[pictureKind(config, config.gallery)];
}

/**
 * Nav anchors in the order the sections appear on the page.
 *
 * A reordered page with its nav in the old order sends someone down the page
 * and back up again, which reads as a mistake the moment you click twice.
 */
export function orderedAnchors<T>(
  order: SectionKey[],
  anchors: Partial<Record<SectionKey, T | false | undefined>>
): T[] {
  return order
    .map((key) => anchors[key])
    .filter((link): link is T => Boolean(link));
}
