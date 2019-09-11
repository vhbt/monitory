import React, {useState} from 'react';
import {Modal, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../components/Text';
import Button from '../../../components/Button';

import {
  Container,
  Title,
  SubTitle,
  WelcomeText,
  WelcomeImage,
  BottomButtons,
  TermsButton,
} from './styles';

import {getThemeColors} from '../../../constants/theme';

import welcome from '../../../assets/images/welcome.png';

export default function Welcome({navigation}) {
  const [showTerms, setShowTerms] = useState(false);
  const colors = getThemeColors();

  function renderTerms() {
    return (
      <Modal animationType="slide" visible={showTerms}>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
          <Text black style={{margin: 10}}>
            Nos não salvamos, em hipótese alguma, seus dados de login do SUAP.
            As informaçoes coletadas são referentes aos dados necessários para a
            distribuição de conteúdo baseado em critérios internos, tais como o
            curso e ano do aluno. Nenhum dado é fornecido a terceiros.
          </Text>
          <TermsButton onPress={() => setShowTerms(false)}>
            <Text white>Eu entendi</Text>
          </TermsButton>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Container colors={colors}>
      <WelcomeText>
        <Title style={{alignSelf: 'center'}}>
          <Text h1 primary bold>
            Monitory
          </Text>
        </Title>
        <SubTitle>
          <Text h3 gray>
            Seu assistente escolar.
          </Text>
        </SubTitle>
      </WelcomeText>
      <WelcomeImage source={welcome} style={{resizeMode: 'contain'}} />
      <BottomButtons>
        <Button onPress={() => navigation.navigate('Login')}>
          <Text white>Login</Text>
        </Button>
        {/* <Button
          disabled
          onPress={() => navigation.navigate('SignUp')}
          colors={[Colors.black, Colors.black]}>
          <Text gray>Cadastrar-se</Text>
        </Button> */}
        <Button
          borderless
          style={{marginTop: 10, alignSelf: 'center'}}
          onPress={() => setShowTerms(true)}>
          <Text gray>Política de Privacidade</Text>
        </Button>
      </BottomButtons>
      {renderTerms()}
    </Container>
  );
}

Welcome.navigationOptions = {
  header: null,
};

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
