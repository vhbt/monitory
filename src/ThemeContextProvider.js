import React, {createContext} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import {toggleDarkMode} from './store/modules/app/actions';

const {Provider, Consumer} = createContext();

function ThemeContextProvider({children}) {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  const {darkMode} = app;
  const {firstTime} = app;

  const darkTheme = {
    darkMode: true,
    accent: '#F3534A',
    accent2: '#e35d5b',
    primary: '#0AC4BA',
    secondary: '#2BDA8E',
    tertiary: '#FFE358',
    black: '#FFF',
    white: '#FFFFFF',
    gray: '#9DA3B4',
    gray2: '#C5CCD6',
    background: '#121212',
    background2: '#1d1d1d',
    card: '#202124',
    icon: '#606368',
  };

  const lighTheme = {
    darkMode: false,
    accent: '#F3534A',
    accent2: '#e35d5b',
    primary: '#0AC4BA',
    secondary: '#2BDA8E',
    tertiary: '#FFE358',
    black: '#323643',
    white: '#FFFFFF',
    gray: '#9DA3B4',
    gray2: '#C5CCD6',
    background: '#f5f7fb',
    background2: '#e6e9f1',
    card: '#fff',
    icon: '#acacb8',
  };

  function handleToggleDarkMode() {
    dispatch(toggleDarkMode(!darkMode));
  }

  const activeTheme = darkMode ? darkTheme : lighTheme;

  return (
    <Provider value={{isDarkModeActive: darkMode, handleToggleDarkMode}}>
      <>
        <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
        <StatusBar
          backgroundColor={
            firstTime ? activeTheme.primary : activeTheme.background
          }
          barStyle={darkMode ? 'light-content' : 'dark-content'}
        />
      </>
    </Provider>
  );
}

export {ThemeContextProvider};

export default Consumer;
