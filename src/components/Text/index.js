import React from 'react';
import PropTypes from 'prop-types';

import {getThemeColors} from '../../constants/theme';
import {TextComponent} from './styles';

export default function Text({children, ...rest}) {
  const colors = getThemeColors();
  return (
    <TextComponent colors={colors} {...rest}>
      {children}
    </TextComponent>
  );
}

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
};

Text.defaultProps = {
  children: '',
};
