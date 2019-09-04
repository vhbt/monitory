import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';

import {Container} from './styles';

export default function ViewStudent({navigation}) {
  const student = navigation.getParam('student');

  return (
    <Container>
      <Text black semibold style={{marginTop: 10}}>
        Matrícula
      </Text>
      <Text>{student.matricula}</Text>
      <Text black semibold style={{marginTop: 5}}>
        Nome Completo
      </Text>
      <Text>{student.nome_completo}</Text>
      <Text black semibold style={{marginTop: 5}}>
        Email SUAP
      </Text>
      <Text>{student.email_suap}</Text>
      <Text black semibold style={{marginTop: 5}}>
        Email pessoal
      </Text>
      <Text>{student.email_suap || 'não configurou'}</Text>
      <Text black semibold style={{marginTop: 5}}>
        Curso
      </Text>
      <Text>{student.curso}</Text>
      <Text black semibold style={{marginTop: 5}}>
        Ano
      </Text>
      <Text>{student.curso_ano || 'não configurou'}</Text>
      <Text black semibold style={{marginTop: 5}}>
        Turno
      </Text>
      <Text>{student.curso_turno || 'não configurou'}</Text>
    </Container>
  );
}

ViewStudent.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('student').nome_usual,
});

ViewStudent.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
