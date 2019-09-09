import React, {useEffect} from 'react';
import {StatusBar, Alert, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {showMessage} from 'react-native-flash-message';
import CodePush from 'react-native-code-push';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import configCat from './services/configcat';

import colors from './constants/theme';

import {resetLoading} from './store/modules/profile/actions';
import {setOneSignalPlayerId} from './store/modules/app/actions';

import createRouter from './routes';

function App() {
  const dispatch = useDispatch();

  const signed = useSelector(state => state.profile.token !== null);
  const firstTime = useSelector(state => state.app.firstTime);

  const postSplashRoute = signed ? 'app' : 'auth';
  const postSplashStatusBarColor = signed ? '#f5f7fb' : '#fff';
  const Routes = createRouter(firstTime ? 'splash' : postSplashRoute);

  useEffect(() => {
    setJSExceptionHandler(error => {
      dispatch(resetLoading());
      Alert.alert('Erro!', error);
    });

    setNativeExceptionHandler(exceptionString => {
      dispatch(resetLoading());
      Alert.alert('Erro!', exceptionString);
    });
  }, []);

  function onIds(id) {
    dispatch(setOneSignalPlayerId(id));
  }
  useEffect(() => {
    OneSignal.init(Config.ONESIGNAL_APP_ID);
    OneSignal.addEventListener('received', () => {});
    OneSignal.addEventListener('opened', () => {});
    OneSignal.addEventListener('ids', onIds);

    if (!__DEV__ && Platform.OS === 'android') {
      configCat.getValue('androidVersion', 'Default', storeVersion => {
        const currentVersion = DeviceInfo.getVersion();
        if (currentVersion < storeVersion) {
          showMessage({
            type: 'info',
            message: 'Novo update disponível!',
            description: `Você está rodando a versão ${currentVersion}, porém a versão ${storeVersion} já está disponível na Google Play.`,
            duration: 5000,
          });
        }
      });
    } else if (!__DEV__ && Platform.OS === 'ios') {
      configCat.getValue('iosVersion', 'Default', storeVersion => {
        const currentVersion = DeviceInfo.getVersion();
        if (currentVersion < storeVersion) {
          showMessage({
            type: 'info',
            message: 'Novo update disponível!',
            description: `Você está rodando a versão ${currentVersion}, porém a versão ${storeVersion} já está disponível na App Store.`,
            duration: 5000,
          });
        }
      });
    }
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

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
