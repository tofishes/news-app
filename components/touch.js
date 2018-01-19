import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default function Touch(props) {
  const { children, ...others } = props;
  return <TouchableOpacity {...others}>{children}</TouchableOpacity>;
}

Touch.propTypes = {
  children: PropTypes.element.isRequired
};
