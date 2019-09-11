import React, {useState, forwardRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Text from '../Text';
import Button from '../Button';

import {getThemeColors} from '../../constants/theme';

import {Container, TextComponent} from './styles';

function Input(
  {
    isSecure,
    keyboardType,
    label,
    multiline,
    autoCorrect,
    labelStyle,
    hasButton,
    placeholder,
    onPress,
    value,
    onChangeText,
    ...rest
  },
  ref,
) {
  const [secureToggle, setSecureToggle] = useState(true);
  const colors = getThemeColors();

  return (
    <Container>
      {label ? (
        <Text gray style={labelStyle}>
          {label}
        </Text>
      ) : null}
      <TextComponent
        colors={colors}
        secureTextEntry={isSecure && secureToggle}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={!!autoCorrect}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
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
      {hasButton ? (
        <Icon
          name="ios-search"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          size={24}
          color={colors.gray}
          onPress={onPress}
        />
      ) : null}
    </Container>
  );
}

Input.propTypes = {
  isSecure: PropTypes.bool,
  keyboardType: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  multiline: PropTypes.string,
  autoCorrect: PropTypes.bool,
  hasButton: PropTypes.bool,
  placeholder: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

Input.defaultProps = {
  isSecure: true,
  keyboardType: 'default',
  multiline: false,
  autoCorrect: false,
  labelStyle: {},
  hasButton: false,
  placeholder: '',
  onPress: null,
  value: '',
  onChangeText: null,
};

export default forwardRef(Input);
