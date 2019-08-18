import styled from 'styled-components/native';
import colors from '../../constants/theme';

const styles = {
  accent: `color: ${colors.accent}`,
  primary: `color: ${colors.primary}`,
  secondary: `color: ${colors.secondary}`,
  tertiary: `color: ${colors.tertiary}`,
  black: `color: ${colors.black}`,
  white: `color: ${colors.white}`,
  gray: `color: ${colors.gray}`,
  gray2: `color: ${colors.gray2}`,

  h1: `font-size: 26`,
  h2: `font-size: 20`,
  h3: `font-size: 18`,

  bold: `font-weight: bold`,
};

export const TextComponent = styled.Text`
  ${props => props.accent && styles.accent};
  ${props => props.primary && styles.primary};
  ${props => props.secondary && styles.secondary};
  ${props => props.tertiary && styles.tertiary};
  ${props => props.black && styles.black};
  ${props => props.white && styles.white};
  ${props => props.gray && styles.gray};
  ${props => props.gray2 && styles.gray2};
  ${props => props.h1 && styles.h1};
  ${props => props.h2 && styles.h2};
  ${props => props.h3 && styles.h3};
  ${props => props.bold && styles.bold};
  font-family: 'SFProText-Regular';
`;
