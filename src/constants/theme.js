import {useSelector} from 'react-redux';

export const LIGHT_COLORS = {
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

export const DARK_COLORS = {
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

export const getThemeColors = () => {
  const darkMode = useSelector(state => state.app.darkMode);

  return darkMode ? DARK_COLORS : LIGHT_COLORS;
};

export default LIGHT_COLORS;
