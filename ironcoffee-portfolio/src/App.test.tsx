import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  expect(screen.getAllByText(/portfolio/i).length).toBeGreaterThan(0);
});
