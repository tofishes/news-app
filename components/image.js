import React from 'react';
import { View, Animated, Image, StyleSheet, ViewPropTypes, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../components/icon';
import { shorthand } from '../libs/utils';

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

const screenSize = Dimensions.get('window');

export default class Imager extends React.Component {
  constructor() {
    super();

    this.state = {
      opacity: new Animated.Value(0),
      loading: true,
      size: {}
    };
  }

  componentDidMount() {
    this.loadImage();
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

  loadImage() {
    const self = this;
    const { src, style, offset } = this.props;

    const offsets = shorthand(offset);
    const vertical = offsets.top + offsets.bottom;
    const horizontal = offsets.left + offsets.right;

    Image.getSize(src, (width, height) => {
      const ratio = width / height;
      const size = {};

      size.width = style.width || Math.min(width, screenSize.width);
      size.height = size.width / ratio;

      size.width -= horizontal;
      size.height -= vertical;

      self.setState({
        size,
        ratio,
        loading: false
      });
    }, () => {
      self.setState({
        fail: true
      });
    });
  }

  loaded() {
    this.setState({
      loading: false
    });
  }

  render() {
    const { width, height } = this.props.style;
    const size = Math.min(width, height);
    let placeholder = null;

    if (this.state.loading && size) {
      placeholder = (
        <View style={[{ width: size, height: size }, styles.placeholder]}>
          <Icon name="image-area" width={size} />
        </View>
      );
    }

    return (
      <View style={[styles.container]}>
        {placeholder}

        <Animated.Image
          source={{ uri: this.props.src }}
          style={[{
            opacity: this.state.opacity
          }, this.state.size, this.props.style]}

          onLoad={this.onLoad.bind(this)}
        />
      </View>
    );
  }
}

Imager.defaultProps = {
  style: {},
  duration: 200,
  offset: '0'
};

Imager.propTypes = {
  // eslint-disable-next-line react/no-typos
  style: ViewPropTypes.style,
  duration: PropTypes.number,
  src: PropTypes.string.isRequired,
  offset: PropTypes.string
};
