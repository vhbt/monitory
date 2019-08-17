import styled from 'styled-components/native';
import colors from '../../constants/theme';

export const Card = styled.TouchableOpacity.attrs({
  shadowColor: colors.black,
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 10,
})`
  width: 160px;
  height: 160px;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  background: #fff;
  elevation: 5;
`;

export const CardBanner = styled.Image`
  width: 80px;
  height: 80px;
`;

export const CardInfo = styled.View`
  padding: 10px;
`;
