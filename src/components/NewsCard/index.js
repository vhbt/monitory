import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import LazyImage from '../LazyImage';

import {getThemeColors} from '../../constants/theme';

import {Container, Tag} from './styles';

export default function NewsCard({
  title,
  category,
  banner,
  bannerThumb,
  shouldLoad,
  onPress,
}) {
  const colors = getThemeColors();
  return (
    <Container colors={colors} onPress={onPress}>
      <View>
        <LazyImage
          thumb={{uri: bannerThumb}}
          source={{uri: banner}}
          shouldLoad={shouldLoad}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 7,
          paddingTop: 5,
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
