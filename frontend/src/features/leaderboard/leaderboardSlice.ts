
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as playerApi from '../../api/playerApi';

export interface Player {
  id: string;
  name: string;
  score: number;
  lastUpdated: string;
}

interface LeaderboardState {
  players: Player[];
  allPlayers: Player[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeaderboardState = {
  players: [],
  allPlayers: [],
  status: 'idle',
  error: null,
};

export const getLeaderboard = createAsyncThunk('leaderboard/getLeaderboard', async () => {
  const response = await playerApi.getLeaderboard();
  return response;
});

export const getAllPlayers = createAsyncThunk('leaderboard/getAllPlayers', async () => {
  const response = await playerApi.getAllPlayers();
  return response;
});

export const createPlayer = createAsyncThunk('leaderboard/createPlayer', async (player: { name: string; score: number }) => {
  const response = await playerApi.createPlayer(player);
  return response;
});

export const updatePlayerScore = createAsyncThunk('leaderboard/updatePlayerScore', async (player: { id: string; score: number }) => {
  const response = await playerApi.updatePlayerScore(player.id, player.score);
  return response;
});

export const deletePlayer = createAsyncThunk('leaderboard/deletePlayer', async (id: string) => {
  await playerApi.deletePlayer(id);
  return id;
});

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players = action.payload;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.allPlayers = action.payload;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.players.push(action.payload);
        state.allPlayers.push(action.payload);
      })
      .addCase(updatePlayerScore.fulfilled, (state, action) => {
        const index = state.players.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
        const allPlayersIndex = state.allPlayers.findIndex((p) => p.id === action.payload.id);
        if (allPlayersIndex !== -1) {
          state.allPlayers[allPlayersIndex] = action.payload;
        }
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.players = state.players.filter((p) => p.id !== action.payload);
        state.allPlayers = state.allPlayers.filter((p) => p.id !== action.payload);
      });
  },
});

export default leaderboardSlice.reducer;
