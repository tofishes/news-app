import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';

export default class Loading extends PureComponent {
  render() {
    return <ActivityIndicator animating={this.props.show} size="small" color="#0f0" />;
  }
}

Loading.defaultProps = {
  show: true
};

Loading.propTypes = {
  show: PropTypes.bool
};
