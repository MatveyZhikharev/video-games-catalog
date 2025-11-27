import { useState, useEffect, useRef, useMemo } from 'react';
import { Input } from '@/components/common/Input';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSearchQuery } from '@/features/games/gamesSlice';
import { selectSearchQuery } from '@/features/games/gamesSelectors';
import styles from './SearchBar.module.scss';

export interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBar = ({
  placeholder = 'Search games...',
  debounceMs = 400,
}: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const [inputValue, setInputValue] = useState(searchQuery);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized debounced dispatch function
  const dispatchSearch = useMemo(() => {
    return (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(setSearchQuery(value));
      }, debounceMs);
    };
  }, [dispatch, debounceMs]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatchSearch(value);
  };

  const handleClear = () => {
    setInputValue('');
    dispatch(setSearchQuery(''));
  };

  // Sync input value with redux state when it changes externally
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className={styles.searchBar}>
      <Input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        leftIcon={
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        }
        rightIcon={
          inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Clear search"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )
        }
        aria-label="Search games"
      />
    </div>
  );
};
