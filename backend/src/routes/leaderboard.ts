import { Router } from 'express';
import { getLeaderboard, createPlayer, updatePlayerScore, deletePlayer, getAllPlayers } from '../controllers/leaderboard';

const router = Router();

router.get('/leaderboard', getLeaderboard);
router.get('/players', getAllPlayers);
router.post('/players', createPlayer);
router.put('/players/:id/score', updatePlayerScore);
router.delete('/players/:id', deletePlayer);

export default router;