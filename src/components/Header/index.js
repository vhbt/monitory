import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import Text from '../Text';

import {Container, TopContainer, Avatar} from './styles';

export default function Header() {
  const user = useSelector(state => state.profile.user);
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView>
      <Container>
        <TopContainer>
          <ShimmerPlaceholder
            autoRun
            visible={!loading}
            style={{height: 25, width: 220}}>
            <Text h2 black medium>
              Olá, {user && user.nome_usual}!
            </Text>
            <Text gray>Seu dashboard de hoje</Text>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            autoRun
            hasBorder
            visible={!loading}
            style={{height: 50, width: 50, borderRadius: 25}}>
            <Avatar
              onLoadEnd={() => setLoading(false)}
              source={{
                uri: user && `http://suap.ifrn.edu.br/${user.avatar_suap}`,
              }}
            />
          </ShimmerPlaceholder>
        </TopContainer>
      </Container>
    </SafeAreaView>
  );
}
