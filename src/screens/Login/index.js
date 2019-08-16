import React, {useState, useRef} from 'react';
import {Keyboard} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Form} from './styles';

export default function Login({navigation}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('vhbarauna@gmail.com');
  const [password, setPassword] = useState('password');

  const passwordRef = useRef();

  async function handleLogin() {
    setLoading(true);

    Keyboard.dismiss();

    setLoading(false);
  }

  return (
    <Container>
      <Text h1 bold style={{marginBottom: 10}}>
        Login
      </Text>
      <Form>
        <Input
          label="E-mail"
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          style={{marginBottom: 10}}
        />
        <Input
          label="Password"
          isSecure
          returnKeyType="send"
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          value={password}
          style={{marginBottom: 15}}
          ref={passwordRef}
        />

        <Button
          gradient
          loading={loading}
          onPress={handleLogin}
          style={{height: 44, alignSelf: 'stretch'}}>
          <Text white>Login</Text>
        </Button>
        <Button
          borderless
          loading={loading}
          style={{height: 44, alignSelf: 'stretch'}}>
          <Text gray style={{textAlign: 'center'}}>
            Esqueci minha senha
          </Text>
        </Button>
      </Form>
    </Container>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
