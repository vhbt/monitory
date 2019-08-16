import React from 'react';

import Text from '../Text';

import {profile} from '../../constants/mocks';

import {Container, Avatar} from './styles';

export default function Header() {
  return (
    <Container>
      <Text h1 black>
        Olá, {profile.name}!
      </Text>
      <Avatar source={{uri: profile.avatar}} />
    </Container>
  );
}
