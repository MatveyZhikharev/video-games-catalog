import { useNavigate } from 'react-router-dom';
import type { Game } from '@/types';
import { Card, CardImage, CardContent, CardFooter } from '@/components/common/Card';
import { Rating } from '@/components/common/Rating';
import { Button } from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectIsFavorite } from '@/features/favorites/favoritesSelectors';
import { addToFavorites, removeFromFavorites } from '@/features/favorites/favoritesSlice';
import { formatDateShort, getPlatformIcon, truncateText } from '@/utils/helpers';
import { getRelevanceColor } from '@/utils/recommendation';
import styles from './GameCard.module.scss';

export interface GameCardProps {
  game: Game;
  relevanceScore?: number;
}

export const GameCard = ({ game, relevanceScore }: GameCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(game.id));

  const handleCardClick = () => {
    navigate(`/game/${game.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(game.id));
    } else {
      dispatch(addToFavorites(game.id));
    }
  };

  return (
    <Card hoverable padding="none" className={styles.card}>
      {relevanceScore !== undefined && relevanceScore > 0 && (
        <div 
          className={styles.relevanceTag} 
          style={{ backgroundColor: getRelevanceColor(relevanceScore) }}
        >
          {relevanceScore}%
        </div>
      )}
      <button
        className={styles.cardButton}
        onClick={handleCardClick}
        aria-label={`View details for ${game.title}`}
      >
        <CardImage
          src={game.cover_image || '/placeholder-game.jpg'}
          alt={`${game.title} cover`}
        />
        <CardContent className={styles.content}>
          <h3 className={styles.title}>{truncateText(game.title, 30)}</h3>
          <div className={styles.platforms}>
            {game.platforms.map((platform) => (
              <span key={platform} className={styles.platform} title={platform}>
                {getPlatformIcon(platform)}
              </span>
            ))}
          </div>
          <div className={styles.genres}>
            {game.genres.slice(0, 2).map((genre) => (
              <span key={genre} className={styles.genre}>
                {genre}
              </span>
            ))}
          </div>
        </CardContent>
      </button>
      <CardFooter className={styles.footer}>
        <div className={styles.ratingWrapper}>
          <Rating value={game.rating} size="sm" />
        </div>
        <div className={styles.actions}>
          <span className={styles.date}>{formatDateShort(game.release_date)}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={styles.favoriteBtn}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
