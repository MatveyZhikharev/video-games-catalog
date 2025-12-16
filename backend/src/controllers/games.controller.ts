import { Request, Response } from 'express';
import { gamesService } from '../services/games.service.js';
import type { GameFilters } from '../types/index.js';

export class GamesController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filters: GameFilters = {
        search: req.query.search as string,
        platforms: req.query.platforms ? (req.query.platforms as string).split(',') : undefined,
        genres: req.query.genres ? (req.query.genres as string).split(',') : undefined,
        sortBy: req.query.sortBy as GameFilters['sortBy'],
        sortOrder: req.query.sortOrder as GameFilters['sortOrder'],
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 12,
      };

      const result = await gamesService.getAll(filters);
      res.json(result);
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ error: 'Failed to fetch games' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const game = await gamesService.getById(id);
      
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      
      res.json(game);
    } catch (error) {
      console.error('Error fetching game:', error);
      res.status(500).json({ error: 'Failed to fetch game' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const game = await gamesService.create(req.body);
      res.status(201).json(game);
    } catch (error) {
      console.error('Error creating game:', error);
      res.status(500).json({ error: 'Failed to create game' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const game = await gamesService.update(id, req.body);
      
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      
      res.json(game);
    } catch (error) {
      console.error('Error updating game:', error);
      res.status(500).json({ error: 'Failed to update game' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await gamesService.delete(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting game:', error);
      res.status(500).json({ error: 'Failed to delete game' });
    }
  }
}

export const gamesController = new GamesController();
