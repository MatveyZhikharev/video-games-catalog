import type { RootState } from '@/app/store';

export const selectGames = (state: RootState) => state.games.items;
export const selectSelectedGame = (state: RootState) => state.games.selectedGame;
export const selectGamesLoading = (state: RootState) => state.games.loading;
export const selectGamesError = (state: RootState) => state.games.error;
export const selectSearchQuery = (state: RootState) => state.games.searchQuery;
export const selectFilters = (state: RootState) => state.games.filters;
export const selectSorting = (state: RootState) => state.games.sorting;
export const selectPagination = (state: RootState) => state.games.pagination;

export const selectHasActiveFilters = (state: RootState) => {
  const { filters, searchQuery } = state.games;
  return (
    filters.platforms.length > 0 ||
    filters.genres.length > 0 ||
    searchQuery.length > 0
  );
};

export const selectTotalPages = (state: RootState) => {
  const { pagination } = state.games;
  return Math.ceil(pagination.total / pagination.limit);
};
