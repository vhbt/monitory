import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default function Index() {
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
