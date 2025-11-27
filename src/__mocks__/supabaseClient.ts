// Mock for @/api/supabaseClient
export const supabase = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    overlaps: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  })),
};

export const getUserId = jest.fn(() => 'test-user-id');

export const gamesApi = {
  fetchGames: jest.fn().mockResolvedValue({ data: [], total: 0 }),
  fetchGameById: jest.fn().mockResolvedValue(null),
  createGame: jest.fn().mockResolvedValue(null),
  updateGame: jest.fn().mockResolvedValue(null),
  deleteGame: jest.fn().mockResolvedValue(undefined),
};

export const favoritesApi = {
  fetchFavorites: jest.fn().mockResolvedValue([]),
  addToFavorites: jest.fn().mockResolvedValue(null),
  removeFromFavorites: jest.fn().mockResolvedValue(undefined),
};
