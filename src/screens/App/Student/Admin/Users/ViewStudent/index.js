import React from 'react';
import {ScrollView} from 'react-native';
import {format, parseISO} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';

import {getThemeColors} from '../../../../../../constants/theme';
import {Container} from './styles';

function ViewStudent({navigation}) {
  const student = navigation.getParam('student');
  const colors = getThemeColors();

  return (
    <Container colors={colors}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <Text gray style={{marginTop: 10}}>
          Matrícula
        </Text>
        <Text black>{student.matricula}</Text>
        <Text gray style={{marginTop: 10}}>
          Nome Completo
        </Text>
        <Text black>{student.nome_completo}</Text>
        <Text gray style={{marginTop: 10}}>
          Email SUAP
        </Text>
        <Text black>{student.email_suap || 'não tem'}</Text>
        <Text gray style={{marginTop: 10}}>
          Email pessoal
        </Text>
        <Text black>{student.email_suap || 'não configurou'}</Text>
        <Text gray style={{marginTop: 10}}>
          Curso
        </Text>
        <Text black>{student.curso}</Text>
        <Text gray style={{marginTop: 10}}>
          Ano
        </Text>
        <Text black>{student.curso_ano || 'não configurou'}</Text>
        <Text gray style={{marginTop: 10}}>
          Turno
        </Text>
        <Text black>{student.curso_turno || 'não configurou'}</Text>
        <Text gray style={{marginTop: 10}}>
          Dispositivos
        </Text>
        <Text black>{student.devices.length}</Text>
        <Text gray style={{marginTop: 10}}>
          Registrado em
        </Text>
        <Text black>
          {format(parseISO(student.createdAt), "d 'de' MMMM 'às' HH:MM", {
            locale: ptbr,
          })}
        </Text>
      </ScrollView>
    </Container>
  );
}

ViewStudent.navigationOptions = ({navigation, screenProps}) => ({
  title: navigation.getParam('student').nome_usual,
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

ViewStudent.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default withTheme(ViewStudent);
