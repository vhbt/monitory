import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {ThemeContextProvider} from './ThemeContextProvider';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeContextProvider>
          <>
            <App />
            <FlashMessage position="top" />
          </>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  );
}

console.disableYellowBox = true;

export default Index;
