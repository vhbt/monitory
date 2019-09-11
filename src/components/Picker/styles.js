import styled from 'styled-components/native';

export const PickerView = styled.View`
  color: ${props => props.colors.black};
  height: 42px;
  border-bottom-color: ${props => props.colors.gray2};
  border-bottom-width: 1px;
`;

export const PickerComponent = styled.Picker`
  border: 1px solid #000;
`;
