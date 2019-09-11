import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 32px;
  background-color: ${props => props.colors.background};
`;

export const Form = styled.View`
  padding-top: 80px;
`;
