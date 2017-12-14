import React from 'react';
import { Path } from 'react-native-svg';

import { icons } from './source.json';

const iconMap = {};

icons.map(icon => {
  const svg = <Path d={icon.data} />;
  const viewBox = '0 0 24 24'; // 24是https://materialdesignicons.com/上标准的大小
  iconMap[icon.name] = { svg, viewBox };

  return icon;
});

export default iconMap;
