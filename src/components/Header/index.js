import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, View} from 'react-native';
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
            <View style={{flexDirection: 'row'}}>
              <Text h2 black medium>
                Olá,{' '}
              </Text>
              <Text h2 black semibold>
                {user && user.nome_usual.split(' ')[0]}!
              </Text>
            </View>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            autoRun
            hasBorder
            visible={!loading}
            style={{height: 40, width: 40, borderRadius: 20}}>
            <Avatar
              onLoadEnd={() => setLoading(false)}
              source={{
                uri: user && `https://suap.ifrn.edu.br/${user.avatar_suap}`,
              }}
            />
          </ShimmerPlaceholder>
        </TopContainer>
      </Container>
    </SafeAreaView>
  );
}
