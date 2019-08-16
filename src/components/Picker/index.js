import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

import {PickerView, PickerComponent} from './styles';

function Picker({label, items, selectedValue, onValueChange, style}, ref) {
  return (
    <>
      <Text gray>{label}</Text>
      <PickerView style={style}>
        <PickerComponent
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          ref={ref}>
          {items.map(item => (
            <PickerComponent.Item key={item} label={item} value={item} />
          ))}
        </PickerComponent>
      </PickerView>
    </>
  );
}

Picker.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
};

Picker.defaultProps = {
  style: {},
};

export default forwardRef(Picker);
