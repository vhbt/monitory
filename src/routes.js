import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from './constants/theme';

import Welcome from './screens/Auth/Welcome';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import Home from './screens/App/Home';
import Profile from './screens/App/Profile';

import StudentCentral from './screens/App/Student/Central';
import SelectReport from './screens/App/Student/Report/SelectReport';
import ViewReport from './screens/App/Student/Report/ViewReport';

import SelectSchedules from './screens/App/Student/Schedules/SelectSchedules';

import PostNews from './screens/App/Student/Admin/News/PostNews';
import Notifications from './screens/App/Student/Admin/Notifications';

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
              headerBackTitle: null,
            },
          },
        ),
        app: createBottomTabNavigator(
          {
            Home,
            Student: {
              screen: createStackNavigator(
                {
                  StudentCentral,
                  SelectReport,
                  ViewReport: {
                    screen: ViewReport,
                    navigationOptions: ({navigation}) => ({
                      title: `Boletim ${
                        navigation.getParam('period').split('/')[0]
                      }`,
                    }),
                  },
                  SelectSchedules,
                  PostNews,
                  Notifications,
                },
                {
                  defaultNavigationOptions: {
                    headerStyle: {
                      backgroundColor: '#fafafa',
                      borderBottomColor: '#fafafa',
                      elevation: 0,
                    },
                    headerLeftContainerStyle: {
                      alignItems: 'center',
                      marginLeft: 16,
                      paddingRight: 16,
                    },
                    headerBackTitle: null,
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Aluno',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="ios-school" size={32} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            defaultNavigationOptions: {
              tabBarOptions: {
                activeTintColor: colors.primary,
                showLabel: true,
                keyboardHidesTabBar: true,
                style: {
                  borderTopWidth: 0,
                  height: 55,
                },
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
