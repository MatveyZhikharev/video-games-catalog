// Note: These tests focus on synchronous reducer actions.
// Async thunks involving API calls are tested in integration tests.

import type { GamesState } from '@/types';

// Mock the gamesSlice module to avoid API imports
jest.mock('@/api/supabaseClient', () => ({
  gamesApi: {
    fetchGames: jest.fn(),
    fetchGameById: jest.fn(),
  },
}));

// Import after mocking
import gamesReducer, {
  setSearchQuery,
  setFilters,
  setSorting,
  setPage,
  clearFilters,
  fetchGames,
} from './gamesSlice';

const initialState: GamesState = {
  items: [],
  selectedGame: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    platforms: [],
    genres: [],
  },
  sorting: {
    field: 'rating',
    order: 'desc',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

describe('gamesSlice', () => {
  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(gamesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('setSearchQuery', () => {
    it('should set the search query', () => {
      const state = gamesReducer(initialState, setSearchQuery('witcher'));
      expect(state.searchQuery).toBe('witcher');
    });

    it('should reset page to 1 when search query changes', () => {
      const stateWithPage = { ...initialState, pagination: { ...initialState.pagination, page: 3 } };
      const state = gamesReducer(stateWithPage, setSearchQuery('elden ring'));
      expect(state.pagination.page).toBe(1);
    });
  });

  describe('setFilters', () => {
    it('should set platform filters', () => {
      const state = gamesReducer(
        initialState,
        setFilters({ platforms: ['PC', 'PlayStation'] })
      );
      expect(state.filters.platforms).toEqual(['PC', 'PlayStation']);
    });

    it('should set genre filters', () => {
      const state = gamesReducer(
        initialState,
        setFilters({ genres: ['Action', 'RPG'] })
      );
      expect(state.filters.genres).toEqual(['Action', 'RPG']);
    });

    it('should reset page to 1 when filters change', () => {
      const stateWithPage = { ...initialState, pagination: { ...initialState.pagination, page: 5 } };
      const state = gamesReducer(stateWithPage, setFilters({ platforms: ['PC'] }));
      expect(state.pagination.page).toBe(1);
    });
  });

  describe('setSorting', () => {
    it('should set sorting field and order', () => {
      const state = gamesReducer(
        initialState,
        setSorting({ field: 'release_date', order: 'asc' })
      );
      expect(state.sorting.field).toBe('release_date');
      expect(state.sorting.order).toBe('asc');
    });

    it('should reset page to 1 when sorting changes', () => {
      const stateWithPage = { ...initialState, pagination: { ...initialState.pagination, page: 2 } };
      const state = gamesReducer(
        stateWithPage,
        setSorting({ field: 'rating', order: 'asc' })
      );
      expect(state.pagination.page).toBe(1);
    });
  });

  describe('setPage', () => {
    it('should set the current page', () => {
      const state = gamesReducer(initialState, setPage(3));
      expect(state.pagination.page).toBe(3);
    });
  });

  describe('clearFilters', () => {
    it('should clear all filters and search query', () => {
      const stateWithFilters: GamesState = {
        ...initialState,
        searchQuery: 'test',
        filters: {
          platforms: ['PC'],
          genres: ['Action'],
        },
        pagination: { ...initialState.pagination, page: 3 },
      };
      const state = gamesReducer(stateWithFilters, clearFilters());
      expect(state.searchQuery).toBe('');
      expect(state.filters.platforms).toEqual([]);
      expect(state.filters.genres).toEqual([]);
      expect(state.pagination.page).toBe(1);
    });
  });

  describe('fetchGames async thunk', () => {
    it('should set loading to true when pending', () => {
      const state = gamesReducer(initialState, { type: fetchGames.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set games and total when fulfilled', () => {
      const mockGames = [
        { id: '1', title: 'Game 1', rating: 9.0 },
        { id: '2', title: 'Game 2', rating: 8.5 },
      ];
      const state = gamesReducer(initialState, {
        type: fetchGames.fulfilled.type,
        payload: { data: mockGames, total: 2 },
      });
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockGames);
      expect(state.pagination.total).toBe(2);
    });

    it('should set error when rejected', () => {
      const state = gamesReducer(initialState, {
        type: fetchGames.rejected.type,
        payload: 'Failed to fetch games',
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch games');
    });
  });
});
