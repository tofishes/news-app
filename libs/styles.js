// 全局基本样式定义
import { PixelRatio } from 'react-native';

const colors = {
  title: '#5D6A79',
  text: '#555',
  summary: '#999',
  em: '#D0021B', // 强调色
  theme: '#74B900', // 主题色
  line: '#ddd',
  link: '#1890ff',
  light: '#ebf9ff' // 浅色高亮
};

const one = 1;
const onePx = one / PixelRatio.get();
const pixel = {
  px(num) {
    return num * onePx;
  },
  onePx
};

function rgb(hexString) {
  const rgbs = [];

  let hex = hexString.substr(1); // 去除前缀 # 号

  if (hex.length === 3) { // 处理 "#abc" 成 "#aabbcc"
    hex = hex.replace(/(.)/g, '$1$1');
  }
  // 按16进制将字符串转换为数字
  hex.replace(/../g, color => rgbs.push(parseInt(color, 0x10)));

  return rgbs.join(',');
}


function rgba(hex, opacity = 0.5) {
  const rgbString = rgb(hex);

  return `rgba(${rgbString},${opacity})`;
}

export default {
  title: {
    color: colors.title,
    fontWeight: '700'
  },
  desc: {
    color: colors.summary
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start'
  },
  debugBorder: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid'
  }
};

export { colors, pixel, rgba };
