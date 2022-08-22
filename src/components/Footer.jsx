import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/Footer.scss';

class Footer extends PureComponent {
  static renderTimesWord(count) {
    return count === 1 ? 'time' : 'times';
  }

  renderGameRoundLabel() {
    const { gameRound } = this.props;

    return <span>Game #{gameRound}</span>;
  }

  renderYouWonLabel() {
    const { history } = this.props;

    if (history.length === 0) {
      return null;
    }

    const wonCount = history.reduce(
      (timesWon, game) =>
        game.userGuess === game.gameGuess ? timesWon + 1 : timesWon,
      0
    );

    return (
      <span>
        You won {wonCount} {Footer.renderTimesWord(wonCount)}! 😁
      </span>
    );
  }

  renderYouLostLabel() {
    const { history } = this.props;

    if (history.length === 0) {
      return null;
    }

    const lostCount = history.reduce(
      (timesLost, game) =>
        game.userGuess !== game.gameGuess ? timesLost + 1 : timesLost,
      0
    );

    return (
      <span>
        You lost {lostCount} {Footer.renderTimesWord(lostCount)}! 🤪
      </span>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderResetHistoryLabel() {
    return null;
  }

  renderHint() {
    const { hint } = this.props;

    if (!hint) {
      return null;
    }

    return <span className="hint">Hint: {hint}</span>;
  }

  render() {
    return (
      <div className="footer">
        {this.renderGameRoundLabel()}
        {this.renderYouWonLabel()}
        {this.renderYouLostLabel()}
        {this.renderResetHistoryLabel()}
        {this.renderHint()}
      </div>
    );
  }
}

Footer.props = {
  gameRound: PropTypes.number,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      round: PropTypes.number.isRequired,
      gameGuess: PropTypes.string.isRequired,
      userGuess: PropTypes.string
    })
  ).isRequired,
  hint: PropTypes.string
};

export default Footer;
