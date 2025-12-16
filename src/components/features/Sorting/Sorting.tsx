import { useState, useRef, useEffect } from 'react';
import type { GamesSorting } from '@/types';
import { Button } from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSorting } from '@/features/games/gamesSlice';
import { selectSorting } from '@/features/games/gamesSelectors';
import { cn } from '@/utils/helpers';
import styles from './Sorting.module.scss';

interface SortOption {
  label: string;
  field: GamesSorting['field'];
  order: GamesSorting['order'];
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'По релевантности', field: 'relevance', order: 'desc' },
  { label: 'Рейтинг (по убыванию)', field: 'rating', order: 'desc' },
  { label: 'Рейтинг (по возрастанию)', field: 'rating', order: 'asc' },
  { label: 'Сначала новые', field: 'release_date', order: 'desc' },
  { label: 'Сначала старые', field: 'release_date', order: 'asc' },
];

export const Sorting = () => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector(selectSorting);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SORT_OPTIONS.find(
    (opt) => opt.field === sorting.field && opt.order === sorting.order
  );

  const handleSelect = (option: SortOption) => {
    dispatch(setSorting({ field: option.field, order: option.order }));
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.sorting} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(styles.button, isOpen && styles.active)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
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
          <path d="M11 5h10" />
          <path d="M11 9h7" />
          <path d="M11 13h4" />
          <path d="m3 17 3 3 3-3" />
          <path d="M6 18V4" />
        </svg>
        <span className={styles.buttonText}>{currentOption?.label || 'Сортировка'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="16"
          height="16"
          className={cn(styles.chevron, isOpen && styles.rotated)}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {SORT_OPTIONS.map((option) => (
            <li key={`${option.field}-${option.order}`}>
              <button
                className={cn(
                  styles.option,
                  sorting.field === option.field &&
                    sorting.order === option.order &&
                    styles.selected
                )}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={sorting.field === option.field && sorting.order === option.order}
              >
                {option.label}
                {sorting.field === option.field && sorting.order === option.order && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
