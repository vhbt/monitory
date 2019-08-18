import React from 'react';
import {View} from 'react-native';

import Text from '../Text';

import {Container, Tag} from './styles';

export default function GradesCard({title, colors, style, white, grades}) {
  return (
    <Container colors={colors} style={style}>
      <Text
        white={white}
        semibold
        style={{alignSelf: 'center', textAlign: 'center'}}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 25,
        }}>
        {grades.map(grade => (
          <Tag key={grade[1]}>
            <View>
              <Text white bold style={{textAlign: 'center'}}>
                {grade[1]}
              </Text>
              <Text white style={{textAlign: 'center'}}>
                {grade[0] || '-'}
              </Text>
            </View>
          </Tag>
        ))}
      </View>
    </Container>
  );
}
