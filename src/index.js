import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default class Index extends Component {
  constructor(props) {
    super(props);
    OneSignal.init('7c054be9-7863-4524-beff-5e6c36c0cd3b');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
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
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        </PersistGate>
      </Provider>
    );
  }
}
