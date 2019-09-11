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

import {getThemeColors} from './constants/theme';

import {resetLoading} from './store/modules/profile/actions';
import {
  toggleDarkMode,
  setOneSignalPlayerId,
} from './store/modules/app/actions';

import createRouter from './routes';

function App() {
  const dispatch = useDispatch();
  const colors = getThemeColors();

  const signed = useSelector(state => state.profile.token !== null);
  const appState = useSelector(state => state.app);

  const {firstTime} = appState;
  const {darkMode} = appState;

  const postSplashRoute = signed ? 'app' : 'auth';
  const Routes = createRouter(firstTime ? 'splash' : postSplashRoute);

  function onIds(id) {
    dispatch(setOneSignalPlayerId(id));
  }

  useEffect(() => {
    setJSExceptionHandler(error => {
      dispatch(resetLoading());
      Alert.alert('Erro!', error);
    });

    setNativeExceptionHandler(exceptionString => {
      dispatch(resetLoading());
      Alert.alert('Erro!', exceptionString);
    });

    OneSignal.init(Config.ONESIGNAL_APP_ID);
    OneSignal.addEventListener('received', () => {});
    OneSignal.addEventListener('opened', () => {});
    OneSignal.addEventListener('ids', onIds);

    function showUpdateMessage(currentVersion, storeVersion, storeName) {
      showMessage({
        type: 'info',
        message: 'Novo update disponível!',
        description: `Você está rodando a versão ${currentVersion}, porém a versão ${storeVersion} já está disponível na ${storeName}.`,
        duration: 5000,
      });
    }

    if (!__DEV__ && Platform.OS === 'android') {
      configCat.getValue('androidVersion', 'Default', storeVersion => {
        const currentVersion = DeviceInfo.getVersion();
        if (currentVersion < storeVersion) {
          showUpdateMessage(currentVersion, storeVersion, 'Play Store');
        }
      });
    } else if (!__DEV__ && Platform.OS === 'ios') {
      configCat.getValue('iosVersion', 'Default', storeVersion => {
        const currentVersion = DeviceInfo.getVersion();
        if (currentVersion < storeVersion) {
          showUpdateMessage(currentVersion, storeVersion, 'App Store');
        }
      });
    }

    if (darkMode === undefined) {
      Alert.alert(
        'Modo escuro!',
        'Agora o app tem um modo escuro.\nGostaria de ativá-lo?',
        [
          {
            text: 'Ativar',
            onPress: () => dispatch(toggleDarkMode(true)),
          },
          {
            text: 'Não',
            onPress: () => {
              dispatch(toggleDarkMode(false));
              Alert.alert(
                'Ok! Deixando no modo claro!',
                'Qualquer coisa, você ativá-la no seu dashboard. Aproveite o app! ;)',
              );
            },
            style: 'cancel',
          },
        ],
      );
    }
  }, []);

  const appStatusBarStyle = colors.darkMode ? 'light-content' : 'dark-content';

  return (
    <>
      <Routes />
      <StatusBar
        backgroundColor={firstTime ? colors.primary : colors.background}
        barStyle={firstTime ? 'light-content' : appStatusBarStyle}
      />
    </>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
