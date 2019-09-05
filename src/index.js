import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Alert} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default function Index() {
  useEffect(() => {
    setJSExceptionHandler(error => {
      Alert.alert('Erro!', error);
    });

    setNativeExceptionHandler(exceptionString => {
      Alert.alert('Erro!', exceptionString);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
}
