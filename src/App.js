import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';

import colors from './constants/theme';

import {setOneSignalPlayerId} from './store/modules/app/actions';

import createRouter from './routes';

export default function App() {
  const dispatch = useDispatch();

  const signed = useSelector(state => state.profile.token !== null);
  const firstTime = useSelector(state => state.app.firstTime);

  const postSplashRoute = signed ? 'app' : 'auth';
  const postSplashStatusBarColor = signed ? '#f5f7fb' : '#fff';
  const Routes = createRouter(firstTime ? 'splash' : postSplashRoute);

  function onIds(id) {
    dispatch(setOneSignalPlayerId(id));
  }

  useEffect(() => {
    OneSignal.init(Config.ONESIGNAL_APP_ID);
    OneSignal.addEventListener('received', () => {});
    OneSignal.addEventListener('opened', () => {});
    OneSignal.addEventListener('ids', onIds);
  }, []);

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
