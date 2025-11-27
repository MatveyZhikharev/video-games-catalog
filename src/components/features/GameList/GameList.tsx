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
  emptyMessage = 'No games found matching your criteria.',
  onClearFilters,
}: GameListProps) => {
  if (loading) {
    return (
      <div className={styles.grid} aria-label="Loading games">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <EmptyState
        title="No Games Found"
        message={emptyMessage}
        action={
          onClearFilters && (
            <Button variant="primary" onClick={onClearFilters}>
              Clear Filters
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
