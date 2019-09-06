import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';

import {Container} from './styles';

export default function ViewStudent({navigation}) {
  const student = navigation.getParam('student');

  return (
    <Container>
      <Text gray style={{marginTop: 10}}>
        Matrícula
      </Text>
      <Text>{student.matricula}</Text>
      <Text gray style={{marginTop: 10}}>
        Nome Completo
      </Text>
      <Text>{student.nome_completo}</Text>
      <Text gray style={{marginTop: 10}}>
        Email SUAP
      </Text>
      <Text>{student.email_suap || 'não tem'}</Text>
      <Text gray style={{marginTop: 10}}>
        Email pessoal
      </Text>
      <Text>{student.email_suap || 'não configurou'}</Text>
      <Text gray style={{marginTop: 10}}>
        Curso
      </Text>
      <Text>{student.curso}</Text>
      <Text gray style={{marginTop: 10}}>
        Ano
      </Text>
      <Text>{student.curso_ano || 'não configurou'}</Text>
      <Text gray style={{marginTop: 10}}>
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
