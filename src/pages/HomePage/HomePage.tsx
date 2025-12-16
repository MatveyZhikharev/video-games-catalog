import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchGames, clearFilters } from '@/features/games/gamesSlice';
import {
  selectGames,
  selectGamesLoading,
  selectGamesError,
  selectPagination,
  selectTotalPages,
  selectSearchQuery,
  selectFilters,
  selectSorting,
} from '@/features/games/gamesSelectors';
import { selectFavoriteGames } from '@/features/favorites/favoritesSelectors';
import { GameList } from '@/components/features/GameList';
import { SearchBar } from '@/components/features/SearchBar';
import { Filters } from '@/components/features/Filters';
import { Sorting } from '@/components/features/Sorting';
import { Pagination } from './Pagination';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { calculateRelevanceScore, sortByRelevance } from '@/utils/recommendation';
import type { Game } from '@/types';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const loading = useAppSelector(selectGamesLoading);
  const error = useAppSelector(selectGamesError);
  const pagination = useAppSelector(selectPagination);
  const totalPages = useAppSelector(selectTotalPages);
  const searchQuery = useAppSelector(selectSearchQuery);
  const filters = useAppSelector(selectFilters);
  const sorting = useAppSelector(selectSorting);
  const favoriteGames = useAppSelector(selectFavoriteGames);

  // Fetch games when search, filters, sorting, or page changes
  useEffect(() => {
    dispatch(fetchGames({}));
  }, [dispatch, searchQuery, filters, sorting, pagination.page]);

  // Calculate relevance scores and apply relevance sorting if needed
  const { sortedGames, relevanceScores } = useMemo(() => {
    let processedGames: Game[] = games;
    const scores = new Map<string, number>();

    // Calculate relevance scores if we have favorites
    if (favoriteGames.length > 0) {
      games.forEach(game => {
        const score = calculateRelevanceScore(game, favoriteGames);
        scores.set(game.id, score);
      });

      // Apply relevance sorting if selected
      if (sorting.field === 'relevance') {
        processedGames = sortByRelevance(games, favoriteGames);
      }
    }

    return { sortedGames: processedGames, relevanceScores: scores };
  }, [games, favoriteGames, sorting.field]);

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
          games={sortedGames}
          loading={loading}
          onClearFilters={handleClearFilters}
          relevanceScores={relevanceScores}
        />
      </section>

      {!loading && sortedGames.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
