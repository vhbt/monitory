import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Alert} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default class Index extends Component {
  constructor(props) {
    super(props);
    OneSignal.init(Config.ONESIGNAL_APP_ID);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    setJSExceptionHandler(error => {
      Alert.alert('Erro!', error);
    });

    setNativeExceptionHandler(exceptionString => {
      Alert.alert('Erro!', exceptionString);
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    );
  }
}
