import React from 'react';
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
        style={{height: 44, alignSelf: 'stretch'}}
        onPress={onPress}>
        <Text white>{content}</Text>
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
