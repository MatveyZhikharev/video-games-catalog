import { Router } from 'express';
import { gamesController } from '../controllers/games.controller.js';

const router = Router();

// GET /api/games - Get all games with filters
router.get('/', (req, res) => gamesController.getAll(req, res));

// GET /api/games/:id - Get game by ID
router.get('/:id', (req, res) => gamesController.getById(req, res));

// POST /api/games - Create a new game
router.post('/', (req, res) => gamesController.create(req, res));

// PATCH /api/games/:id - Update a game
router.patch('/:id', (req, res) => gamesController.update(req, res));

// DELETE /api/games/:id - Delete a game
router.delete('/:id', (req, res) => gamesController.delete(req, res));

export default router;
