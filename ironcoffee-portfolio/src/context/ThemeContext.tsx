import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Mode = 'light' | 'dark';

interface ThemeValue {
  mode: Mode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);
const STORAGE_KEY = 'ic-theme';

/**
 * Reads the mode the inline script in index.html already resolved and applied.
 * Falling back to the media query keeps this correct under SSR/prerender.
 */
function initialMode(): Mode {
  if (typeof document === 'undefined') return 'dark';
  const applied = document.documentElement.dataset.theme;
  if (applied === 'light' || applied === 'dark') return applied;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Private browsing or blocked storage — the theme just won't persist.
    }
  }, [mode]);

  // Follow the OS only while the visitor hasn't made an explicit choice.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (stored) return;

    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) =>
      setMode(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(
    () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    []
  );

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
