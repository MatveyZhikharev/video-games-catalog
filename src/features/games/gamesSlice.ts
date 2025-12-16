import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { GamesState, GamesFilters, GamesSorting, Platform, Genre } from '@/types';
import { gamesApi, type FetchGamesParams } from '@/api/supabaseClient';

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

// Async thunks
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (params: FetchGamesParams | undefined, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { games: GamesState };
      const {
        searchQuery,
        filters,
        sorting,
        pagination: { page, limit },
      } = state.games;

      const result = await gamesApi.fetchGames({
        searchQuery: params?.searchQuery ?? searchQuery,
        platforms: params?.platforms ?? filters.platforms,
        genres: params?.genres ?? filters.genres,
        sorting: params?.sorting ?? sorting,
        page: params?.page ?? page,
        limit: params?.limit ?? limit,
      });

      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch games');
    }
  }
);

export const fetchGameById = createAsyncThunk(
  'games/fetchGameById',
  async (id: string, { rejectWithValue }) => {
    try {
      const game = await gamesApi.fetchGameById(id);
      return game;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch game');
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.pagination.page = 1;
    },
    setFilters(state, action: PayloadAction<Partial<GamesFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setPlatformFilter(state, action: PayloadAction<Platform[]>) {
      state.filters.platforms = action.payload;
      state.pagination.page = 1;
    },
    setGenreFilter(state, action: PayloadAction<Genre[]>) {
      state.filters.genres = action.payload;
      state.pagination.page = 1;
    },
    setSorting(state, action: PayloadAction<GamesSorting>) {
      state.sorting = action.payload;
      state.pagination.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    clearFilters(state) {
      state.filters = { platforms: [], genres: [] };
      state.searchQuery = '';
      state.pagination.page = 1;
    },
    clearSelectedGame(state) {
      state.selectedGame = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGames
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchGameById
      .addCase(fetchGameById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGame = action.payload;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setFilters,
  setPlatformFilter,
  setGenreFilter,
  setSorting,
  setPage,
  clearFilters,
  clearSelectedGame,
  clearError,
} = gamesSlice.actions;

export default gamesSlice.reducer;
