import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../styles/Litmus.scss';

class Litmus extends PureComponent {
  render() {
    const { isCorrect } = this.props;
    const renderText = isCorrect ? '✓' : 'x';

    return (
      <div className={classNames('litmus' , isCorrect ? 'correct' : 'wrong')}>
        {isCorrect !== null && renderText}
      </div>
    );
  }
}

Litmus.props = {
  isCorrect: PropTypes.bool
}

export default Litmus;
