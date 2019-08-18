import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';

import Text from '../Text';

import {Container, TopContainer, Avatar} from './styles';

export default function Header() {
  const user = useSelector(state => state.profile.user);

  return (
    <SafeAreaView>
      <Container>
        <TopContainer>
          <Text h1 black>
            Olá, {user && user.nome_usual}!
          </Text>
          <Avatar
            source={{
              uri: user && `http://suap.ifrn.edu.br/${user.avatar_suap}`,
            }}
          />
        </TopContainer>
      </Container>
    </SafeAreaView>
  );
}
