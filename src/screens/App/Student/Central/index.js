import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {Container} from './styles';

export default function Central({navigation}) {
  const isAdmin = true;

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
              <Text h1 semibold style={{marginTop: 20}}>
                Central do Admin
              </Text>
              <Button
                style={{height: 44, alignSelf: 'stretch', marginTop: 30}}
                onPress={() => navigation.navigate('PostNews')}>
                <Text white>Postar Noticia</Text>
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
