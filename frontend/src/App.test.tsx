import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const linkElement = screen.getByText(/Leaderboard/i);
  expect(linkElement).toBeInTheDocument();
});