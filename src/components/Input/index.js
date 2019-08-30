import React, {useState, forwardRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Text from '../Text';

import colors from '../../constants/theme';

import {Container, TextComponent} from './styles';

function Input(
  {isSecure, keyboardType, label, multiline, autoCorrect, ...rest},
  ref,
) {
  const [secureToggle, setSecureToggle] = useState(true);

  return (
    <Container>
      <Text gray>{label}</Text>
      <TextComponent
        secureTextEntry={isSecure && secureToggle}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={!!autoCorrect}
        keyboardType={keyboardType}
        multiline={multiline}
        ref={ref}
        {...rest}
      />
      {isSecure ? (
        <Icon
          name={secureToggle ? 'ios-eye-off' : 'ios-eye'}
          style={{position: 'absolute', top: 30, right: 10}}
          size={24}
          color={colors.gray}
          onPress={() => setSecureToggle(!secureToggle)}
        />
      ) : null}
    </Container>
  );
}

Input.propTypes = {
  isSecure: PropTypes.bool,
  keyboardType: PropTypes.string,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.string,
  autoCorrect: PropTypes.bool,
};

Input.defaultProps = {
  isSecure: true,
  keyboardType: 'default',
  multiline: false,
  autoCorrect: false,
};

export default forwardRef(Input);
