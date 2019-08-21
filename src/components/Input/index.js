import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

import {Container, TextComponent} from './styles';

function Input({isSecure, keyboardType, label, multiline, ...rest}, ref) {
  return (
    <Container>
      <Text gray>{label}</Text>
      <TextComponent
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        multiline={multiline}
        ref={ref}
        {...rest}
      />
    </Container>
  );
}

Input.propTypes = {
  isSecure: PropTypes.bool,
  keyboardType: PropTypes.string,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.string,
};

Input.defaultProps = {
  isSecure: false,
  keyboardType: 'default',
  multiline: false,
};

export default forwardRef(Input);
