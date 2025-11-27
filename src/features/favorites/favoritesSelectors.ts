import type { RootState } from '@/app/store';

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;

export const selectIsFavorite = (gameId: string) => (state: RootState) =>
  state.favorites.items.includes(gameId);

export const selectFavoritesCount = (state: RootState) => state.favorites.items.length;
