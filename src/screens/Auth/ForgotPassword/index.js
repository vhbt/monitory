import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Container, Form} from './styles';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleSubmit() {
    setLoading(true);

    Keyboard.dismiss();

    setLoading(false);
  }

  return (
    <Container>
      <Text h1 bold style={{marginBottom: 10}}>
        Esqueci minha senha
      </Text>
      <Form>
        <Input
          label="E-mail"
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={setEmail}
          onSubmitEditing={handleSubmit}
          value={email}
          style={{marginBottom: 10}}
        />
        <Button
          gradient
          loading={loading}
          onPress={handleSubmit}
          style={{height: 44, alignSelf: 'stretch'}}>
          <Text white>Enviar e-mail</Text>
        </Button>
      </Form>
    </Container>
  );
}
