import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import colors from './constants/theme';

import Splash from './screens/Splash';

import Welcome from './screens/Auth/Welcome';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import Home from './screens/App/Home';
import Profile from './screens/App/Profile';

import StudentHome from './screens/App/Student/Home';
import SelectReport from './screens/App/Student/Report/SelectReport';
import ViewReport from './screens/App/Student/Report/ViewReport';
import ViewFullReport from './screens/App/Student/Report/ViewFullReport';

import Schedules from './screens/App/Student/Schedules';

import PostNews from './screens/App/Student/Admin/News/PostNews';

import Notifications from './screens/App/Student/Admin/Notifications/Home';
import SendToClasses from './screens/App/Student/Admin/Notifications/SendToClasses';

import SelectClass from './screens/App/Student/VirtualClasses/SelectClass';
import ViewClassOverview from './screens/App/Student/VirtualClasses/ViewClassOverview';

function StudentIcon({tintColor}) {
  return <Icon name="ios-school" size={32} color={tintColor} />;
}

export default (initialRoute = 'splash') =>
  createAppContainer(
    createSwitchNavigator(
      {
        splash: createStackNavigator(
          {
            Splash,
          },
          {
            defaultNavigationOptions: {
              header: null,
            },
          },
        ),
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
                  StudentHome,
                  SelectReport,
                  ViewReport,
                  ViewFullReport,
                  Schedules,
                  PostNews,
                  Notifications,
                  SendToClasses,
                  SelectClass,
                  ViewClassOverview,
                },
                {
                  defaultNavigationOptions: {
                    headerStyle: {
                      backgroundColor: '#f5f7fb',
                      borderBottomColor: '#f5f7fb',
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
                tabBarIcon: StudentIcon,
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
        initialRouteName: initialRoute,
      },
    ),
  );

StudentIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
