import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '@/features/games/gamesSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
