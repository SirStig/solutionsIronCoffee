import { useEffect, useRef, useState } from 'react';
import manifest from '../generated/images.json';
import styles from './Img.module.css';

type Manifest = Record<
  string,
  {
    width: number;
    height: number;
    aspectRatio: number;
    lqip: string;
    fallback: string;
    sources: { type: string; srcset: { url: string; width: number }[] }[];
  }
>;

const images = manifest as Manifest;

export interface ImgProps {
  /** Manifest key: the path under assets/images without extension. */
  name: string;
  alt: string;
  /** Maps to the `sizes` attribute. Defaults to full viewport width. */
  sizes?: string;
  /** Set on the one image above the fold; everything else stays lazy. */
  priority?: boolean;
  className?: string;
  /** Overrides the intrinsic ratio, e.g. '16 / 9' for a cropped card. */
  aspectRatio?: string;
  /**
   * How the image sits in its frame. 'auto' (the default) crops landscape
   * images to fill and letterboxes portrait ones, so a tall phone screenshot
   * in a wide card shows the whole screen instead of a slice of its middle.
   */
  fit?: 'auto' | 'cover' | 'contain';
}

/**
 * Renders a <picture> with AVIF + WebP srcsets from the build-time manifest.
 *
 * The wrapper reserves the exact intrinsic ratio and paints the inlined blur
 * placeholder underneath, so nothing shifts as the image decodes.
 */
export default function Img({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  aspectRatio,
  fit = 'auto',
}: ImgProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const entry = images[name];

  // Pages are prerendered, so an image can finish decoding before React
  // hydrates — in which case the load event already fired and onLoad never
  // runs, leaving the picture stuck at opacity 0 behind its blur placeholder.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  // A missing key means the source file was renamed without re-running the
  // optimizer. Fail visibly in dev, quietly in prod.
  if (!entry) {
    if (import.meta.env.DEV) {
      console.warn(`<Img name="${name}"> has no manifest entry.`);
    }
    return null;
  }

  // A portrait source shown in a wider frame gets letterboxed rather than
  // cropped; anything else fills the frame.
  const framed =
    fit === 'contain' || (fit === 'auto' && entry.aspectRatio < 0.9);

  return (
    <div
      className={[styles.frame, framed && styles.contain, className]
        .filter(Boolean)
        .join(' ')}
      style={{
        aspectRatio: aspectRatio ?? `${entry.width} / ${entry.height}`,
        backgroundImage: loaded ? undefined : `url("${entry.lqip}")`,
      }}
    >
      <picture>
        {entry.sources.map((source) => (
          <source
            key={source.type}
            type={source.type}
            sizes={sizes}
            srcSet={source.srcset.map((s) => `${s.url} ${s.width}w`).join(', ')}
          />
        ))}
        <img
          ref={ref}
          src={entry.fallback}
          alt={alt}
          width={entry.width}
          height={entry.height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          className={loaded ? styles.loaded : styles.loading}
          // React 18 renders this prop verbatim only in lowercase; the camelCase
          // spelling warns during SSR and is dropped from the static HTML.
          {...(priority ? { fetchpriority: 'high' } : {})}
        />
      </picture>
    </div>
  );
}
