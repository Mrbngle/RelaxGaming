import { Request, Response } from 'express';
import * as leaderboardService from '../services/leaderboard';

export const getLeaderboard = async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getLeaderboard();
  res.json(leaderboard);
};

export const createPlayer = async (req: Request, res: Response) => {
  const { name, score } = req.body;
  if (typeof name !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  try {
    const newPlayer = await leaderboardService.createPlayer(name, score);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePlayerScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { score } = req.body;
  if (typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  try {
    const updatedPlayer = await leaderboardService.updatePlayerScore(id, score);
    res.json(updatedPlayer);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await leaderboardService.deletePlayer(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};