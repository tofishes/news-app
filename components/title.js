import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../libs/styles';

const maxFontSize = 20;
const levels = 6;
const styleMap = {
  base: {
    color: colors.title,
    fontWeight: '600'
  }
};

for (let i = 1; i <= levels; i += 1) {
  const short = (i - 1) * 2;
  styleMap[`h${i}`] = {
    fontSize: maxFontSize - short
  };
}

const styles = StyleSheet.create(styleMap);

export default function Title(props, level) {
  return (
    <View>
      <Text style={[styles.base, styles[level], props.style]}>{props.children}</Text>
    </View>
  );
}

Title.defaultProps = {
  children: null,
};

Title.propTypes = {
  children: PropTypes.element,
  style: ViewPropTypes.style // eslint-disable-line
};

export function H1(props) {
  return Title(props, 'h1');  // eslint-disable-line
}
export function H2(props) {
  return Title(props, 'h2');  // eslint-disable-line
}
export function H3(props) {
  return Title(props, 'h3');  // eslint-disable-line
}
export function H4(props) {
  return Title(props, 'h4');  // eslint-disable-line
}
export function H5(props) {
  return Title(props, 'h5');  // eslint-disable-line
}
export function H6(props) {
  return Title(props, 'h6');  // eslint-disable-line
}

