import React from 'react';
import PropTypes from 'prop-types';

import {TextComponent} from './styles';

export default function Text({children, ...rest}) {
  return <TextComponent {...rest}>{children}</TextComponent>;
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
