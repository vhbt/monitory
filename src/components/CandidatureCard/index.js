import React from 'react';
import {View, Image} from 'react-native';

import Text from '../Text';
import Button from '../Button';

import {Container, UserInfo} from './styles';

export default function CandidatureCard({
  id,
  text,
  user,
  onButtonPress,
  loading,
  alreadyVoted,
  buttonText,
}) {
  return (
    <Container>
      <UserInfo>
        <Image
          source={{uri: `https://suap.ifrn.edu.br/${user.avatar_suap}`}}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
        <Text h3 black style={{marginLeft: 20, flexWrap: 'wrap', width: '70%'}}>
          {user.nome_completo}
        </Text>
      </UserInfo>
      <Text gray style={{marginVertical: 15, flexWrap: 'wrap', width: '70%'}}>
        {text}
      </Text>
      <Button
        disabled={alreadyVoted}
        loading={loading}
        style={{height: 44, flex: 1, alignSelf: 'stretch'}}
        onPress={onButtonPress}>
        <Text white>{buttonText}</Text>
      </Button>
    </Container>
  );
}
