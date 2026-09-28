import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import Img from './Img';
import manifest from '../generated/videos.json';
import styles from './Video.module.css';

type Manifest = Record<
  string,
  {
    width: number;
    height: number;
    aspectRatio: number;
    duration: number;
    /** Image manifest key for the first frame. */
    poster: string;
    sources: {
      type: string;
      variants: { url: string; width: number; bytes: number }[];
    }[];
  }
>;

const videos = manifest as Manifest;

/** Whether the optimizer produced this video. Callers fall back to a still. */
export const hasVideo = (name?: string): name is string =>
  !!name && name in videos;

export interface VideoProps {
  /** Manifest key: the path under assets/videos without extension. */
  name: string;
  /** Describes the video. Carried by the poster, which stays underneath it. */
  alt: string;
  /** `sizes` for the poster image. */
  sizes?: string;
  className?: string;
  aspectRatio?: string;
}

/**
 * A muted, looping video that loads after the page does.
 *
 * The prerendered markup is the poster, a normal priority <Img> of the first
 * frame, so what paints first and what largest contentful paint measures is an
 * AVIF of a few tens of kilobytes rather than megabytes of video. The <video>
 * above it has no src until JavaScript gives it one, which it does only once
 * the element is on screen, and it fades in on its first real frame. Since the
 * poster is that same frame, nothing visibly changes when it takes over.
 *
 * It stays a still for anyone who asked for reduced motion or less data, and
 * pauses whenever it is scrolled away or the tab is hidden. The button is
 * there because anything moving for longer than five seconds has to be
 * stoppable (WCAG 2.2.2).
 */
export default function Video({
  name,
  alt,
  sizes,
  className,
  aspectRatio,
}: VideoProps) {
  const entry = videos[name];
  const ref = useRef<HTMLVideoElement>(null);
  // What the viewer wants, as opposed to what the browser is doing right now.
  const wanted = useRef(false);
  const visible = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false);

  const start = useCallback(() => {
    const el = ref.current;
    if (!el || !entry) return;

    if (!el.getAttribute('src')) {
      // First codec the browser can play, then the narrowest width that still
      // covers the frame at this screen's density.
      const source = entry.sources.find((s) => el.canPlayType(s.type) !== '');
      if (!source) return;
      const need = el.clientWidth * (window.devicePixelRatio || 1);
      const byWidth = [...source.variants].sort((a, b) => a.width - b.width);
      const pick =
        byWidth.find((v) => v.width >= need * 0.9) ?? byWidth[byWidth.length - 1];
      el.src = pick.url;
    }

    el.play().catch((err: DOMException) => {
      // Low Power Mode on iOS refuses autoplay even when muted. Show the play
      // button rather than keep asking. AbortError is only a pause() landing
      // before play() resolved, which says nothing about what the viewer wants.
      if (err.name === 'NotAllowedError') {
        wanted.current = false;
        setPlaying(false);
      }
    });
  }, [entry]);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (wanted.current && visible.current && !document.hidden) start();
    else if (!el.paused) el.pause();
  }, [start]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !entry) return;

    // React sets `muted` as a property only, and iOS reads the property.
    el.muted = true;
    el.defaultMuted = true;
    setMounted(true);

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const frugal =
      conn?.saveData === true || /(^|-)2g$/.test(conn?.effectiveType ?? '');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    wanted.current = !frugal && !still;

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        sync();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [entry, sync]);

  if (!entry) return null;

  const toggle = () => {
    wanted.current = !playing;
    if (playing) ref.current?.pause();
    else start();
  };

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={{ aspectRatio: aspectRatio ?? `${entry.width} / ${entry.height}` }}
    >
      <Img
        name={entry.poster}
        alt={alt}
        sizes={sizes}
        aspectRatio={aspectRatio}
        className={styles.poster}
        priority
      />
      <video
        ref={ref}
        className={shown ? `${styles.video} ${styles.shown}` : styles.video}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        onPlaying={() => {
          setPlaying(true);
          setShown(true);
        }}
        onPause={() => setPlaying(false)}
      />
      {mounted && (
        <button
          type="button"
          className={styles.toggle}
          onClick={toggle}
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? (
            <Pause size={16} aria-hidden fill="currentColor" />
          ) : (
            <Play size={16} aria-hidden fill="currentColor" />
          )}
        </button>
      )}
    </div>
  );
}
