import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {ButtonComponent, GradientButton, BorderlessButton} from './styles';

export default function Button({
  children,
  loading,
  onPress,
  gradient,
  borderless,
  style,
  ...rest
}) {
  return borderless ? (
    <BorderlessButton {...rest} onPress={onPress} style={style}>
      {loading ? <ActivityIndicator size="small" color="#fff" /> : children}
    </BorderlessButton>
  ) : (
    <GradientButton gradient={gradient} style={style}>
      <ButtonComponent {...rest} onPress={onPress}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : children}
      </ButtonComponent>
    </GradientButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  gradient: PropTypes.bool,
  borderless: PropTypes.bool,
  style: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
};

Button.defaultProps = {
  onPress: null,
  loading: false,
  gradient: false,
  borderless: false,
  style: {
    height: 44,
    width: 220,
  },
};
