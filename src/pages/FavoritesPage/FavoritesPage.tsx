import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectFavorites } from '@/features/favorites/favoritesSelectors';
import { gamesApi } from '@/api/supabaseClient';
import type { Game } from '@/types';
import { GameList } from '@/components/features/GameList';
import { EmptyState } from '@/components/common/ErrorMessage';
import { Button } from '@/components/common/Button';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favoriteIds = useAppSelector(selectFavorites);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteGames = async () => {
      if (favoriteIds.length === 0) {
        setGames([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Load all games and filter by favorites
        const { data } = await gamesApi.fetchGames({ limit: 100 });
        const favoriteGames = data.filter((game) => favoriteIds.includes(game.id));
        setGames(favoriteGames);
      } catch (error) {
        console.error('Failed to load favorite games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteGames();
  }, [favoriteIds]);

  if (!loading && games.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>❤️ Моё избранное</h1>
        </header>
        <EmptyState
          title="Пока ничего нет"
          message="Вы ещё не добавили игры в избранное. Откройте каталог, чтобы найти игры, которые вам понравятся!"
          action={
            <Link to="/">
              <Button variant="primary">Перейти в каталог</Button>
            </Link>
          }
          icon={
            <span style={{ fontSize: '2rem' }}>💔</span>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>❤️ Моё избранное</h1>
        <p className={styles.subtitle}>
          {games.length} {games.length === 1 ? 'игра' : games.length < 5 ? 'игры' : 'игр'} в вашей коллекции
        </p>
      </header>

      <section aria-label="Favorite games">
        <GameList games={games} loading={loading} skeletonCount={6} />
      </section>
    </div>
  );
};
