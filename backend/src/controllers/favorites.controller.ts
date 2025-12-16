import { Request, Response } from 'express';
import { favoritesService } from '../services/favorites.service.js';
import { gamesService } from '../services/games.service.js';

export class FavoritesController {
  async getByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }
      
      const favorites = await favoritesService.getByUserId(userId);
      
      // Get full game data for each favorite
      const gameIds = favorites.map(f => f.game_id);
      const games = await gamesService.getByIds(gameIds);
      
      res.json({
        favorites,
        games,
      });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Failed to fetch favorites' });
    }
  }

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, game_id } = req.body;
      
      if (!user_id || !game_id) {
        res.status(400).json({ error: 'user_id and game_id are required' });
        return;
      }
      
      const favorite = await favoritesService.add({ user_id, game_id });
      res.status(201).json(favorite);
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).json({ error: 'Failed to add favorite' });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.userId as string;
      const gameId = req.query.gameId as string;
      
      if (!userId || !gameId) {
        res.status(400).json({ error: 'userId and gameId are required' });
        return;
      }
      
      const removed = await favoritesService.remove(userId, gameId);
      
      if (!removed) {
        res.status(404).json({ error: 'Favorite not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Failed to remove favorite' });
    }
  }

  async check(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.userId as string;
      const gameId = req.query.gameId as string;
      
      if (!userId || !gameId) {
        res.status(400).json({ error: 'userId and gameId are required' });
        return;
      }
      
      const isFavorite = await favoritesService.isFavorite(userId, gameId);
      res.json({ isFavorite });
    } catch (error) {
      console.error('Error checking favorite:', error);
      res.status(500).json({ error: 'Failed to check favorite' });
    }
  }
}

export const favoritesController = new FavoritesController();
