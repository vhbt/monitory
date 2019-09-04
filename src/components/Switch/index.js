import React from 'react';
import {View, Switch} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

export default function SwitchComponent({label, style, value, onValueChange}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', ...style}}>
      <Text gray style={{marginRight: 10}}>
        {label}
      </Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

SwitchComponent.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

SwitchComponent.defaultProps = {
  style: {},
};
