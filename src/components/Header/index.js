import React from 'react';
import {SafeAreaView} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import PropTypes from 'prop-types';

import Text from '../Text';
import Tab from '../Tab';

import {profile} from '../../constants/mocks';

import {Container, TopContainer, Avatar, TabContainer} from './styles';

export default function Header({loading}) {
  const tabs = ['Materias', 'Mentores', 'Noticias'];

  return (
    <SafeAreaView>
      <Container>
        <TopContainer>
          <ShimmerPlaceHolder autoRun visible={!loading}>
            <Text h1 black>
              Olá, {profile.name}!
            </Text>
          </ShimmerPlaceHolder>
          <ShimmerPlaceHolder
            autoRun
            visible={!loading}
            style={{width: 50, height: 50, borderRadius: 25}}>
            <Avatar source={{uri: profile.avatar}} />
          </ShimmerPlaceHolder>
        </TopContainer>

        <TabContainer>
          <ShimmerPlaceHolder
            autoRun
            visible={!loading}
            style={{width: 80, height: 30}}>
            <Tab tabs={tabs} />
          </ShimmerPlaceHolder>
        </TabContainer>
      </Container>
    </SafeAreaView>
  );
}

Header.propTypes = {
  loading: PropTypes.bool,
};

Header.defaultProps = {
  loading: false,
};
