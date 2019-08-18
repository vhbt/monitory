import React from 'react';
import {View, Image} from 'react-native';

import Text from '../Text';

import {Container, Tag} from './styles';

export default function NewsCard({title, desc, tags, banner, onPress}) {
  return (
    <Container onPress={onPress}>
      <View>
        <Image source={{uri: banner}} style={{width: 200, height: 100}} />
      </View>
      <View>
        <Text h3 style={{textAlign: 'center'}}>
          {title}
        </Text>
        <Text style={{textAlign: 'justify', paddingHorizontal: 10}}>
          {desc}
        </Text>
        <View
          style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 5}}>
          {tags.map(tag => (
            <Tag key={tag}>
              <Text gray>{tag}</Text>
            </Tag>
          ))}
        </View>
      </View>
    </Container>
  );
}