import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export default function StarterScreen({navigation}) {
  const storedState = useSelector(state => state);

  const {firstTime} = storedState.app;
  const {token} = storedState.profile;

  useEffect(() => {
    if (firstTime) {
      navigation.navigate('splash');
    } else if (token) {
      navigation.navigate('app');
    } else {
      navigation.navigate('auth');
    }
  }, []);

  return <View />;
}

StarterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
