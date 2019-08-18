import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  padding: 0 32px;
  justify-content: flex-end;
`;

export const Form = styled.View`
  padding-top: 80px;
`;
