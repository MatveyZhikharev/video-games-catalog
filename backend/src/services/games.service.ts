import { db } from '../config/database.js';
import type { Game, CreateGameDTO, UpdateGameDTO, GameFilters, PaginatedResponse } from '../types/index.js';

export class GamesService {
  async getAll(filters: GameFilters): Promise<PaginatedResponse<Game>> {
    const {
      search,
      platforms,
      genres,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = filters;

    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 1;

    // Search filter
    if (search) {
      conditions.push(`title ILIKE $${paramIndex}`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Platform filter
    if (platforms && platforms.length > 0) {
      conditions.push(`platforms && $${paramIndex}::text[]`);
      params.push(platforms);
      paramIndex++;
    }

    // Genre filter
    if (genres && genres.length > 0) {
      conditions.push(`genres && $${paramIndex}::text[]`);
      params.push(genres);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Validate sortBy to prevent SQL injection
    const validSortFields = ['rating', 'release_date', 'title'];
    const safeSortBy = validSortFields.includes(sortBy) ? sortBy : 'rating';
    const safeSortOrder = sortOrder === 'asc' ? 'ASC' : 'DESC';
    const orderClause = `ORDER BY ${safeSortBy} ${safeSortOrder} NULLS LAST`;

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM games ${whereClause}`;
    const countResult = await db.one(countQuery, params);
    const total = parseInt(countResult.count, 10);

    // Get paginated data
    const dataQuery = `
      SELECT * FROM games 
      ${whereClause} 
      ${orderClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(limit, offset);

    const data = await db.any<Game>(dataQuery, params);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string): Promise<Game | null> {
    try {
      return await db.oneOrNone<Game>('SELECT * FROM games WHERE id = $1', [id]);
    } catch {
      return null;
    }
  }

  async create(gameData: CreateGameDTO): Promise<Game> {
    const {
      title,
      description,
      release_date,
      rating,
      metacritic_score,
      platforms,
      genres,
      developer,
      publisher,
      cover_image,
      screenshots,
    } = gameData;

    return await db.one<Game>(
      `INSERT INTO games (title, description, release_date, rating, metacritic_score, platforms, genres, developer, publisher, cover_image, screenshots)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [title, description, release_date, rating, metacritic_score, platforms || [], genres || [], developer, publisher, cover_image, screenshots || []]
    );
  }

  async update(id: string, gameData: UpdateGameDTO): Promise<Game | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    Object.entries(gameData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) {
      return this.getById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    try {
      return await db.oneOrNone<Game>(
        `UPDATE games SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
        values
      );
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await db.result('DELETE FROM games WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch {
      return false;
    }
  }

  async getByIds(ids: string[]): Promise<Game[]> {
    if (ids.length === 0) return [];
    return await db.any<Game>('SELECT * FROM games WHERE id = ANY($1)', [ids]);
  }
}

export const gamesService = new GamesService();
