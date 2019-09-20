import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

import {ButtonContainer, Container, Tag} from './styles';

export default function GradesCard({
  title,
  colors,
  style,
  white,
  grades,
  semiannual,
  attendance,
  status,
  onPress,
}) {
  return (
    <Container colors={colors} style={style}>
      <ButtonContainer onPress={onPress}>
        <Text
          white={white}
          semibold
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            width: 300,
            marginTop: 5,
          }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginLeft: 5,
          }}>
          {grades.map(grade => (
            <Tag key={grade[1]}>
              <View>
                <Text white bold style={{textAlign: 'center'}}>
                  {grade[1]}
                </Text>
                <Text white style={{textAlign: 'center'}}>
                  {grade[0] !== null ? String(grade[0]) : '-'}
                </Text>
              </View>
            </Tag>
          ))}
        </View>
        <Text gray style={{marginTop: 20, marginBottom: 10}}>
          Presença: {Math.floor(attendance)}% | Situação: {status}
        </Text>
      </ButtonContainer>
    </Container>
  );
}

GradesCard.propTypes = {
  title: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  white: PropTypes.bool,
  grades: PropTypes.arrayOf(
    PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  ).isRequired,
  semiannual: PropTypes.bool.isRequired,
  attendance: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

GradesCard.defaultProps = {
  style: {},
  white: false,
};
