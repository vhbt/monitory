import React from 'react';
import {Image} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import backIcon from './assets/back.png';
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
import ViewSchedules from './screens/App/Student/Schedules/ViewSchedules';

import PostNews from './screens/App/Student/Admin/News/PostNews';

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
                  ViewSchedules: {
                    screen: ViewSchedules,
                    navigationOptions: ({navigation}) => ({
                      title: `${navigation.getParam('selectedClass').name} ${
                        navigation.getParam('selectedClass').year
                      } - ${navigation.getParam('selectedClass').turn}`,
                    }),
                  },
                  PostNews,
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
