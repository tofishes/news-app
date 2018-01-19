// 样式的缩写值获取
// 例如 margin: 0 10，返回 0 10 0 10
export function shorthand(value = '0') {
  const values = value.split(' ');
  const valueMap = {};

  const fullValues = Array.from({
    length: 4
  }, (v, i) => {
    if (values[i]) {
      return values[i];
    }

    const prevValue = values[Math.max(i - 2, 0)];

    return prevValue || values[0];
  });

  ['top', 'right', 'bottom', 'left'].map((direction, i) => {
    valueMap[direction] = +fullValues[i];
    return i;
  });

  return valueMap;
}

export default {};

