import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectGames } from '@/features/games/gamesSelectors';

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;

export const selectIsFavorite = (gameId: string) => (state: RootState) =>
  state.favorites.items.includes(gameId);

export const selectFavoritesCount = (state: RootState) => state.favorites.items.length;

// Get actual Game objects from all games that are in favorites
export const selectFavoriteGames = createSelector(
  [selectGames, selectFavorites],
  (games, favoriteIds) => {
    return games.filter(game => favoriteIds.includes(game.id));
  }
);
