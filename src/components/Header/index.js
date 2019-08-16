import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import PropTypes from 'prop-types';

import Text from '../Text';

import {profile} from '../../constants/mocks';

import {Container, Avatar} from './styles';

export default function Header({loading}) {
  return (
    <Container>
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
    </Container>
  );
}

Header.propTypes = {
  loading: PropTypes.bool,
};

Header.defaultProps = {
  loading: false,
};
