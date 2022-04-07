import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const heading1 = screen.getByText(/State Management in React/i);
  const heading2 = screen.getByText(/Welcome JGarcia/i);
  expect(heading1).toBeInTheDocument();
  expect(heading2).toBeInTheDocument();
});
