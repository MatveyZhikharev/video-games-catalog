import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchGameById, clearSelectedGame } from '@/features/games/gamesSlice';
import { selectSelectedGame, selectGamesLoading, selectGamesError } from '@/features/games/gamesSelectors';
import { selectIsFavorite } from '@/features/favorites/favoritesSelectors';
import { addToFavorites, removeFromFavorites } from '@/features/favorites/favoritesSlice';
import { Button } from '@/components/common/Button';
import { Rating, Metacritic } from '@/components/common/Rating';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { GameGallery } from '@/components/features/GameGallery';
import { formatDate, getPlatformIcon, getGenreColor } from '@/utils/helpers';
import styles from './GamePage.module.scss';

export const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const game = useAppSelector(selectSelectedGame);
  const loading = useAppSelector(selectGamesLoading);
  const error = useAppSelector(selectGamesError);
  const isFavorite = useAppSelector(selectIsFavorite(id || ''));

  useEffect(() => {
    if (id) {
      dispatch(fetchGameById(id));
    }
    return () => {
      dispatch(clearSelectedGame());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (!id) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  const handleRetry = useCallback(() => {
    if (id) {
      dispatch(fetchGameById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Loader fullScreen text="Загрузка информации об игре..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <ErrorMessage
          title="Не удалось загрузить игру"
          message={error}
          onRetry={handleRetry}
        />
        <Button variant="outline" onClick={handleBack} className={styles.backButton}>
          ← Назад в каталог
        </Button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className={styles.page}>
        <ErrorMessage
          title="Игра не найдена"
          message="Игра, которую вы ищете, не существует или была удалена."
        />
        <Button variant="outline" onClick={handleBack} className={styles.backButton}>
          ← Назад в каталог
        </Button>
      </div>
    );
  }

  return (
    <article className={styles.page}>
      <nav className={styles.nav}>
        <Button variant="outline" onClick={handleBack}>
          ← Назад в каталог
        </Button>
      </nav>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <GameGallery images={game.screenshots || [game.cover_image]} title={game.title} />
        </div>

        <div className={styles.info}>
          <header className={styles.header}>
            <h1 className={styles.title}>{game.title}</h1>
            <div className={styles.meta}>
              <div className={styles.rating}>
                <Rating value={game.rating} size="lg" />
                {game.metacritic_score && (
                  <Metacritic score={game.metacritic_score} size="lg" />
                )}
              </div>
              <div className={styles.releaseDate}>
                <span className={styles.label}>Дата выхода</span>
                <span className={styles.value}>{formatDate(game.release_date)}</span>
              </div>
            </div>
          </header>

          <div className={styles.actions}>
            <Button
              variant={isFavorite ? 'secondary' : 'primary'}
              onClick={handleToggleFavorite}
              leftIcon={isFavorite ? '❤️' : '🤍'}
            >
              {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Button>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Об игре</h2>
            <p className={styles.description}>{game.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Платформы</h2>
            <div className={styles.platforms}>
              {game.platforms.map((platform) => (
                <span key={platform} className={styles.platform}>
                  <span className={styles.platformIcon}>{getPlatformIcon(platform)}</span>
                  {platform}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Жанры</h2>
            <div className={styles.genres}>
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className={styles.genre}
                  style={{ backgroundColor: getGenreColor(genre) }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Детали</h2>
            <dl className={styles.details}>
              <div className={styles.detailItem}>
                <dt>Разработчик</dt>
                <dd>{game.developer}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Издатель</dt>
                <dd>{game.publisher}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </article>
  );
};
