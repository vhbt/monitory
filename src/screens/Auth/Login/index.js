import React, {useState, useRef} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {loginRequest} from '../../../store/modules/profile/actions';

import {Container, Form} from './styles';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.profile.loading);
  const [username, setUsername] = useState('20171144010050');
  const [password, setPassword] = useState('Supremo00');

  const passwordRef = useRef();

  async function handleLogin() {
    Keyboard.dismiss();
    dispatch(loginRequest(username, password));
  }

  return (
    <Container>
      <Text h1 bold style={{marginBottom: 10}}>
        Login
      </Text>
      <Form>
        <Input
          label="Matricula"
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={setUsername}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={username}
          style={{marginBottom: 10}}
        />
        <Input
          label="Senha"
          isSecure
          returnKeyType="send"
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          value={password}
          style={{marginBottom: 15}}
          ref={passwordRef}
        />

        <Button
          loading={loading}
          onPress={handleLogin}
          style={{height: 44, alignSelf: 'stretch'}}>
          <Text white>Login</Text>
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
