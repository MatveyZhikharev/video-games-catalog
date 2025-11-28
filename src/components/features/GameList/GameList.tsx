import type { Game } from '@/types';
import { GameCard } from '../GameCard';
import { GameCardSkeleton } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/ErrorMessage';
import { Button } from '@/components/common/Button';
import styles from './GameList.module.scss';

export interface GameListProps {
  games: Game[];
  loading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
  onClearFilters?: () => void;
}

export const GameList = ({
  games,
  loading = false,
  skeletonCount = 12,
  emptyMessage = 'Игры не найдены по вашим критериям.',
  onClearFilters,
}: GameListProps) => {
  if (loading) {
    return (
      <div className={styles.grid} aria-label="Загрузка игр">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <EmptyState
        title="Игры не найдены"
        message={emptyMessage}
        action={
          onClearFilters && (
            <Button variant="primary" onClick={onClearFilters}>
              Сбросить фильтры
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className={styles.grid}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
