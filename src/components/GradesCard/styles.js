import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../constants/theme';

export const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const Container = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  height: 20px;
  padding-top: 5px;
`;

export const Tag = styled.View.attrs({
  shadowColor: colors.black,
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 0,
})`
  margin-right: 15px;
  height: 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
