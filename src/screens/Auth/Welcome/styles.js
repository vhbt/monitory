import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  background: ${props => props.colors.background};
`;

export const WelcomeText = styled.View`
  flex: 0.1;
  align-self: center;
  margin-bottom: 50px;
`;

export const Title = styled.View`
  flex-direction: row;
`;

export const SubTitle = styled.View`
  align-self: center;
`;

export const WelcomeImage = styled.Image`
  flex: 0.5;
  width: 75%;
  background-color: transparent;
  resize-mode: contain;
`;

export const BottomButtons = styled.View`
  flex: 0.2;
  margin-top: 50px;
  align-self: center;
`;

export const TermsButton = styled(Button)`
  height: 44px;
  align-self: stretch;
  margin: 0 10px;
`;
