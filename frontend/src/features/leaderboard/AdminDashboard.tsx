
import React, { useState, useEffect } from 'react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { toast } from 'react-toastify';
import CardDashboard from '../../components/CardDashboard';

const AdminDashboard: React.FC = () => {
  const { allPlayers, fetchAllPlayers, addPlayer, editPlayerScore, removePlayer } = useLeaderboard();

  const [createName, setCreateName] = useState('');
  const [createScore, setCreateScore] = useState(0);

  const [updatePlayerId, setUpdatePlayerId] = useState('');
  const [updateScore, setUpdateScore] = useState(0);

  const [deletePlayerId, setDeletePlayerId] = useState('');

  // Fetch all players only once when the component mounts
  useEffect(() => {
    fetchAllPlayers();
  }, []); // Empty dependency array means it runs once on mount

  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (createName && createScore) {
      try {
        await addPlayer({ name: createName, score: createScore }).unwrap();
        toast.success('Player created successfully!');
        setCreateName('');
        setCreateScore(0);
        fetchAllPlayers(); // Refresh all players for dropdown
      } catch (error: any) {
        toast.error(`Error creating player: ${error.message}`);
      }
    } else {
      toast.warn('Please enter both name and score for new player.');
    }
  };

  const handleUpdatePlayerScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatePlayerId && updateScore) {
      try {
        await editPlayerScore({ id: updatePlayerId, score: updateScore }).unwrap();
        toast.success('Player score updated successfully!');
        setUpdatePlayerId('');
        setUpdateScore(0);
        fetchAllPlayers(); // Refresh all players for dropdown
      } catch (error: any) {
        toast.error(`Error updating player score: ${error.message}`);
      }
    } else {
      toast.warn('Please select a player and enter a new score.');
    }
  };

  const handleDeletePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deletePlayerId) {
      try {
        await removePlayer(deletePlayerId).unwrap();
        toast.success('Player deleted successfully!');
        setDeletePlayerId('');
        fetchAllPlayers(); // Refresh all players for dropdown
      } catch (error: any) {
        toast.error(`Error deleting player: ${error.message}`);
      }
    } else {
      toast.warn('Please select a player to delete.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <CardDashboard title="Create New Player">
        <form onSubmit={handleCreatePlayer}>
          <div className="mb-3">
            <label htmlFor="createName" className="form-label">Player Name</label>
            <input
              type="text"
              className="form-control"
              id="createName"
              placeholder="Enter player name"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="createScore" className="form-label">Initial Score</label>
            <input
              type="number"
              className="form-control"
              id="createScore"
              value={createScore}
              onChange={(e) => setCreateScore(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Player</button>
        </form>
      </CardDashboard>

      <CardDashboard title="Update Player Score">
        <form onSubmit={handleUpdatePlayerScore}>
          <div className="mb-3">
            <label htmlFor="updatePlayer" className="form-label">Select Player</label>
            <select
              className="form-select"
              id="updatePlayer"
              value={updatePlayerId}
              onChange={(e) => setUpdatePlayerId(e.target.value)}
              required
            >
              <option value="">-- Select a player --</option>
              {allPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} (Current Score: {player.score})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="updateScore" className="form-label">New Score</label>
            <input
              type="number"
              className="form-control"
              id="updateScore"
              value={updateScore}
              onChange={(e) => setUpdateScore(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">Update Score</button>
        </form>
      </CardDashboard>

      <CardDashboard title="Delete Player">
        <form onSubmit={handleDeletePlayer}>
          <div className="mb-3">
            <label htmlFor="deletePlayer" className="form-label">Select Player</label>
            <select
              className="form-select"
              id="deletePlayer"
              value={deletePlayerId}
              onChange={(e) => setDeletePlayerId(e.target.value)}
              required
            >
              <option value="">-- Select a player --</option>
              {allPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} (ID: {player.id})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-danger">Delete Player</button>
        </form>
      </CardDashboard>
    </div>
  );
};

export default AdminDashboard;
