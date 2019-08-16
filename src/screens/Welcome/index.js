import React, {useState} from 'react';
import {Modal} from 'react-native';

import Text from '../../components/Text';
import Button from '../../components/Button';

import {
  Container,
  Title,
  SubTitle,
  WelcomeText,
  WelcomeImage,
  BottomButtons,
  TermsButton,
} from './styles';

import welcome from '../../assets/welcome.png';

export default function Welcome({navigation}) {
  const [showTerms, setShowTerms] = useState(false);

  function renderTerms() {
    return (
      <Modal animationType="slide" visible={showTerms}>
        <Text black style={{margin: 10}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <TermsButton gradient onPress={() => setShowTerms(false)}>
          <Text white>Eu entendi</Text>
        </TermsButton>
      </Modal>
    );
  }

  return (
    <Container>
      <WelcomeText>
        <Title>
          <Text h1 bold>
            Suas materias
          </Text>
          <Text h1 primary bold>
            {' '}
            resolvidas.
          </Text>
        </Title>
        <SubTitle>
          <Text h3 gray>
            Encontreu seu monitor ideal.
          </Text>
        </SubTitle>
      </WelcomeText>
      <WelcomeImage source={welcome} style={{resizeMode: 'contain'}} />
      <BottomButtons>
        <Button gradient onPress={() => navigation.navigate('Login')}>
          <Text white>Login</Text>
        </Button>
        <Button>
          <Text white>Cadastrar-se</Text>
        </Button>
        <Button
          borderless
          style={{marginTop: 10, alignSelf: 'center'}}
          onPress={() => setShowTerms(true)}>
          <Text gray>Termos de uso</Text>
        </Button>
      </BottomButtons>
      {renderTerms()}
    </Container>
  );
}

Welcome.navigationOptions = {
  header: null,
};
