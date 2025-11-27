import { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { cn } from '@/utils/helpers';
import { useAppSelector } from '@/app/hooks';
import { selectFavoritesCount } from '@/features/favorites/favoritesSelectors';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const favoritesCount = useAppSelector(selectFavoritesCount);

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

        <button
          className={cn(styles.mobileMenuButton, isMobileMenuOpen && styles.active)}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburger} />
        </button>

        <nav className={cn(styles.nav, isMobileMenuOpen && styles.open)}>
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

        {isMobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu} />}
      </div>
    </header>
  );
};
