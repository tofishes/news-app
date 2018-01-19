import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import cheerio from 'react-native-cheerio';

import { Loading, H1, H2, Divider, Image } from '../components';
import DictPanel from './parts/dict-panel';

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
  },
  p: {
    marginVertical: 6,
    fontSize: 18,
    color: colors.text
  },
  h: {
    marginTop: 10,
    fontSize: 20
  },
  canvas: {
    backgroundColor: '#fff'
  }
});

function parseContent(news) {
  if (!news.body) {
    return <Text>news content is null...</Text>;
  }

  const $ = cheerio.load(news.body, {
    xmlMode: true
  });
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

    if ($this.is('image')) {
      const id = $this.attr('id');

      if (imageMap[id]) {
        return (
          <View key={i} style={{ marginVertical: 6 }}>
            <Image src={imageMap[id].href} offset="0 10" />
          </View>
        );
      }
    }

    const text = $this.text().split(' ').map((word, j) => {
      const key = `${i}${j}`;
      return <Text key={key} onPress={this.query.bind(this, word)}>{word} </Text>;
    });

    if ($this.is('paragraph')) {
      return <Text key={i} style={styles.p}>{text}</Text>;
    }

    if ($this.is('crosshead')) {
      return <H2 key={i} style={styles.h}>{text}</H2>;
    }

    return null;
  }).get();

  return contents;
}

class Detail extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    const headerLeft = (
      <Button onPress={() => goBack()} title="list" color="#fff" />
    );

    return {
      headerTitle: 'Reading',
      headerLeft,
      headerStyle: {
        backgroundColor: colors.theme
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerBackTitleStyle: {
        color: '#fff'
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      news: null,
      word: null
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

  query(word) {
    this.setState({
      word
    });
  }

  render() {
    const { news, word } = this.state;
    const content = news === null
      ? <Loading />
      : (
        <View style={styles.canvas}>
          <H1 style={styles.title}>{news.name}</H1>
          <View style={[styles.info]}>
            <Text style={styles.time}>{spoken(news.lastUpdated)}</Text>
            <View style={styles.divider} />
            <Text style={styles.light}>{news.iStatsLabels.page_type}</Text>
          </View>
          <Divider />

          <View style={styles.content}>{parseContent.bind(this)(news)}</View>
        </View>
      );

    return (
      <ScrollView style={styles.article}>
        {content}
        <DictPanel query={word} />
      </ScrollView>
    );
  }
}

Detail.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default withNavigation(Detail);
