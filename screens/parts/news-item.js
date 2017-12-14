import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import Link from '../../components/link';
import Image from '../../components/image';

import { spoken } from '../../libs/date';
import colors from '../../libs/colors';
import styles from '../../libs/styles';

const layout = {
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    height: 95,
    borderColor: colors.line,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  cover: {
    width: 133,
    height: 75
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10
  }
};

export default class NewsItem extends PureComponent {
  render() {
    const { content } = this.props.data;

    if (!content) {
      return <Text>lost this news item</Text>;
    }

    const [cover] = content.relations;

    return (
      <Link href={content.id}>
        <View style={layout.row}>
          <Image style={layout.cover} source={{ uri: cover.content.href }} />
          <View style={layout.info}>
            <Text style={styles.title}>{content.name}</Text>
            <Text style={styles.desc}>{ spoken(content.lastUpdated) }</Text>
          </View>
        </View>
      </Link>
    );
  }
}

NewsItem.propTypes = {
  data: PropTypes.object.isRequired
};
