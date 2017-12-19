import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import Link from '../../components/link';
import Image from '../../components/image';

import { spoken } from '../../libs/date';
import styles, { colors } from '../../libs/styles';

const layout = {
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderColor: colors.line,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  cover: {
    width: 102,
    height: 78
  },
  info: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    width: 200
  }
};

export default class NewsItem extends PureComponent {
  render() {
    const { content } = this.props.data;

    if (!content) {
      return <Text>lost this news item</Text>;
    }

    const [cover] = content.relations;
    const detailPage = {
      screen: 'news-detail',
      param: {
        id: content.id
      }
    };

    return (
      <Link to={detailPage}>
        <View style={layout.row}>
          <Image style={layout.cover} source={{ uri: cover.content.href }} />
          <View style={layout.info}>
            <Text style={styles.title}>{content.name}</Text>
            <Text style={styles.desc}>{spoken(content.lastUpdated)}</Text>
          </View>
        </View>
      </Link>
    );
  }
}

NewsItem.propTypes = {
  data: PropTypes.object.isRequired
};
