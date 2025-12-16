export interface Game {
  id: string;
  title: string;
  description: string;
  release_date: string;
  rating: number;
  metacritic_score: number;
  platforms: string[];
  genres: string[];
  developer: string;
  publisher: string;
  cover_image: string;
  screenshots: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateGameDTO {
  title: string;
  description?: string;
  release_date?: string;
  rating?: number;
  metacritic_score?: number;
  platforms?: string[];
  genres?: string[];
  developer?: string;
  publisher?: string;
  cover_image?: string;
  screenshots?: string[];
}

export interface UpdateGameDTO extends Partial<CreateGameDTO> {}

export interface Favorite {
  id: string;
  user_id: string;
  game_id: string;
  created_at?: string;
}

export interface CreateFavoriteDTO {
  user_id: string;
  game_id: string;
}

export interface GameFilters {
  search?: string;
  platforms?: string[];
  genres?: string[];
  sortBy?: 'rating' | 'release_date' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AIRecommendationRequest {
  mood: string;
  preferences?: {
    genres?: string[];
    platforms?: string[];
    minRating?: number;
  };
  limit?: number;
}

export interface AIRecommendation {
  game: Game;
  matchScore: number;
  reason: string;
}
