import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { cn } from '@/utils/helpers';
import { useAppSelector } from '@/app/hooks';
import { selectFavoritesCount } from '@/features/favorites/favoritesSelectors';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  // Check if navigation fits in the header
  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !navRef.current || !logoRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const logoWidth = logoRef.current.offsetWidth;
      const navWidth = navRef.current.scrollWidth;
      const gap = 48; // Spacing between elements
      const burgerWidth = 40; // Width of burger button
      
      // Check if logo + nav + spacing fits in container
      const totalWidth = logoWidth + navWidth + gap;
      const needsBurger = totalWidth > containerWidth - burgerWidth;
      
      setShowBurger(needsBurger);
      
      // Close mobile menu if we switch to desktop mode
      if (!needsBurger && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container} ref={containerRef}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu} ref={logoRef}>
          <span className={styles.logoIcon}>🎮</span>
          <span className={styles.logoText}>GameCatalog</span>
        </Link>

        {showBurger && (
          <button
            className={cn(styles.mobileMenuButton, isMobileMenuOpen && styles.active)}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburger} />
          </button>
        )}

        <nav 
          className={cn(
            styles.nav, 
            showBurger && styles.mobileNav,
            showBurger && isMobileMenuOpen && styles.open
          )}
          ref={navRef}
        >
          <NavLink
            to="/"
            className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
            onClick={closeMobileMenu}
          >
            Favorites
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>
        </nav>

        {showBurger && isMobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu} />}
      </div>
    </header>
  );
};
