import styled from 'styled-components/native';
import colors from '../../constants/theme';

export const PickerView = styled.View`
  color: ${colors.black};
  height: 42px;
  border-bottom-color: ${colors.gray2};
  border-bottom-width: 1px;
`;

export const PickerComponent = styled.Picker`
  border: 1px solid #000;
`;
