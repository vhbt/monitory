import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {Container} from './styles';

export default function Central({navigation}) {
  const user = useSelector(state => state.profile.user);
  const isAdmin = user.admin;

  return (
    <SafeAreaView>
      <Container>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Text h1 semibold>
            Central do Aluno
          </Text>
          <Button
            style={{height: 44, alignSelf: 'stretch', marginTop: 30}}
            onPress={() => navigation.navigate('SelectReport')}>
            <Text white>Meu Boletim</Text>
          </Button>
          <Button
            style={{height: 44, alignSelf: 'stretch', marginTop: 5}}
            onPress={() => navigation.navigate('SelectSchedules')}>
            <Text white>Meus Horários</Text>
          </Button>
          {isAdmin ? (
            <>
              <Button
                style={{height: 44, alignSelf: 'stretch', marginTop: 30}}
                onPress={() => navigation.navigate('PostNews')}>
                <Text white>Postar Noticia</Text>
              </Button>
              <Button
                style={{height: 44, alignSelf: 'stretch', marginTop: 5}}
                onPress={() => navigation.navigate('Notifications')}>
                <Text white>Enviar Notificacao</Text>
              </Button>
            </>
          ) : null}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

Central.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
