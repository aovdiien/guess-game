import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/Footer.scss';

class Footer extends PureComponent {
  render() {
    const { gameCount } = this.props;

    return (
      <div className="footer">
        {`Game #${gameCount}`}
      </div>
    );
  }
};

Footer.props = {
  gameCount: PropTypes.number
}

export default Footer;
