import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import list from './screens/list';
import history from './screens/history';
import detail from './screens/detail';

import colors from './libs/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const home = TabNavigator({
  'list': {
    screen: list
  },
  'history': {
    screen: history
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.em,
    inactiveTintColor: colors.text,
    labelStyle: {
      fontSize: 14,
      marginBottom: 5
    }
  }
});

const app = StackNavigator({
  'home': {
    screen: home
  },
  'news-detail': {
    screen: detail
  }
});

export default app;
