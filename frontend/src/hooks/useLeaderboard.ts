
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { getLeaderboard, getAllPlayers, createPlayer, updatePlayerScore, deletePlayer } from '../store/slices/leaderboardSlice';

export const useLeaderboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { players, allPlayers, status, error } = useSelector((state: RootState) => state.leaderboard);

  return {
    players,
    allPlayers,
    status,
    error,
    fetchLeaderboard: () => dispatch(getLeaderboard()),
    fetchAllPlayers: () => dispatch(getAllPlayers()),
    addPlayer: (player: { name: string; score: number }) => dispatch(createPlayer(player)),
    editPlayerScore: (player: { id: string; score: number }) => dispatch(updatePlayerScore(player)),
    removePlayer: (id: string) => dispatch(deletePlayer(id)),
  };
};
