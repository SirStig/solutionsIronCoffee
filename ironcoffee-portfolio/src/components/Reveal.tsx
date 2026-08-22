import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Reveal.module.css';

interface Props {
  children: ReactNode;
  /** Seconds of stagger applied when revealing a row of siblings. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

/**
 * Fades content up the first time it scrolls into view.
 *
 * One IntersectionObserver per element, disconnected on first hit — cheap
 * enough that a page full of these costs nothing measurable. Anyone with
 * reduced motion enabled gets the content immediately, unanimated.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={[styles.reveal, visible && styles.visible, className]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
