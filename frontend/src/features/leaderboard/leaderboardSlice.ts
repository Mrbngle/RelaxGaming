import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export interface Player {
  id: string;
  name: string;
  score: number;
  lastUpdated: string;
}

interface LeaderboardState {
  players: Player[];
  allPlayers: Player[]; // New state for all players
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
  const response = await axios.get(`${API_URL}/leaderboard`);
  return response.data;
});

export const getAllPlayers = createAsyncThunk('leaderboard/getAllPlayers', async () => {
  const response = await axios.get(`${API_URL}/players`);
  return response.data;
});

export const createPlayer = createAsyncThunk('leaderboard/createPlayer', async (player: { name: string; score: number }) => {
  const response = await axios.post(`${API_URL}/players`, player);
  return response.data;
});

export const updatePlayerScore = createAsyncThunk('leaderboard/updatePlayerScore', async (player: { id: string; score: number }) => {
  const response = await axios.put(`${API_URL}/players/${player.id}/score`, { score: player.score });
  return response.data;
});

export const deletePlayer = createAsyncThunk('leaderboard/deletePlayer', async (id: string) => {
  await axios.delete(`${API_URL}/players/${id}`);
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