import React from 'react';
import { Image } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Welcome from './screens/Welcome'

export default createAppContainer(
  createStackNavigator({
    Welcome,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {},
      headerBackImage: <Image />,
      headerBackTitle: null,
    }
  })
)