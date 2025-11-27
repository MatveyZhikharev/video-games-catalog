import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState } from '@/types';
import { favoritesApi } from '@/api/supabaseClient';

const FAVORITES_STORAGE_KEY = 'favorites';

// Load favorites from localStorage
const loadFavoritesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites: string[]): void => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
  loading: false,
  error: null,
};

// Async thunks
export const syncFavorites = createAsyncThunk('favorites/syncFavorites', async () => {
  try {
    const favorites = await favoritesApi.fetchFavorites();
    saveFavoritesToStorage(favorites);
    return favorites;
  } catch {
    // If Supabase fails, return from localStorage
    return loadFavoritesFromStorage();
  }
});

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (gameId: string, { getState }) => {
    try {
      await favoritesApi.addToFavorites(gameId);
      const state = getState() as { favorites: FavoritesState };
      const newFavorites = [...state.favorites.items, gameId];
      saveFavoritesToStorage(newFavorites);
      return gameId;
    } catch {
      // Fallback to local storage only
      const state = getState() as { favorites: FavoritesState };
      const newFavorites = [...state.favorites.items, gameId];
      saveFavoritesToStorage(newFavorites);
      return gameId;
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (gameId: string, { getState }) => {
    try {
      await favoritesApi.removeFromFavorites(gameId);
      const state = getState() as { favorites: FavoritesState };
      const newFavorites = state.favorites.items.filter((id) => id !== gameId);
      saveFavoritesToStorage(newFavorites);
      return gameId;
    } catch {
      // Fallback to local storage only
      const state = getState() as { favorites: FavoritesState };
      const newFavorites = state.favorites.items.filter((id) => id !== gameId);
      saveFavoritesToStorage(newFavorites);
      return gameId;
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const gameId = action.payload;
      const index = state.items.indexOf(gameId);
      if (index === -1) {
        state.items.push(gameId);
      } else {
        state.items.splice(index, 1);
      }
      saveFavoritesToStorage(state.items);
    },
    clearFavorites(state) {
      state.items = [];
      saveFavoritesToStorage([]);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // syncFavorites
      .addCase(syncFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(syncFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // addToFavorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.items.includes(action.payload)) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // removeFromFavorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((id) => id !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, clearFavorites, clearError } = favoritesSlice.actions;

export default favoritesSlice.reducer;
