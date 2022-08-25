import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DigitInput from '../components/DigitInput';

describe('DigitInput Component: ', () => {
  const INPUT_VALUE = '1234';
  const onInputChangeMock = jest.fn();
  let inputElement;

  // TODO: Question: should tests also check propTypes and the actual correspondence of types ?
  beforeEach(() => {
    render(
      <DigitInput value={INPUT_VALUE} onInputChange={onInputChangeMock} />
    );

    inputElement = screen.getByLabelText('Guess a 4-Digit Number');
  });

  test('is rendered correctly', () => {
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(INPUT_VALUE);
  });

  test('onInputChange is NOT called when entering non-digit characters', async () => {
    const STRING_LETTER_VALUE = 'a';

    // entering letters should not trigger `onInputChange` event
    fireEvent.change(inputElement, { target: { value: STRING_LETTER_VALUE } });

    await waitFor(() => {
      expect(onInputChangeMock).not.toHaveBeenCalled();
    });
  });

  test('onInputChange is called with expected arguments whenever entering digit characters', async () => {
    const STRING_NUMBER_VALUE = '5';

    // entering digits triggers `onInputChange` event
    fireEvent.change(inputElement, { target: { value: STRING_NUMBER_VALUE } });

    await waitFor(() => {
      expect(onInputChangeMock).toHaveBeenCalledTimes(1);
      expect(onInputChangeMock).toHaveBeenCalledWith(STRING_NUMBER_VALUE);
    });
  });
});
