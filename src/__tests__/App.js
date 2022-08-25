import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../utils/testUtils';
import App from '../components/App';

describe('App component: ', () => {
  const INITIAL_STATE = {
    gameRegistry: {
      guess: '7890',
      round: 4,
      history: [
        {
          round: 1,
          gameGuess: '1234',
          userGuess: '2345'
        },
        {
          round: 2,
          gameGuess: '3456',
          userGuess: '3456'
        },
        {
          round: 3,
          gameGuess: '5678',
          userGuess: '7890'
        }
      ]
    }
  };
  const TIMES_WON = 1;
  const TIMES_LOST = 2;

  let inputElement;

  beforeEach(() => {
    renderWithProviders(<App />, {
      preloadedState: INITIAL_STATE
    });

    inputElement = screen.getByLabelText('Guess a 4-Digit Number');
  });

  test('is rendered correctly', async () => {
    expect(inputElement).toBeInTheDocument();
  });

  test('correct guess flow', async () => {
    inputElement.focus();
    await userEvent.keyboard(INITIAL_STATE.gameRegistry.guess);

    expect(inputElement).toHaveValue(INITIAL_STATE.gameRegistry.guess);

    await userEvent.keyboard('{Enter}');

    expect(inputElement).toHaveValue('');

    const youWonText = screen.getByText('You won', { exact: false });

    expect(youWonText).toHaveTextContent(`You won ${TIMES_WON + 1} times`);
  });

  test('wrong guess flow', async () => {
    const WRONG_GUESS = '0000';

    inputElement.focus();
    await userEvent.keyboard(WRONG_GUESS);

    expect(inputElement).toHaveValue(WRONG_GUESS);

    await userEvent.keyboard('{Enter}');

    expect(inputElement).toHaveValue('');

    const youLostText = screen.getByText('You lost', { exact: false });

    expect(youLostText).toHaveTextContent(`You lost ${TIMES_LOST + 1} times`);
  });

  test('hint to be shown on pressing "h"', async () => {
    inputElement.focus();
    await userEvent.keyboard('h');

    await waitFor(() => {
      const hint = screen.getByText('Hint:', { exact: false });

      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent(
        `Hint: ${INITIAL_STATE.gameRegistry.guess}`
      );
    });
  });
});
