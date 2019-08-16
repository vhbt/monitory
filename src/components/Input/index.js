import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

import {TextComponent} from './styles';

function Input({isSecure, keyboardType, label, ...rest}, ref) {
  return (
    <>
      <Text gray>{label}</Text>
      <TextComponent
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        ref={ref}
        {...rest}
      />
    </>
  );
}

Input.propTypes = {
  isSecure: PropTypes.bool,
  keyboardType: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Input.defaultProps = {
  isSecure: false,
  keyboardType: 'default',
};

export default forwardRef(Input);
