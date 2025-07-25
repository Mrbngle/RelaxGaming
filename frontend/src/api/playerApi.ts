
import apiClient from './apiClient';
import { Player } from './../store/slices/leaderboardSlice';

export const getLeaderboard = async (): Promise<Player[]> => {
  const response = await apiClient.get<Player[]>('/leaderboard');
  return response.data;
};

export const getAllPlayers = async (): Promise<Player[]> => {
  const response = await apiClient.get<Player[]>('/players');
  return response.data;
};

export const createPlayer = async (player: { name: string; score: number }): Promise<Player> => {
  const response = await apiClient.post<Player>('/players', player);
  return response.data;
};

export const updatePlayerScore = async (id: string, score: number): Promise<Player> => {
  const response = await apiClient.put<Player>(`/players/${id}/score`, { score });
  return response.data;
};

export const deletePlayer = async (id: string) => {
  await apiClient.delete(`/players/${id}`);
};
