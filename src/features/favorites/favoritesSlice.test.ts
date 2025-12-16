// Note: These tests focus on synchronous reducer actions.
// Async thunks involving API calls are tested in integration tests.

import type { FavoritesState } from '@/types';

// Mock the API module to avoid import.meta issues
jest.mock('@/api/supabaseClient', () => ({
  favoritesApi: {
    fetchFavorites: jest.fn(),
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
  },
}));

// Import after mocking
import favoritesReducer, { toggleFavorite, clearFavorites } from './favoritesSlice';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

describe('favoritesSlice', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('toggleFavorite', () => {
    it('should add a game to favorites if not present', () => {
      const state = favoritesReducer(initialState, toggleFavorite('game-1'));
      expect(state.items).toContain('game-1');
    });

    it('should remove a game from favorites if already present', () => {
      const stateWithFavorite: FavoritesState = {
        ...initialState,
        items: ['game-1', 'game-2'],
      };
      const state = favoritesReducer(stateWithFavorite, toggleFavorite('game-1'));
      expect(state.items).not.toContain('game-1');
      expect(state.items).toContain('game-2');
    });

    it('should save to localStorage when toggling', () => {
      favoritesReducer(initialState, toggleFavorite('game-1'));
      const stored = JSON.parse(localStorageMock.getItem('favorites') || '[]');
      expect(stored).toContain('game-1');
    });
  });

  describe('clearFavorites', () => {
    it('should clear all favorites', () => {
      const stateWithFavorites: FavoritesState = {
        ...initialState,
        items: ['game-1', 'game-2', 'game-3'],
      };
      const state = favoritesReducer(stateWithFavorites, clearFavorites());
      expect(state.items).toEqual([]);
    });

    it('should save empty array to localStorage when clearing', () => {
      const stateWithFavorites: FavoritesState = {
        ...initialState,
        items: ['game-1'],
      };
      favoritesReducer(stateWithFavorites, clearFavorites());
      const stored = JSON.parse(localStorageMock.getItem('favorites') || '[]');
      expect(stored).toEqual([]);
    });
  });
});
