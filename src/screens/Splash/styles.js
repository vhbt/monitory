import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../constants/theme';

export const Container = styled(LinearGradient).attrs({
  colors: [colors.primary, colors.secondary],
})`
  flex: 1;
  padding: 30px 0;
  background: #f5f7fb;
  align-items: center;
`;
