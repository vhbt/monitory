import React, {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
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

import {resetLoading} from './store/modules/profile/actions';
import {
  toggleDarkMode,
  setOneSignalPlayerId,
} from './store/modules/app/actions';

import Routes from './routes';

function App() {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);

  const {darkMode} = appState;

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
    OneSignal.addEventListener('opened', data => {
      const {payload, isAppInFocus} = data.notification;
      const {title, body} = payload;

      if (!isAppInFocus) {
        Alert.alert(title, body);
      }
    });
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
                'Qualquer coisa, você ativá-la no seu perfil. Aproveite o app! ;)',
              );
            },
            style: 'cancel',
          },
        ],
      );
    }
  }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
