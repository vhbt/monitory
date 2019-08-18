import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import {Container} from './styles';

export default function Report({navigation}) {
  const selectedClass = navigation.getParam('selectedClass');

  return (
    <Container>
      <Image
        source={{uri: selectedClass.path}}
        style={{width: '100%', aspectRatio: 1.47}}
      />
    </Container>
  );
}

Report.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
