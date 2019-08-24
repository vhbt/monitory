import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../constants/theme';

export const ButtonComponent = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
`;

export const BorderlessButton = styled.TouchableOpacity`
  justify-content: center;
`;

export const GradientButton = styled(LinearGradient).attrs(props => ({
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  colors: props.colors,
}))`
  margin: ${props => (props.marginless ? 0 : '5px 0')};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
