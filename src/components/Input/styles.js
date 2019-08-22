import styled from 'styled-components/native';
import colors from '../../constants/theme';

export const Container = styled.View`
  margin: 10px 0 5px 0;
`;

export const TextComponent = styled.TextInput`
  color: ${colors.black};
  height: 44px;
  border-bottom-width: 1px;
  border-color: ${colors.gray2};
  border-width: ${props => (props.multiline ? '1px' : 0)};
  margin-top: ${props => (props.multiline ? '10px' : 0)};
  border-radius: ${props => (props.multiline ? '4px' : 0)};
`;
