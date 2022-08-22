import { render, screen } from '@testing-library/react';
import DigitInput from '../components/DigitInput';

test('renders input', () => {
  render(<DigitInput value="1234" />);
  const inputElement = screen.getByDisplayValue(/1234/);
  expect(inputElement).toBeInTheDocument();
});
