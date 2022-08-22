import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as CheckMark } from '../svg/check-mark.svg';
import { ReactComponent as CrossMark } from '../svg/cross-mark.svg';

import '../styles/Litmus.scss';

class Litmus extends PureComponent {
  render() {
    const { isCorrect } = this.props;
    const renderText = isCorrect ? <CheckMark /> : <CrossMark />;

    return (
      <div className={classNames('litmus', isCorrect ? 'correct' : 'wrong')}>
        {isCorrect !== null && renderText}
      </div>
    );
  }
}

Litmus.props = {
  isCorrect: PropTypes.bool
};

export default Litmus;
