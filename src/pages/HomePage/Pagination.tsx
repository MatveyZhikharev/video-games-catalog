import { useAppDispatch } from '@/app/hooks';
import { setPage, fetchGames } from '@/features/games/gamesSlice';
import { Button } from '@/components/common/Button';
import { getPageNumbers, cn } from '@/utils/helpers';
import styles from './HomePage.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchGames({ page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Button>

      <div className={styles.pages}>
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              className={cn(styles.pageButton, currentPage === page && styles.active)}
              onClick={() => handlePageChange(page as number)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Следующая страница"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Button>
    </nav>
  );
};
