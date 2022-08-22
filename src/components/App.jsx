import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  initiateNewGame,
  selectGameGuess,
  selectGameRound,
  selectGameHistory,
  reset
} from '../store/gameRegistrySlice';
import DigitInput from './DigitInput';
import Litmus from './Litmus';
import FireworksEffect from './FireworksEffect';
import Footer from './Footer';

import '../styles/App.scss';

const DIGIT_LENGTH = 4; // 4 digits
const SHOW_HINT_TIMEOUT_MS = 3000; // 3 seconds

class App extends Component {
  constructor(props) {
    super(props);

    this.hintTimeout = null;
    this.state = {
      digitInputValue: null,
      hint: null
    };
  }

  resetGame(value) {
    const { digitInputValue } = this.state;

    this.props.initiateNewGame(digitInputValue);

    this.setState({
      digitInputValue: value && value[value.length - 1]
    });
  }

  areEnteredDigitsCorrect() {
    const { digitInputValue } = this.state;

    if (digitInputValue === null || digitInputValue === '') {
      return null;
    }

    const { gameGuess } = this.props;

    return gameGuess.slice(0, digitInputValue?.length) === digitInputValue;
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

  onKeyDown(event) {
    if (event?.key === 'h' || event?.key === 'H') {
      clearTimeout(this.hintTimeout);

      this.setState(
        {
          hint: this.state.hint === null ? this.props.gameGuess : null
        },
        () => {
          if (this.state.hint !== null) {
            this.hintTimeout = setTimeout(() => {
              this.setState({ hint: null });
            }, SHOW_HINT_TIMEOUT_MS);
          }
        }
      );
    }

    if (
      event?.key === 'Enter' &&
      this.state.digitInputValue?.length === DIGIT_LENGTH
    ) {
      this.resetGame(null);
    }
  }

  render() {
    const { digitInputValue, hint } = this.state;
    const { gameGuess, gameHistory, gameRound } = this.props;

    return (
      <Fragment>
        <div className="App" onKeyDown={(event) => this.onKeyDown(event)}>
          <FireworksEffect
            isShown={
              digitInputValue?.length === DIGIT_LENGTH &&
              digitInputValue === gameGuess
            }
          />
          <DigitInput
            onInputChange={(value) => this.onInputChange(value)}
            value={digitInputValue ?? ''}
          />
          <Litmus isCorrect={this.areEnteredDigitsCorrect()} />
        </div>
        <Footer
          gameRound={gameRound}
          history={gameHistory}
          hint={hint}
          reset={this.props.reset}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  gameRound: selectGameRound(state),
  gameGuess: selectGameGuess(state),
  gameHistory: selectGameHistory(state)
});

const mapDispatchToProps = {
  initiateNewGame,
  reset
};

App.props = {
  gameRound: PropTypes.number.isRequired,
  gameGuess: PropTypes.string.isRequired,
  initiateNewGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
