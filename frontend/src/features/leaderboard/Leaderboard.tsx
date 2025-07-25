import React, { useEffect } from 'react';
import { useLeaderboard } from '../../hooks/useLeaderboard';

const Leaderboard: React.FC = () => {
  const { players, status, error, fetchLeaderboard } = useLeaderboard();

  useEffect(() => {
    if (status === 'idle') {
      fetchLeaderboard();
    }
  }, [status, fetchLeaderboard]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
              <td>{new Date(player.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;