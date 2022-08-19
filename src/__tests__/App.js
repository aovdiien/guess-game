import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders a guess digit label', () => {
  Object.defineProperty(window, 'crypto', {
    writable: true,
    value: {
      getRandomValues: jest.fn().mockImplementation(() => [12345])
    }
  });
  render(<App />);
  const labelElement = screen.getByLabelText(/Guess a Digit/i);
  expect(labelElement).toBeInTheDocument();
});
