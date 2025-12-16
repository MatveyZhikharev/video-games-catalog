import { Router } from 'express';
import { favoritesController } from '../controllers/favorites.controller.js';

const router = Router();

// GET /api/favorites - Get user's favorites
router.get('/', (req, res) => favoritesController.getByUser(req, res));

// GET /api/favorites/check - Check if game is favorited
router.get('/check', (req, res) => favoritesController.check(req, res));

// POST /api/favorites - Add to favorites
router.post('/', (req, res) => favoritesController.add(req, res));

// DELETE /api/favorites - Remove from favorites
router.delete('/', (req, res) => favoritesController.remove(req, res));

export default router;
