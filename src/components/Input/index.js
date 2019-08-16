import React, {forwardRef} from 'react';

import Text from '../Text';

import {TextComponent} from './styles';

function Input({isSecure, inputType, label, ...rest}, ref) {
  return (
    <>
      <Text gray>{label}</Text>
      <TextComponent
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        ref={ref}
        {...rest}
      />
    </>
  );
}

export default forwardRef(Input);
