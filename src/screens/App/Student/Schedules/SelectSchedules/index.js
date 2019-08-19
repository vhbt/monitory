import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../../../components/Text';
import Button from '../../../../../components/Button';

import colors from '../../../../../constants/theme';

import {Container} from './styles';

export default function SelectSchedules({navigation}) {
  const user = useSelector(state => state.profile.user);

  const classes = [
    {
      name: 'Informática',
      year: 1,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/info1m.png',
    },
    {
      name: 'Informática',
      year: 2,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/info2m.png',
    },
    {
      name: 'Informática',
      year: 3,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/info3m.png',
    },
    {
      name: 'Informática',
      year: 4,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/info4m.png',
    },
    {
      name: 'Mecatrônica',
      year: 1,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/meca1m.png',
    },
    {
      name: 'Mecatrônica',
      year: 2,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/meca2m.png',
    },
    {
      name: 'Mecatrônica',
      year: 3,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/meca3m.png',
    },
    {
      name: 'Mecatrônica',
      year: 4,
      turn: 'Matutino',
      path: 'http://10.0.3.2:3333/files/horarios/meca4m.png',
    },
  ];

  const myClasses = classes.filter(mc => {
    if (user.curso_ano && user.curso_turno) {
      return (
        user.curso.includes(mc.name) &&
        Number(user.curso_ano) === mc.year &&
        user.curso_turno === mc.turn
      );
    }
    return mc;
  });

  return (
    <Container>
      <Text h1>De qual turma e turno?</Text>
      <FlatList
        data={myClasses}
        keyExtractor={item => item.name + item.year + item.turn}
        style={{marginTop: 30}}
        ListEmptyComponent={
          <ActivityIndicator size="large" color={colors.primary} />
        }
        renderItem={({item}) => (
          <Button
            style={{height: 44, alignSelf: 'stretch'}}
            onPress={() =>
              navigation.navigate('ViewSchedules', {
                selectedClass: item,
              })
            }>
            <Text white>
              {item.name} {item.year} - {item.turn}
            </Text>
          </Button>
        )}
      />
    </Container>
  );
}

SelectSchedules.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
