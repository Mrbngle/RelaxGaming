
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLeaderboard = async () => {
  return await prisma.player.findMany({
    orderBy: {
      score: 'desc',
    },
    take: 10,
  });
};

export const getAllPlayers = async () => {
  return await prisma.player.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const createPlayer = async (name: string, score: number) => {
  return await prisma.player.create({
    data: {
      name,
      score,
    },
  });
};

export const updatePlayerScore = async (id: string, score: number) => {
  const player = await prisma.player.update({
    where: { id },
    data: { score, lastUpdated: new Date() },
  });
  return player;
};

export const deletePlayer = async (id: string) => {
  await prisma.player.delete({
    where: { id },
  });
};
