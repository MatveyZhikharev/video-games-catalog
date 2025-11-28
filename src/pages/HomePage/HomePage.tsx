import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchGames, clearFilters } from '@/features/games/gamesSlice';
import {
  selectGames,
  selectGamesLoading,
  selectGamesError,
  selectPagination,
  selectTotalPages,
} from '@/features/games/gamesSelectors';
import { GameList } from '@/components/features/GameList';
import { SearchBar } from '@/components/features/SearchBar';
import { Filters } from '@/components/features/Filters';
import { Sorting } from '@/components/features/Sorting';
import { Pagination } from './Pagination';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const loading = useAppSelector(selectGamesLoading);
  const error = useAppSelector(selectGamesError);
  const pagination = useAppSelector(selectPagination);
  const totalPages = useAppSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchGames({}));
  }, [dispatch]);

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(fetchGames({}));
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchGames({}));
  }, [dispatch]);

  if (error) {
    return (
      <div className={styles.page}>
        <ErrorMessage
          title="Не удалось загрузить игры"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎮 Каталог игр</h1>
        <p className={styles.subtitle}>
          Откройте для себя новые любимые игры из нашей коллекции
        </p>
      </header>

      <div className={styles.toolbar}>
        <SearchBar />
        <div className={styles.actions}>
          <Filters />
          <Sorting />
        </div>
      </div>

      <section aria-label="Games list">
        <GameList
          games={games}
          loading={loading}
          onClearFilters={handleClearFilters}
        />
      </section>

      {!loading && games.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
