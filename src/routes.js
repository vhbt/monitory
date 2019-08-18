import React from 'react';
import {Image} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import backIcon from './assets/back.png';
import colors from './constants/theme';

import Welcome from './screens/Auth/Welcome';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import Home from './screens/App/Home';
import Profile from './screens/App/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        auth: createStackNavigator(
          {
            Welcome,
            Login,
            SignUp,
          },
          {
            defaultNavigationOptions: {
              headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'transparent',
                elevation: 0,
              },
              headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: 16,
                paddingRight: 16,
              },
              headerBackImage: <Image source={backIcon} />,
              headerBackTitle: null,
            },
          },
        ),
        app: createBottomTabNavigator(
          {
            Home,
            Profile,
          },
          {
            defaultNavigationOptions: {
              tabBarOptions: {
                activeTintColor: colors.primary,
                showLabel: true,
                keyboardHidesTabBar: true,
              },
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'app' : 'auth',
      },
    ),
  );
