import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

import {Container, Tag} from './styles';

export default function NewsCard({title, desc, tags, banner, onPress}) {
  return (
    <Container onPress={onPress}>
      <View>
        <Image
          source={{uri: banner}}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 7, paddingTop: 5}}>
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
            <Text gray>{tags}</Text>
          </Tag>
        </View>
      </View>
    </Container>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

NewsCard.defaultProps = {
  onPress: null,
};
