import { useState } from 'react';
import type { Platform, Genre } from '@/types';
import { Button } from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setPlatformFilter, setGenreFilter, clearFilters } from '@/features/games/gamesSlice';
import { selectFilters, selectHasActiveFilters } from '@/features/games/gamesSelectors';
import { cn } from '@/utils/helpers';
import styles from './Filters.module.scss';

const PLATFORMS: Platform[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
const GENRES: Genre[] = ['Action', 'RPG', 'Strategy', 'Adventure', 'Sports', 'Shooter'];

export const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);
  const [isOpen, setIsOpen] = useState(false);

  const togglePlatform = (platform: Platform) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    dispatch(setPlatformFilter(newPlatforms));
  };

  const toggleGenre = (genre: Genre) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    dispatch(setGenreFilter(newGenres));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const toggleFilters = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <Button
          variant="outline"
          onClick={toggleFilters}
          className={cn(styles.toggleButton, isOpen && styles.active)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20"
            height="20"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Фильтры
          {hasActiveFilters && <span className={styles.badge} />}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Сбросить
          </Button>
        )}
      </div>

      <div className={cn(styles.panel, isOpen && styles.open)}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Платформы</h4>
          <div className={styles.chips}>
            {PLATFORMS.map((platform) => (
              <button
                key={platform}
                className={cn(
                  styles.chip,
                  filters.platforms.includes(platform) && styles.selected
                )}
                onClick={() => togglePlatform(platform)}
                aria-pressed={filters.platforms.includes(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Жанры</h4>
          <div className={styles.chips}>
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={cn(styles.chip, filters.genres.includes(genre) && styles.selected)}
                onClick={() => toggleGenre(genre)}
                aria-pressed={filters.genres.includes(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
    </div>
  );
};
