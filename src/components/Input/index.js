import React from 'react';

import Text from '../Text';

import {TextComponent} from './styles';

export default function Input({isSecure, inputType, label, ...rest}) {
  return (
    <>
      <Text gray>{label}</Text>
      <TextComponent
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        {...rest}
      />
    </>
  );
}
