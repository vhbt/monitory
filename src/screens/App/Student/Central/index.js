import React from 'react';
import {SafeAreaView} from 'react-native';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {Container} from './styles';

export default function Student({navigation}) {
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
      </Container>
    </SafeAreaView>
  );
}
