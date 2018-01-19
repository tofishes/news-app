import React, { component } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Icon, Touch } from '../../components';

import baseStyle, { colors, rgba } from '../../libs/styles';
import request from '../../libs/request';

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.line
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: rgba(colors.line, 0.5)
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: colors.line,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: colors.light
  },
  content: {
    padding: 10
  }
});

export default class DictPanel extends component {
  constructor(props) {
    super(props);

    this.state = {
      isQuery: false,
      result: { phonetic: [], translationList: [] }
    };
  }

  shouldRecived

  async query(word) {
    const isQuery = !!word;
    this.setState({
      isQuery
    });

    if (isQuery) {
      const result = await request.queryDict(word);

      this.setState({
        result
      });
    }
  }

  render() {
    const { isQuery, result } = this.state;

    return (
      <Modal visible={isQuery} transparent animationType="slide" onRequestClose={this.query.bind(this, false)}>
        <Touch onPress={this.query.bind(this, false)} style={styles.overlay} />
        <View style={styles.popup}>
          <View style={styles.header}>
            <View style={baseStyle.inline}>
              <Text>{result.phrase} [{result.phonetic.join('; ')}]</Text>
              <Touch>
                <Icon name="volume-high" color={colors.theme} style={{ width: 20, height: 20 }} />
              </Touch>
            </View>

            <Touch onPress={this.query.bind(this, false)}>
              <Icon name="close" />
            </Touch>
          </View>
          <View style={styles.content}>
            {result.translationList.map(explain => <Text key={explain}>{explain}</Text>)}
          </View>
        </View>
      </Modal>
    );
  }
}
