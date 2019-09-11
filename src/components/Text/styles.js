import styled from 'styled-components/native';

const styles = {
  h1: `font-size: 26`,
  h2: `font-size: 20`,
  h3: `font-size: 18`,

  semibold: `font-family: SFProText-SemiBold`,
  bold: `font-family: SFProText-Bold`,
  medium: `font-family: SFProText-Medium`,
};

export const TextComponent = styled.Text`
  font-family: 'SFProText-Regular';

  ${props => props.accent && `color: ${props.colors.accent}`};
  ${props => props.primary && `color: ${props.colors.primary}`};
  ${props => props.secondary && `color: ${props.colors.secondary}`};
  ${props => props.tertiary && `color: ${props.colors.tertiary}`};
  ${props => props.black && `color: ${props.colors.black}`};
  ${props => props.white && `color: ${props.colors.white}`};
  ${props => props.gray && `color: ${props.colors.gray}`};
  ${props => props.gray2 && `color: ${props.colors.gray2}`};
  ${props => props.h1 && styles.h1};
  ${props => props.h2 && styles.h2};
  ${props => props.h3 && styles.h3};
  ${props => props.semibold && styles.semibold};
  ${props => props.bold && styles.bold};
  ${props => props.medium && styles.medium};
`;
