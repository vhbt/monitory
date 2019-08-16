import React, {useState, useRef} from 'react';
import {Keyboard} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Picker from '../../../components/Picker';

import {Container, Form} from './styles';

export default function SignUp({navigation}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('Vitor Hariel');
  const [email, setEmail] = useState('vhbarauna@gmail.com');
  const [password, setPassword] = useState('password');
  const [selectedClass, setSelectedClass] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const pickerRef = useRef();

  const schoolClassList = [
    'INFO 1A',
    'INFO 2A',
    'INFO 3A',
    'INFO 4A',
    'MECA 1A',
    'MECA 2A',
    'MECA 3A',
    'MECA 4A',
  ];

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
          label="Senha"
          isSecure
          returnKeyType="next"
          onChangeText={setPassword}
          onSubmitEditing={() => pickerRef.current.focus()}
          value={password}
          style={{marginBottom: 10}}
          ref={passwordRef}
        />
        <Picker
          label="Turma"
          items={schoolClassList}
          selectedValue={selectedClass}
          onValueChange={value => setSelectedClass(value)}
          style={{marginBottom: 20}}
          ref={pickerRef}
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

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
