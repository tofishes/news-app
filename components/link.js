import React, { Component } from 'react';
import { Alert, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

export default class Link extends Component {
  onClick() {
    Alert(this.props.href);
  }

  render() {
    return <TouchableHighlight onClick={this.onClick}>{this.props.children}</TouchableHighlight>;
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
