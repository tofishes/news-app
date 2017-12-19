// 全局基本样式定义
import { PixelRatio } from 'react-native';

const colors = {
  title: '#5D6A79',
  text: '#555',
  summary: '#999',
  em: '#D0021B', // 强调色
  theme: '#74B900', // 主题色
  line: '#ddd',
  link: '#1890ff'
};

const one = 1;
const onePx = one / PixelRatio.get();
const pixel = {
  px(num) {
    return num * onePx;
  },
  onePx
};

export default {
  title: {
    color: colors.title,
    fontWeight: '700'
  },
  desc: {
    color: colors.summary
  },
  debugBorder: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid'
  }
};

export { colors, pixel };
