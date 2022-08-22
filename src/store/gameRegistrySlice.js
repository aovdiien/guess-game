import { createSlice } from '@reduxjs/toolkit';

import { getRandomFourDigitsString } from '../utils';

// structure of history object array
/*
[...{
  round: 2,
  gameGuess: '1234'
  userGuess: '2345'
}...]
*/
const initialState = {
  guess: getRandomFourDigitsString(),
  round: 1,
  history: []
};

export const gameRegistrySlice = createSlice({
  name: 'gameRegistry',
  initialState,
  reducers: {
    initiateNewGame: (state, action) => {
      state.history = [
        ...state.history,
        {
          userGuess: action.payload,
          gameGuess: state.guess,
          round: state.round
        }
      ];
      state.round += 1;
      state.guess = getRandomFourDigitsString();
    },
    reset: () => initialState
  }
});

export const { initiateNewGame, reset } = gameRegistrySlice.actions;

export const selectGameHistory = (state) => state.gameRegistry.history;
export const selectGameRound = (state) => state.gameRegistry.round;
export const selectGameGuess = (state) => state.gameRegistry.guess;

export default gameRegistrySlice.reducer;
