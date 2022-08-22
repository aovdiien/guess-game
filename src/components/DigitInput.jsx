import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/DigitInput.scss';

const DIGIT_INPUT_REGEX = /^\d*$/;

class DigitInput extends PureComponent {
  render() {
    const { onInputChange, value } = this.props;

    const onChange = (updatedValue) => {
      if (DIGIT_INPUT_REGEX.test(updatedValue)) {
        onInputChange(updatedValue);
      }
    };

    return (
      <div className="digit-input-wrapper">
        <label htmlFor="guess-digit">Guess a 4-Digit Number</label>
        <input
          id="guess-digit"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
      </div>
    );
  }
}

DigitInput.props = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default DigitInput;
