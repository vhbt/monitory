import React from 'react';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';

import Button from '../Button';
import Text from '../Text';

import {Container} from './styles';

export default function ImportantWarning({content, onPress, disabled}) {
  return (
    <Container>
      <Button
        gradient
        disabled={disabled}
        style={{
          height: 44,
          alignSelf: 'stretch',
          padding: Platform.OS === 'ios' ? 0 : 20,
        }}
        onPress={onPress}>
        <Text white style={{textAlign: 'center', width: 260}}>
          {content}
        </Text>
      </Button>
    </Container>
  );
}

ImportantWarning.propTypes = {
  content: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

ImportantWarning.defaultProps = {
  onPress: null,
  disabled: false,
};
