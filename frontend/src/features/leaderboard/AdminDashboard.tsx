import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlayer, updatePlayerScore, deletePlayer, getAllPlayers } from './leaderboardSlice';
import { AppDispatch, RootState } from '../../store/store';
import { toast } from 'react-toastify';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allPlayers, status } = useSelector((state: RootState) => state.leaderboard);

  const [createName, setCreateName] = useState('');
  const [createScore, setCreateScore] = useState(0);

  const [updatePlayerId, setUpdatePlayerId] = useState('');
  const [updateScore, setUpdateScore] = useState(0);

  const [deletePlayerId, setDeletePlayerId] = useState('');

  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);

  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (createName && createScore) {
      try {
        await dispatch(createPlayer({ name: createName, score: createScore })).unwrap();
        toast.success('Player created successfully!');
        setCreateName('');
        setCreateScore(0);
        dispatch(getAllPlayers()); // Refresh all players for dropdown
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
        await dispatch(updatePlayerScore({ id: updatePlayerId, score: updateScore })).unwrap();
        toast.success('Player score updated successfully!');
        setUpdatePlayerId('');
        setUpdateScore(0);
        dispatch(getAllPlayers()); // Refresh all players for dropdown
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
        await dispatch(deletePlayer(deletePlayerId)).unwrap();
        toast.success('Player deleted successfully!');
        setDeletePlayerId('');
        dispatch(getAllPlayers()); // Refresh all players for dropdown
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

      <div className="card mb-4">
        <div className="card-header">Create New Player</div>
        <div className="card-body">
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
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Update Player Score</div>
        <div className="card-body">
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
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Delete Player</div>
        <div className="card-body">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;