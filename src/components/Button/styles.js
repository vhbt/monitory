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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 1);
`;

export const BorderlessButton = styled.TouchableOpacity`
  justify-content: center;
`;

export const GradientButton = styled(LinearGradient).attrs(props => ({
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  colors: props.colors,
  shadowColor: colors.black,
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 2,
}))`
  margin: 5px 0;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
