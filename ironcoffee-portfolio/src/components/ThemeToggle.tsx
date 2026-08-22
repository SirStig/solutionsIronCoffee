import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

/**
 * Both icons are always rendered and CSS reveals the right one from the
 * `data-theme` attribute on <html>.
 *
 * Branching on the resolved mode instead would produce different markup on the
 * server (which has no idea what the visitor prefers) than in the browser, and
 * React would throw a hydration mismatch on every page load. This way the
 * button is also correct before hydration runs at all.
 */
export default function ThemeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
    >
      <Sun size={18} aria-hidden className={styles.sun} />
      <Moon size={18} aria-hidden className={styles.moon} />
    </button>
  );
}
