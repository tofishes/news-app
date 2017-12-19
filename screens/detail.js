import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import cheerio from 'cheerio';

import Loading from '../components/loading';
import { H2, H3 } from '../components/title';
import Devider from '../components/divider';
import Image from '../components/image';

import { spoken } from '../libs/date';
import { colors } from '../libs/styles';
import request from '../libs/request';

const imageType = 'bbc.mobile.news.image';

const styles = StyleSheet.create({
  divider: {
    height: 12,
    marginHorizontal: 15,
    borderLeftWidth: 1,
    borderColor: colors.line,
    borderStyle: 'solid'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  time: {
    color: colors.summary
  },
  light: {
    color: colors.link,
  },
  article: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  title: {
    marginBottom: 10
  },
  content: {
    paddingVertical: 10
  }
});

function parseContent(news) {
  const $ = cheerio.load(news.content);
  const imageMap = {};
  news.relations.map(item => {
    const info = item.content;

    if (info.type === imageType) {
      imageMap[info.id] = info;
    }

    return item;
  });

  const contents = $('paragraph, crosshead, image').map((i, elem) => {
    const $this = $(elem);
    const text = $this.text();

    if ($this.is('paragraph')) {
      return <View style={styles.p}>{text}</View>;
    }

    if ($this.is('crosshead')) {
      return <H3>{text}</H3>;
    }

    if ($this.is('image')) {
      const id = $this.attr('id');

      if (imageMap[id]) {
        return <Image source={{ uri: imageMap[id].href }} />;
      }
    }

    return null;
  }).get();

  return <Text>内容显示</Text>;
}

class Detail extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Reading',
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: colors.theme
    },
    headerTitleStyle: {
      color: '#fff'
    },
    headerBackTitleStyle: {
      color: '#fff'
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      news: null
    };
  }

  componentDidMount() {
    this.getNews();
  }

  async getNews() {
    const { params } = this.props.navigation.state;

    const news = await request.getNews(params.id);

    this.setState({
      news
    });
  }

  render() {
    const { news } = this.state;
    const content = news === null
      ? <Loading show />
      : (
        <View>
          <H2 style={styles.title}>{news.name}字体大小</H2>
          <View style={[styles.info]}>
            <Text style={styles.time}>{spoken(news.lastUpdated)}</Text>
            <View style={styles.divider} />
            <Text style={styles.light}>{news.iStatsLabels.page_type}</Text>
          </View>
          <Devider />

          <View style={styles.content}>{parseContent(news)}</View>
        </View>
      );

    return (
      <View style={styles.article}>{content}</View>
    );
  }
}

Detail.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default withNavigation(Detail);
