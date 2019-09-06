import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Alert} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import './config/ReactotronConfig';

import { resetLoading } from './store/modules/profile/actions'

import {store, persistor} from './store';
import App from './App';

export default function Index() {
  const dispatch = useDispatch();

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

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
}
