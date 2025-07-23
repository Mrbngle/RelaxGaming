
import * as leaderboardService from '../services/leaderboard';

describe('Leaderboard Service', () => {
  it('should create a player', () => {
    const player = leaderboardService.createPlayer('test', 100);
    expect(player.name).toBe('test');
    expect(player.score).toBe(100);
  });

  it('should get the leaderboard', () => {
    leaderboardService.createPlayer('test1', 100);
    leaderboardService.createPlayer('test2', 200);
    const leaderboard = leaderboardService.getLeaderboard();
    expect(leaderboard.length).toBe(2);
    expect(leaderboard[0].name).toBe('test2');
  });

  it('should update a player score', () => {
    const player = leaderboardService.createPlayer('test', 100);
    const updatedPlayer = leaderboardService.updatePlayerScore(player.id, 200);
    expect(updatedPlayer.score).toBe(200);
  });

  it('should delete a player', () => {
    const player = leaderboardService.createPlayer('test', 100);
    leaderboardService.deletePlayer(player.id);
    const leaderboard = leaderboardService.getLeaderboard();
    expect(leaderboard.find((p) => p.id === player.id)).toBeUndefined();
  });
});
