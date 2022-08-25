import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Footer from '../components/Footer';

describe('Footer Component: ', () => {
  const resetMock = jest.fn();
  const HINT = '5678';
  const INITIAL_GAME_ROUND = 4;
  const HISTORY = [
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
  ];
  const TIMES_WON = 1;
  const TIMES_LOST = 2;

  beforeEach(() => {
    render(
      <Footer
        history={HISTORY}
        gameRound={INITIAL_GAME_ROUND}
        hint={HINT}
        reset={resetMock}
      />
    );
  });

  test('is rendered correctly', () => {
    const gameNumberText = screen.getByText('Game #', {
      exact: false
    });

    expect(gameNumberText).toHaveTextContent(`Game #${INITIAL_GAME_ROUND}`);
  });

  test('has correct text about games won', () => {
    const gameWonText = screen.getByText('You won', { exact: false });

    expect(gameWonText).toHaveTextContent(`You won ${TIMES_WON} time`);
  });

  test('has correct text about games lost', () => {
    const gameLostText = screen.getByText('You lost', { exact: false });

    expect(gameLostText).toHaveTextContent(`You lost ${TIMES_LOST} times`);
  });

  test('has correctly rendered hint', () => {
    const gameLostText = screen.getByText('Hint:', { exact: false });

    expect(gameLostText).toHaveTextContent(`Hint: ${HINT}`);
  });

  test('has "Reset history" link, which when clicked calls "reset" callback', async () => {
    const resetHistoryLink = screen.getByText('Reset history', {
      exact: false
    });

    expect(resetHistoryLink).toHaveTextContent('Reset history');

    fireEvent.click(resetHistoryLink);

    await waitFor(() => {
      expect(resetMock).toHaveBeenCalledTimes(1);
    });
  });
});
