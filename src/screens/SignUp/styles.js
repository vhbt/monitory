import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 0 32px;
`;

export const Form = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  padding-top: 80px;
`;
