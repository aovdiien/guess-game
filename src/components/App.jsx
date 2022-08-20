import React, { Component } from 'react';

import { getRandomFourDigitsString } from '../utils';
import DigitInput from './DigitInput';
import Litmus from './Litmus';
import FireworksEffect from './FireworksEffect';

import '../styles/App.scss';

const DIGIT_LENGTH = 4;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameRoundCount: 1,
      digitInputValue: null,
      currentRandomGuess: getRandomFourDigitsString()
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  resetGame(value) {
    this.setState({
      gameRoundCount: this.state.gameRoundCount + 1,
      digitInputValue: value[value.length - 1],
      currentRandomGuess: getRandomFourDigitsString()
    });
  }

  areEnteredDigitsCorrect() {
    const { currentRandomGuess, digitInputValue } = this.state;

    if (digitInputValue === null || digitInputValue === '') {
      return null;
    }

    const randomGuessCompare = currentRandomGuess.slice(0, digitInputValue?.length);

    return randomGuessCompare === digitInputValue;
  }

  onInputChange(value) {
    if (value.length > DIGIT_LENGTH) {
      this.resetGame(value);
    } else {
      this.setState({
        digitInputValue: value
      });
    }
  }

  render() {
    const { currentRandomGuess, digitInputValue, gameRoundCount } = this.state;

    return (
      <div className="App">
        {digitInputValue?.length === DIGIT_LENGTH && digitInputValue === currentRandomGuess && (
          <FireworksEffect />
        )}
        <div className="hint">{gameRoundCount} - {currentRandomGuess}</div>
        <div className="game-count">Game #{gameRoundCount}</div>
        <DigitInput
          onInputChange={this.onInputChange}
          value={digitInputValue ?? ''}
        />
        <Litmus isCorrect={this.areEnteredDigitsCorrect()} />
      </div>
    );
  }
}

export default App;
