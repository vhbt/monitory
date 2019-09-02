import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';

import colors from './constants/theme';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.profile.token !== null);
  const firstTime = useSelector(state => state.app.firstTime);

  const postSplashRoute = signed ? 'app' : 'auth';
  const postSplashStatusBarColor = signed ? '#f5f7fb' : '#fff';
  const Routes = createRouter(firstTime ? 'splash' : postSplashRoute);

  return (
    <>
      <Routes />
      <StatusBar
        backgroundColor={firstTime ? colors.primary : postSplashStatusBarColor}
        barStyle={firstTime ? 'light-content' : 'dark-content'}
      />
    </>
  );
}
