import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Modules header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Modules/i);
  expect(linkElement).toBeInTheDocument();
});
