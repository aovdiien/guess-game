import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/FireworksEffect.scss';

class FireworksEffect extends PureComponent {
  render() {
    const { isShown } = this.props;

    return (
      <div className="fireworks-effect">
        {isShown && (
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        )}
      </div>
    );
  }
}

FireworksEffect.props = {
  isShown: PropTypes.bool.isRequired
};

export default FireworksEffect;
