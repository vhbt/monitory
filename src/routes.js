import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import StarterScreen from './screens/StarterScreen';

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

import AdminPostNews from './screens/App/Student/Admin/News/PostNews';

import AdminNotifications from './screens/App/Student/Admin/Notifications/Home';
import AdminSendNotification from './screens/App/Student/Admin/Notifications/SendNotification';

import AdminUsers from './screens/App/Student/Admin/Users/Home';
import AdminViewStudent from './screens/App/Student/Admin/Users/ViewStudent';

import SelectClass from './screens/App/Student/VirtualClasses/SelectClass';
import ViewClassOverview from './screens/App/Student/VirtualClasses/ViewClassOverview';

import AdminQuestions from './screens/App/Student/Admin/Questions/Home';

import EventsHome from './screens/App/Events/Home';
import VotingEvent from './screens/App/Events/VotingEvent';

import AdminEventsHome from './screens/App/Student/Admin/Events/Home';
import AdminVotingEvent from './screens/App/Student/Admin/Events/VotingEvent';

function StudentIcon({tintColor}) {
  return <Icon name="ios-school" size={32} color={tintColor} />;
}

function EventsIcon({tintColor}) {
  return <Icon name="ios-calendar" size={32} color={tintColor} />;
}

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      StarterScreen,
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
                SelectClass,
                ViewClassOverview,
                AdminPostNews,
                AdminNotifications,
                AdminSendNotification,
                AdminUsers,
                AdminViewStudent,
                AdminQuestions,
                AdminEventsHome,
                AdminVotingEvent,
              },
              {
                defaultNavigationOptions: {
                  headerStyle: {
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
          Events: {
            screen: createStackNavigator(
              {
                EventsHome,
                VotingEvent,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Eventos',
                  tabBarIcon: EventsIcon,
                },
              },
            ),
          },
          Profile,
        },
        {
          defaultNavigationOptions: {
            tabBarOptions: {
              showLabel: true,
              keyboardHidesTabBar: true,
              style: {
                borderTopWidth: 0,
                height: 58,
                backgroundColor: props =>
                  props.theme.darkMode
                    ? props.theme.background
                    : props.theme.white,
              },
              activeTintColor: props => props.theme.primary,
            },
          },
        },
      ),
    },
    {
      initialRouteName: 'StarterScreen',
    },
  ),
);

StudentIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

EventsIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withTheme(({theme}) => <Routes screenProps={{theme}} />);
