import React, { PureComponent } from 'react';
// import { NetInfo } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Icon from '../components/icon';
import NewsList from './parts/news-list';

import colors from '../libs/colors';
import { categories } from '../libs/request';

const ScrollableTabProps = {
  tabBarUnderlineStyle: {
    backgroundColor: '#fff'
  },
  tabBarTextStyle: {
    fontWeight: '400'
  },
  tabBarActiveTextColor: colors.em,
  tabBarBackgroundColor: 'rgba(255, 255, 255, .33)',
  renderTabBar() {
    return <ScrollableTabBar />;
  }
};

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default class List extends PureComponent {
  static navigationOptions = {
    title: 'English News Day',
    tabBarLabel: 'List',
    tabBarIcon: ({ tintColor }) => (
      <Icon fill={tintColor} viewBox="-2 0 30 20" name="view-list" width="30" />
    ),
    headerStyle: {
      backgroundColor: colors.theme
    },
    headerTitleStyle: {
      color: '#fff'
    }
  };

  // constructor() {
  //   super();
  // }

  // componentDidMount() {
  //   NetInfo.getConnectionInfo().then(connection => {
  //     if (connection.type === 'wifi') {
  //       this.initList();
  //     } else {
  //       this.initList();
  //     }
  //   });
  // }

  render() {
    const listPages = categories.map(item => (
      <NewsList key={item} tabLabel={capitalize(item)} category={item} />
    ));

    return (
      <ScrollableTabView {...ScrollableTabProps}>{listPages}</ScrollableTabView>
    );
  }
}
