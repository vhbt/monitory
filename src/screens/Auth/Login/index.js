import React, {useState, useRef} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {loginRequest} from '../../../store/modules/profile/actions';

import {getThemeColors} from '../../../constants/theme';
import {Container, Form} from './styles';

function Login({navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.profile.loading);
  const profile = useSelector(state => state.profile);
  const [username, setUsername] = useState(profile.username || '');
  const [password, setPassword] = useState(profile.password || '');

  if (profile.token) {
    navigation.navigate('app');
  }

  const colors = getThemeColors();

  const passwordRef = useRef();

  async function handleLogin() {
    Keyboard.dismiss();
    dispatch(loginRequest(username, password));
  }

  return (
    <Container colors={colors}>
      <Text black h1 bold style={{marginBottom: 10}}>
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

Login.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTheme(Login);
