import { debounce, formatDate, filterGames, sortGames, truncateText, getPageNumbers } from './helpers';
import type { Game } from '@/types';

describe('helpers', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should only call function once for multiple rapid calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn('arg1', 'arg2');
      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const result = formatDate('2023-12-25', 'en-US');
      expect(result).toContain('December');
      expect(result).toContain('25');
      expect(result).toContain('2023');
    });

    it('should return empty string for invalid date', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate('invalid')).toBe('');
    });
  });

  describe('filterGames', () => {
    const mockGames: Game[] = [
      {
        id: '1',
        title: 'The Witcher 3',
        description: 'An epic RPG',
        release_date: '2015-05-19',
        rating: 9.5,
        metacritic_score: 93,
        platforms: ['PC', 'PlayStation', 'Xbox'],
        genres: ['RPG', 'Action'],
        developer: 'CD Projekt Red',
        publisher: 'CD Projekt',
        cover_image: '',
        screenshots: [],
        created_at: '',
        updated_at: '',
      },
      {
        id: '2',
        title: 'FIFA 23',
        description: 'A sports game',
        release_date: '2022-09-30',
        rating: 7.0,
        metacritic_score: 75,
        platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
        genres: ['Sports'],
        developer: 'EA Sports',
        publisher: 'EA',
        cover_image: '',
        screenshots: [],
        created_at: '',
        updated_at: '',
      },
      {
        id: '3',
        title: 'Call of Duty: Modern Warfare',
        description: 'A shooter game',
        release_date: '2019-10-25',
        rating: 8.5,
        metacritic_score: 81,
        platforms: ['PC', 'PlayStation', 'Xbox'],
        genres: ['Shooter', 'Action'],
        developer: 'Infinity Ward',
        publisher: 'Activision',
        cover_image: '',
        screenshots: [],
        created_at: '',
        updated_at: '',
      },
    ];

    it('should filter by search query', () => {
      const result = filterGames(mockGames, 'witcher', [], []);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Witcher 3');
    });

    it('should filter by platform', () => {
      const result = filterGames(mockGames, '', ['Nintendo'], []);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('FIFA 23');
    });

    it('should filter by genre', () => {
      const result = filterGames(mockGames, '', [], ['RPG']);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Witcher 3');
    });

    it('should filter by multiple criteria', () => {
      const result = filterGames(mockGames, '', ['PC'], ['Action']);
      expect(result).toHaveLength(2);
    });

    it('should return all games when no filters applied', () => {
      const result = filterGames(mockGames, '', [], []);
      expect(result).toHaveLength(3);
    });
  });

  describe('sortGames', () => {
    const mockGames: Game[] = [
      {
        id: '1',
        title: 'Game A',
        description: '',
        release_date: '2020-01-01',
        rating: 8.0,
        metacritic_score: null,
        platforms: [],
        genres: [],
        developer: '',
        publisher: '',
        cover_image: '',
        screenshots: [],
        created_at: '',
        updated_at: '',
      },
      {
        id: '2',
        title: 'Game B',
        description: '',
        release_date: '2022-06-15',
        rating: 9.5,
        metacritic_score: null,
        platforms: [],
        genres: [],
        developer: '',
        publisher: '',
        cover_image: '',
        screenshots: [],
        created_at: '',
        updated_at: '',
      },
      {
        id: '3',
        title: 'Game C',
        description: '',
        release_date: '2019-03-20',
        rating: 7.0,
        metacritic_score: null,
        platforms: [],
        genres: [],
        developer: '',
        publisher: '',
        cover_image: '',
        screenshots: [],
        created_at: '',
        updated_at: '',
      },
    ];

    it('should sort by rating descending', () => {
      const result = sortGames(mockGames, 'rating', 'desc');
      expect(result[0].rating).toBe(9.5);
      expect(result[2].rating).toBe(7.0);
    });

    it('should sort by rating ascending', () => {
      const result = sortGames(mockGames, 'rating', 'asc');
      expect(result[0].rating).toBe(7.0);
      expect(result[2].rating).toBe(9.5);
    });

    it('should sort by release date descending', () => {
      const result = sortGames(mockGames, 'release_date', 'desc');
      expect(result[0].release_date).toBe('2022-06-15');
    });

    it('should sort by release date ascending', () => {
      const result = sortGames(mockGames, 'release_date', 'asc');
      expect(result[0].release_date).toBe('2019-03-20');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than max length', () => {
      const result = truncateText('This is a very long text that needs to be truncated', 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(result.endsWith('...')).toBe(true);
    });

    it('should not truncate text shorter than max length', () => {
      const result = truncateText('Short text', 20);
      expect(result).toBe('Short text');
    });

    it('should return empty string for empty input', () => {
      expect(truncateText('', 20)).toBe('');
    });
  });

  describe('getPageNumbers', () => {
    it('should return all pages when total is less than max visible', () => {
      const result = getPageNumbers(1, 3, 5);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should include ellipsis for many pages', () => {
      const result = getPageNumbers(5, 10, 5);
      expect(result).toContain('...');
    });

    it('should show correct pages at the beginning', () => {
      const result = getPageNumbers(1, 10, 5);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(10);
    });

    it('should show correct pages at the end', () => {
      const result = getPageNumbers(10, 10, 5);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(10);
    });
  });
});
