import * as leaderboardService from '../services/leaderboard';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPlayers: any[] = [];
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      player: {
        findMany: jest.fn().mockImplementation(() => {
          return mockPlayers.sort((a, b) => b.score - a.score).slice(0, 10);
        }),
        create: jest.fn().mockImplementation((data) => {
          const newPlayer = { id: Date.now().toString(), lastUpdated: new Date(), ...data.data };
          mockPlayers.push(newPlayer);
          return newPlayer;
        }),
        update: jest.fn().mockImplementation(({ where, data }) => {
          const index = mockPlayers.findIndex((p) => p.id === where.id);
          if (index === -1) {
            throw new Error('Player not found');
          }
          mockPlayers[index] = { ...mockPlayers[index], ...data };
          return mockPlayers[index];
        }),
        delete: jest.fn().mockImplementation(({ where }) => {
          const index = mockPlayers.findIndex((p) => p.id === where.id);
          if (index === -1) {
            throw new Error('Player not found');
          }
          mockPlayers.splice(index, 1);
        }),
      },
    })),
  };
});

describe('Leaderboard Service', () => {
  beforeEach(() => {
    // Clear mock data before each test
    (prisma.player.findMany as jest.Mock).mockClear();
    (prisma.player.create as jest.Mock).mockClear();
    (prisma.player.update as jest.Mock).mockClear();
    (prisma.player.delete as jest.Mock).mockClear();
  });

  it('should create a player', async () => {
    const player = await leaderboardService.createPlayer('test', 100);
    expect(player.name).toBe('test');
    expect(player.score).toBe(100);
    expect(prisma.player.create).toHaveBeenCalledTimes(1);
  });

  it('should get the leaderboard', async () => {
    await leaderboardService.createPlayer('test1', 100);
    await leaderboardService.createPlayer('test2', 200);
    const leaderboard = await leaderboardService.getLeaderboard();
    expect(leaderboard.length).toBe(2);
    expect(leaderboard[0].name).toBe('test2');
    expect(prisma.player.findMany).toHaveBeenCalledTimes(1);
  });

  it('should update a player score', async () => {
    const player = await leaderboardService.createPlayer('test', 100);
    const updatedPlayer = await leaderboardService.updatePlayerScore(player.id, 200);
    expect(updatedPlayer.score).toBe(200);
    expect(prisma.player.update).toHaveBeenCalledTimes(1);
  });

  it('should delete a player', async () => {
    const player = await leaderboardService.createPlayer('test', 100);
    await leaderboardService.deletePlayer(player.id);
    const leaderboard = await leaderboardService.getLeaderboard();
    expect(leaderboard.find((p) => p.id === player.id)).toBeUndefined();
    expect(prisma.player.delete).toHaveBeenCalledTimes(1);
  });
});