import React from 'react';
import { Path } from 'react-native-svg';

import icons from './icon-map.json';

const iconMap = {};

Object.keys(icons).map(name => {
  const svg = <Path d={icons[name]} />;
  const viewBox = '0 0 24 24'; // 24是https://materialdesignicons.com/上标准的大小
  iconMap[name] = { svg, viewBox };

  return name;
});

export default iconMap;
