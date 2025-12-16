export interface Game {
  id: string;
  title: string;
  description: string;
  release_date: string;
  rating: number;
  metacritic_score: number | null;
  platforms: Platform[];
  genres: Genre[];
  developer: string;
  publisher: string;
  cover_image: string;
  screenshots: string[];
  created_at: string;
  updated_at: string;
}

export type Platform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo';

export type Genre = 'Action' | 'RPG' | 'Strategy' | 'Adventure' | 'Sports' | 'Shooter';

export interface Favorite {
  id: string;
  user_id: string;
  game_id: string;
  created_at: string;
}

export interface GamesState {
  items: Game[];
  selectedGame: Game | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: GamesFilters;
  sorting: GamesSorting;
  pagination: GamesPagination;
}

export interface GamesFilters {
  platforms: Platform[];
  genres: Genre[];
}

export interface GamesSorting {
  field: 'rating' | 'release_date' | 'relevance';
  order: 'asc' | 'desc';
}

export interface GamesPagination {
  page: number;
  limit: number;
  total: number;
}

export interface FavoritesState {
  items: string[]; // game IDs
  loading: boolean;
  error: string | null;
}

export interface RootState {
  games: GamesState;
  favorites: FavoritesState;
}
