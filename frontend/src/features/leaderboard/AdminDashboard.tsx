
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlayer, updatePlayerScore, deletePlayer } from './leaderboardSlice';
import { AppDispatch } from '../../store/store';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [id, setId] = useState('');

  const handleCreatePlayer = () => {
    if (name && score) {
      dispatch(createPlayer({ name, score }));
    }
  };

  const handleUpdatePlayerScore = () => {
    if (id && score) {
      dispatch(updatePlayerScore({ id, score }));
    }
  };

  const handleDeletePlayer = () => {
    if (id) {
      dispatch(deletePlayer(id));
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Create Player</h3>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(Number(e.target.value))} />
        <button onClick={handleCreatePlayer}>Create</button>
      </div>
      <div>
        <h3>Update Player Score</h3>
        <input type="text" placeholder="Player ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="number" placeholder="New Score" value={score} onChange={(e) => setScore(Number(e.target.value))} />
        <button onClick={handleUpdatePlayerScore}>Update</button>
      </div>
      <div>
        <h3>Delete Player</h3>
        <input type="text" placeholder="Player ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={handleDeletePlayer}>Delete</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
