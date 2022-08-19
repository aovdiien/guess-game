import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/DigitInput.scss';

class DigitInput extends PureComponent {
  render() {
    const { onInputChange, value } = this.props;

    return (
      <div className="digit-input-wrapper">
        <label htmlFor="guess-digit">Guess a Digit</label>
        <input id="guess-digit" value={value} onChange={(event) => onInputChange(event.target.value)} />
      </div>
    );
  }
}

DigitInput.props = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default DigitInput;
