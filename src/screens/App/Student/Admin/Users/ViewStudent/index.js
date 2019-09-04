import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';

import {Container} from './styles';

export default function ViewStudent({navigation}) {
  const student = navigation.getParam('student');

  return (
    <Container>
      <Text>{student.matricula}</Text>
    </Container>
  );
}

ViewStudent.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
