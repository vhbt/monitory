import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import backIcon from './assets/back.png';

import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

export default createAppContainer(
  createStackNavigator(
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
);
