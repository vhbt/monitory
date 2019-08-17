import styled from 'styled-components/native';
import colors from '../../constants/theme';

import Text from '../Text';

export const Container = styled.View`
  flex-direction: row;
`;

export const TabButton = styled.TouchableOpacity`
  margin-right: 12px;
  padding-bottom: 12px;
  border-bottom-color: ${props =>
    props.active ? colors.secondary : colors.gray2};
  border-bottom-width: ${props => (props.active ? '3px' : '0')};
`;

export const TabText = styled(Text)`
  color: ${props => (props.active ? colors.secondary : colors.gray)};
`;
