
import { Player } from '../models/player';

let players: Player[] = [];

export const getLeaderboard = () => {
  return players.sort((a, b) => b.score - a.score).slice(0, 10);
};

export const createPlayer = (name: string, score: number) => {
  const newPlayer: Player = {
    id: Date.now().toString(),
    name,
    score,
    lastUpdated: new Date(),
  };
  players.push(newPlayer);
  return newPlayer;
};

export const updatePlayerScore = (id: string, score: number) => {
  const player = players.find((p) => p.id === id);
  if (!player) {
    throw new Error('Player not found');
  }
  player.score = score;
  player.lastUpdated = new Date();
  return player;
};

export const deletePlayer = (id: string) => {
  const index = players.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error('Player not found');
  }
  players.splice(index, 1);
};
