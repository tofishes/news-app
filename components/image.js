import React from 'react';
import { View, Animated, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../components/icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ddd'
  },
  placeholder: {
    position: 'absolute'
  }
});

export default class Imager extends React.Component {
  constructor() {
    super();

    this.state = {
      opacity: new Animated.Value(0),
      loading: true
    };
  }

  onLoad() {
    this.setState({
      loading: false
    });

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.duration,
      useNativeDriver: true
    }).start();
  }

  render() {
    const size = Math.min(this.props.style.width, this.props.style.height);
    let placeholder = null;

    if (this.state.loading) {
      placeholder = (
        <View style={[{ width: size, height: size }, styles.placeholder]}>
          <Icon name="image-area" width={size} />
        </View>
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {placeholder}

        <Animated.Image
          {...this.props}

          style={[{
            opacity: this.state.opacity
          }, this.props.style]}

          onLoad={this.onLoad.bind(this)}
        />
      </View>
    );
  }
}

Imager.defaultProps = {
  style: {},
  duration: 200
};

Imager.propTypes = {
  // eslint-disable-next-line react/no-typos
  style: ViewPropTypes.style,
  duration: PropTypes.number
};
