
import { Router } from 'express';
import { getLeaderboard, createPlayer, updatePlayerScore, deletePlayer, getAllPlayers } from '../controllers/leaderboard';
import { login } from '../controllers/auth';
import { protect } from '../middlewares/auth';

const router = Router();

// Public routes
router.get('/leaderboard', getLeaderboard);
router.post('/login', login);

// Protected routes (Admin)
router.get('/players', protect, getAllPlayers);
router.post('/players', protect, createPlayer);
router.put('/players/:id/score', protect, updatePlayerScore);
router.delete('/players/:id', protect, deletePlayer);

export default router;
