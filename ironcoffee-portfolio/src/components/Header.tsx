import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { nav, site } from '../content/site';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Any navigation closes the panel.
  useEffect(() => setOpen(false), [location.pathname]);

  // While the panel is open: lock scroll, close on Escape, and keep focus in it.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.brandName}>{site.name}</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? `${styles.panelLink} ${styles.active}`
                  : styles.panelLink
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a className={styles.panelLink} href={`mailto:${site.email}`}>
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
