import { Request, Response } from 'express';
import { aiService } from '../services/ai.service.js';

export class AIController {
  async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const { mood, preferences, limit } = req.body;
      
      if (!mood) {
        res.status(400).json({ 
          error: 'mood is required',
          availableMoods: aiService.getAvailableMoods(),
        });
        return;
      }
      
      const recommendations = await aiService.getRecommendations({
        mood,
        preferences,
        limit,
      });
      
      res.json({
        mood,
        recommendations,
        count: recommendations.length,
      });
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      res.status(500).json({ error: 'Failed to get recommendations' });
    }
  }

  async getMoods(_req: Request, res: Response): Promise<void> {
    try {
      const moods = aiService.getAvailableMoods();
      res.json({ moods });
    } catch (error) {
      console.error('Error getting moods:', error);
      res.status(500).json({ error: 'Failed to get moods' });
    }
  }
}

export const aiController = new AIController();
