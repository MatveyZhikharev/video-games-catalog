import { Router } from 'express';
import { aiController } from '../controllers/ai.controller.js';

const router = Router();

// GET /api/ai/moods - Get available moods for recommendations
router.get('/moods', (req, res) => aiController.getMoods(req, res));

// POST /api/ai/recommend - Get AI-powered game recommendations
router.post('/recommend', (req, res) => aiController.getRecommendations(req, res));

export default router;
