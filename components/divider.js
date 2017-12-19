import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, pixel } from '../libs/styles';

const styles = StyleSheet.create({
  base: {
    borderColor: colors.line,
    borderStyle: 'solid',
    borderTopWidth: pixel.onePx,
    marginVertical: 5
  },
  vertical: {
    marginHorizontal: 15,
    marginVertical: 0,
    borderTopWidth: 0,
    borderLeftWidth: pixel.onePx
  }
});

export default function Divider(props) {
  if (props.vertical) {
    return <Text style={[styles.base, styles.vertical]} {...props} />;
  }

  return <View style={styles.base} {...props} />;
}

Divider.defaultProps = {
  vertical: false
};

Divider.propTypes = {
  vertical: PropTypes.bool
};
