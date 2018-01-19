import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, RefreshControl } from 'react-native';
import store from 'react-native-simple-store';

import NewsItem from './news-item';
import Loading from '../../components/loading';

import request from '../../libs/request';

export default class NewsList extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.url !== r2.url
    });

    this.state = {
      list: ds.cloneWithRows([]),
      refreshing: false,
      loading: false
    };

    this.page = 1;
  }

  componentDidMount() {
    this.initList();
  }

  async initList() {
    this.setState({
      refreshing: true
    });

    const { data, status } = await request.getNewsList(this.props.category);

    if (status === 304) {
      this.setState({
        refreshing: false
      });

      return;
    }

    const articles = data.getList('relations');

    this.setState({
      list: this.state.list.cloneWithRows(articles),
      refreshing: false
    });
  }

  async loadMore() {
    console.log('reach end......')

    this.page += 1;

    this.setState({
      loading: true
    });

    const { data, status } = await request.getNewsList(this.props.category, this.page);

    if (status === 304) {
      this.setState({
        loading: false
      });

      return;
    }

    const articles = data.getList('relations');

    this.setState({
      list: this.state.list.cloneWithRows(articles),
      loading: false
    });
  }

  refresh() {
    this.setState({
      refreshing: true
    });

    this.initList();
  }

  renderFooter() {
    const { loading, refreshing } = this.state;
    return <Loading show={!refreshing && loading} />;
    // return <Text>loading: {JSON.stringify(this.state.loading)}</Text>;
  }

  render() {
    const { props } = this;

    function renderNewsRow(news) {
      if (!news) {
        return null;
      }

      return <NewsItem {...props} data={news} />;
    }

    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh.bind(this)}
            title="更新中..."
          />
        }
        renderFooter={this.renderFooter.bind(this)}
        dataSource={this.state.list}
        onEndReached={this.loadMore.bind(this)}
        renderRow={renderNewsRow}
        enableEmptySections
      />
    );
  }
}

NewsList.propTypes = {
  category: PropTypes.string.isRequired
};
