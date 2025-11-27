import { useState, useCallback, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { cn } from '@/utils/helpers';
import { useAppSelector } from '@/app/hooks';
import { selectFavoritesCount } from '@/features/favorites/favoritesSelectors';

const MOBILE_BREAKPOINT = 768;

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  // Check if we're on mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      
      // Close mobile menu if we switch to desktop mode
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <span className={styles.logoIcon}>🎮</span>
          <span className={styles.logoText}>GameCatalog</span>
        </Link>

        {isMobile && (
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
            isMobile && styles.mobileNav,
            isMobile && isMobileMenuOpen && styles.open
          )}
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

        {isMobile && isMobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu} />}
      </div>
    </header>
  );
};
