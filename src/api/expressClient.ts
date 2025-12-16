// Express.js API Client
// This module provides functions to interact with the Express.js backend

import type { Game, Platform, Genre, GamesSorting } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Check if Express.js backend is enabled
export const useExpressBackend = !!import.meta.env.VITE_USE_EXPRESS_BACKEND;

interface FetchGamesResponse {
  data: Game[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface AIRecommendation {
  game: Game;
  matchScore: number;
  reason: string;
}

interface AIRecommendationsResponse {
  mood: string;
  recommendations: AIRecommendation[];
  count: number;
}

// Games API
export const expressGamesApi = {
  async fetchGames(params: {
    searchQuery?: string;
    platforms?: Platform[];
    genres?: Genre[];
    sorting?: GamesSorting;
    page?: number;
    limit?: number;
  }): Promise<{ data: Game[]; total: number }> {
    const {
      searchQuery = '',
      platforms = [],
      genres = [],
      sorting = { field: 'rating', order: 'desc' },
      page = 1,
      limit = 12,
    } = params;

    const queryParams = new URLSearchParams();
    
    if (searchQuery) queryParams.set('search', searchQuery);
    if (platforms.length > 0) queryParams.set('platforms', platforms.join(','));
    if (genres.length > 0) queryParams.set('genres', genres.join(','));
    queryParams.set('sortBy', sorting.field);
    queryParams.set('sortOrder', sorting.order);
    queryParams.set('page', String(page));
    queryParams.set('limit', String(limit));

    const response = await fetch(`${API_BASE_URL}/games?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }

    const result: FetchGamesResponse = await response.json();
    return { data: result.data, total: result.total };
  },

  async fetchGameById(id: string): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games/${id}`);
    
    if (!response.ok) {
      throw new Error('Game not found');
    }

    return response.json();
  },

  async createGame(game: Omit<Game, 'id' | 'created_at' | 'updated_at'>): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });

    if (!response.ok) {
      throw new Error('Failed to create game');
    }

    return response.json();
  },

  async updateGame(id: string, updates: Partial<Game>): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update game');
    }

    return response.json();
  },

  async deleteGame(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete game');
    }
  },
};

// Get user ID from localStorage
const getUserId = (): string => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }
  return userId;
};

// Favorites API
export const expressFavoritesApi = {
  async fetchFavorites(): Promise<string[]> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/favorites?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    const result = await response.json();
    return result.favorites.map((f: { game_id: string }) => f.game_id);
  },

  async addToFavorites(gameId: string): Promise<void> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, game_id: gameId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }
  },

  async removeFromFavorites(gameId: string): Promise<void> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/favorites?userId=${userId}&gameId=${gameId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }
  },
};

// AI Recommendations API (GameMatch AI)
export const aiApi = {
  async getMoods(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/ai/moods`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch moods');
    }

    const result = await response.json();
    return result.moods;
  },

  async getRecommendations(params: {
    mood: string;
    preferences?: {
      genres?: Genre[];
      platforms?: Platform[];
      minRating?: number;
    };
    limit?: number;
  }): Promise<AIRecommendation[]> {
    const response = await fetch(`${API_BASE_URL}/ai/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI recommendations');
    }

    const result: AIRecommendationsResponse = await response.json();
    return result.recommendations;
  },
};
