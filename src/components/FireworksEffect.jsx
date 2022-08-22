import React, { PureComponent } from 'react';

import '../styles/FireworksEffect.scss';

class FireworksEffect extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { show } = this.props;

    return (
      <div className="fireworks-effect">
        {show && (
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        )}
      </div>
    );
  }
}

export default FireworksEffect;
