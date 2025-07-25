
import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from './slices/leaderboardSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
