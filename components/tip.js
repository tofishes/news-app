import { Alert } from 'react-native';

const noop = () => {};

export function alert(message, confirmed = noop) {
  const title = '提示';
  const buttons = [{
    text: '确定',
    onPress: () => confirmed()
  }];

  Alert.alert(title, message, buttons);
}

export function confirm(message, confirmed = noop, canceled = noop) {
  const title = '请确认';
  const buttons = [{
    text: '取消',
    onPress: () => canceled(),
    style: 'cancel'
  }, {
    text: '确定',
    onPress: () => confirmed()
  }];

  Alert.alert(title, message, buttons);
}
