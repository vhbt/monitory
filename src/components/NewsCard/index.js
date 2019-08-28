import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import LazyImage from '../LazyImage';

import {Container, Tag} from './styles';

export default function NewsCard({
  title,
  category,
  banner,
  bannerThumb,
  shouldLoad,
  onPress,
}) {
  return (
    <Container onPress={onPress}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,

          elevation: 8,
        }}>
        <LazyImage
          thumb={{uri: bannerThumb}}
          source={{uri: banner}}
          shouldLoad={shouldLoad}
          style={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 7,
          paddingTop: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,

          elevation: 8,
        }}>
        <Text medium black>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'flex-end',
            paddingBottom: 10,
          }}>
          <Tag>
            <Text gray>{category}</Text>
          </Tag>
        </View>
      </View>
    </Container>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  bannerThumb: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  shouldLoad: PropTypes.bool.isRequired,
};

NewsCard.defaultProps = {
  onPress: null,
};
