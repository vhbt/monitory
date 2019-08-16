import React, {useState, useRef} from 'react';
import {Keyboard} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Form} from './styles';

export default function SignUp({navigation}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('Vitor Hariel');
  const [email, setEmail] = useState('vhbarauna@gmail.com');
  const [password, setPassword] = useState('password');

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignUp() {
    setLoading(true);

    Keyboard.dismiss();

    setLoading(false);
  }

  return (
    <Container>
      <Text h1 bold style={{marginBottom: 10}}>
        Cadastrar-se
      </Text>
      <Form>
        <Input
          label="Nome"
          returnKeyType="next"
          onChangeText={setName}
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          style={{marginBottom: 10}}
        />
        <Input
          label="E-mail"
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          style={{marginBottom: 10}}
          ref={emailRef}
        />
        <Input
          label="Password"
          isSecure
          onChangeText={setPassword}
          onSubmitEditing={handleSignUp}
          value={password}
          style={{marginBottom: 15}}
          ref={passwordRef}
        />

        <Button
          gradient
          loading={loading}
          onPress={handleSignUp}
          style={{height: 44, alignSelf: 'stretch'}}>
          <Text white>Cadastrar</Text>
        </Button>
      </Form>
    </Container>
  );
}
