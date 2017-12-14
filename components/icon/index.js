/**
 * 图标来源于 https://materialdesignicons.com/
 * 找图标名称可以从该网站获取
 */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'react-native-svg-icon';
import svgs from './svgs';

const Icon = props => {
  const {
    width,
    height,
    color,
    ...others
  } = props;

  return <SvgIcon width={width} height={`${height || width}`} fill={color} {...others} svgs={svgs} />;
};

Icon.defaultProps = {
  color: '#aaa',
  width: 24,
  height: null
};

Icon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default Icon;
