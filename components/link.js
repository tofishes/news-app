import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

class Link extends Component {
  onPress() {
    const { navigate } = this.props.navigation;
    const { screen, param } = this.props.to;

    navigate(screen, param);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

Link.defaultProps = {
  to: {}
};

Link.propTypes = {
  to: PropTypes.object,
  children: PropTypes.element.isRequired,
  navigation: PropTypes.any.isRequired
};

export default withNavigation(Link);
