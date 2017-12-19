import { StackNavigator, TabNavigator } from 'react-navigation';

import list from './screens/list';
import history from './screens/history';
import detail from './screens/detail';

import { colors } from './libs/styles';

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
