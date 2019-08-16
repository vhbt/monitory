import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Routes from './routes';

export default function App() {
  return (
    <>
      <Routes />
      <FlashMessage position="top" />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </>
  );
}
