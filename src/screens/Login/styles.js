import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 0 32px;
`;

export const Form = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  margin-top: 80px;
`;
