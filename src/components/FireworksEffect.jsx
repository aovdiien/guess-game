import React, { PureComponent } from "react";

import '../styles/FireworksEffect.scss';

class FireworksEffect extends PureComponent {
  render() {
    return (
      <div className="fireworks-effect">
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>
    );
  }
}

export default FireworksEffect;
