import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../components/icon';

import request from 'axios';

export default class History extends PureComponent {
  static navigationOptions = {
    title: '历史',
    tabBarIcon: ({ tintColor }) => (
      <Icon fill={tintColor} name="history" viewBox="-1 -5 28 28"/>
    )
  }

  render() {
    return (
      <View>
        <Text>历史页面</Text>
      </View>
    )
  }
}
