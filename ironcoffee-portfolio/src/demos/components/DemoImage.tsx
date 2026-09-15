import manifest from '../../generated/images.json';
import Img from '../../components/Img';
import styles from '../Demo.module.css';

const images = manifest as Record<string, unknown>;

export interface DemoImageProps {
  /** Manifest key, or undefined. Either way this renders something. */
  name?: string;
  alt: string;
  /** Two or three characters drawn in the placeholder, usually initials. */
  mark?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * A photo, or a branded stand-in for one.
 *
 * Configs get written before the photos are gathered, which is rather the
 * point of keeping a demo as data. Any key the optimizer has not produced yet falls back
 * to a gradient built from the business's own brand colors, so a config can be
 * reviewed, styled and shown to nobody-but-you while the images are still a
 * folder of Facebook downloads waiting to be cropped.
 *
 * Drop the sources into `assets/images/demos/<slug>/` and the real photo
 * appears on the next build with no code change.
 */
export default function DemoImage({
  name,
  alt,
  mark,
  sizes = '100vw',
  priority = false,
  className,
}: DemoImageProps) {
  const hasImage = Boolean(name && name in images);

  if (hasImage) {
    return (
      <Img
        name={name as string}
        alt={alt}
        sizes={sizes}
        priority={priority}
        fit="cover"
        aspectRatio="auto"
        className={[styles.imgFill, className].filter(Boolean).join(' ')}
      />
    );
  }

  return (
    <div
      className={[styles.placeholder, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={alt}
      style={placeholderStyle(name ?? alt)}
    >
      <div className={styles.placeholderPattern} aria-hidden="true" />
      {mark && <span className={styles.placeholderMark}>{mark}</span>}
    </div>
  );
}

/**
 * Varies the gradient from the key, so adjacent stand-ins do not look like the
 * same broken image repeated. Deterministic, because the build and the browser
 * have to produce identical markup.
 */
function placeholderStyle(seed: string): React.CSSProperties {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return {
    '--ph-angle': `${100 + (hash % 9) * 15}deg`,
    '--ph-x': `${14 + (hash % 5) * 9}%`,
    '--ph-y': `${16 + ((hash >> 3) % 5) * 9}%`,
  } as React.CSSProperties;
}
