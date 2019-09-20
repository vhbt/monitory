import React from 'react';
import {useSelector} from 'react-redux';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {Container} from './styles';

function Home({navigation, theme}) {
  const user = useSelector(state => state.profile.user);
  const isAdmin = user.admin;

  const adminScreens = [
    {
      text: 'Postar Notícia',
      screen: 'AdminPostNews',
    },
    {
      text: 'Notificações',
      screen: 'AdminNotifications',
    },
    {
      text: 'Alunos',
      screen: 'AdminUsers',
    },
    {
      text: 'Feedbacks',
      screen: 'AdminQuestions',
    },
    {
      text: 'Gerenciar Eventos',
      screen: 'AdminEventsHome',
    },
  ];

  function renderAdminButtons() {
    const button = [];

    adminScreens.forEach(item => {
      button.push(
        <Button
          colors={[theme.accent, theme.accent]}
          style={{height: 44, alignSelf: 'stretch', marginTop: 5}}
          onPress={() => navigation.navigate(item.screen)}>
          <Text white>{item.text}</Text>
        </Button>,
      );
    });

    return <>{button}</>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Text h1 black semibold>
            Central do Aluno
          </Text>
          <View style={{marginTop: 25}}>
            <Button
              style={{height: 44, alignSelf: 'stretch', marginTop: 5}}
              onPress={() => navigation.navigate('SelectReport')}>
              <Text white>Meu Boletim</Text>
            </Button>
            <Button
              style={{height: 44, alignSelf: 'stretch', marginTop: 5}}
              onPress={() => navigation.navigate('Schedules')}>
              <Text white>Meus Horários</Text>
            </Button>
            <Button
              style={{height: 44, alignSelf: 'stretch', marginTop: 5}}
              onPress={() => navigation.navigate('SelectClass')}>
              <Text white>Turmas Virtuais</Text>
            </Button>
          </View>
          {isAdmin ? (
            <View style={{marginTop: 25}}>{renderAdminButtons()}</View>
          ) : null}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

Home.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  theme: PropTypes.shape({
    accent: PropTypes.string,
  }).isRequired,
};

export default withTheme(Home);
