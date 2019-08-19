import React, {forwardRef} from 'react';
import {Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

import Text from '../Text';

import {PickerView, PickerComponent} from './styles';

function Picker({label, items, selectedValue, onValueChange, style}, ref) {
  const options = [];

  items.forEach(item => {
    options.push({label: item, value: item});
  });

  return (
    <>
      <Text gray>{label}</Text>
      <PickerView style={style}>
        {Platform.OS === 'ios' ? (
          <RNPickerSelect
            onValueChange={onValueChange}
            items={options}
            value={selectedValue}
            style={{inputIOS: {paddingTop: 15}}}
          />
        ) : (
          <PickerComponent
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            ref={ref}>
            {items.map(item => (
              <PickerComponent.Item key={item} label={item} value={item} />
            ))}
          </PickerComponent>
        )}
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
