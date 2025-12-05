import { db } from '../config/database.js';
import type { Favorite, CreateFavoriteDTO } from '../types/index.js';

export class FavoritesService {
  async getByUserId(userId: string): Promise<Favorite[]> {
    return await db.any<Favorite>(
      'SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
  }

  async add(data: CreateFavoriteDTO): Promise<Favorite> {
    const { user_id, game_id } = data;
    
    // Check if already exists
    const existing = await db.oneOrNone<Favorite>(
      'SELECT * FROM favorites WHERE user_id = $1 AND game_id = $2',
      [user_id, game_id]
    );
    
    if (existing) {
      return existing;
    }

    return await db.one<Favorite>(
      'INSERT INTO favorites (user_id, game_id) VALUES ($1, $2) RETURNING *',
      [user_id, game_id]
    );
  }

  async remove(userId: string, gameId: string): Promise<boolean> {
    try {
      const result = await db.result(
        'DELETE FROM favorites WHERE user_id = $1 AND game_id = $2',
        [userId, gameId]
      );
      return result.rowCount > 0;
    } catch {
      return false;
    }
  }

  async isFavorite(userId: string, gameId: string): Promise<boolean> {
    const result = await db.oneOrNone(
      'SELECT 1 FROM favorites WHERE user_id = $1 AND game_id = $2',
      [userId, gameId]
    );
    return result !== null;
  }
}

export const favoritesService = new FavoritesService();
