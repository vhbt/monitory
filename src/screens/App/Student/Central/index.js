import React from 'react';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {Container} from './styles';

export default function Central({navigation}) {
  return (
    <SafeAreaView>
      <Container>
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
      </Container>
    </SafeAreaView>
  );
}

Central.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
