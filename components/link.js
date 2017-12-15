import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { alert } from '../components/tip';

export default class Link extends Component {
  onPress() {
    alert(this.props.href);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onPress.bind(this)}>
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
