import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, ActivityIndicator} from 'react-native';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {suap_api} from '../../../../services/api';
import colors from '../../../../constants/theme';

import {Container} from './styles';

export default function SelectReport({navigation}) {
  const token = useSelector(state => state.profile.token);

  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    async function getPeriods() {
      const response = await suap_api.get(
        '/minhas-informacoes/meus-periodos-letivos/',
        {
          headers: {Authorization: `JWT ${token}`},
        },
      );

      setPeriods(response.data);
    }

    getPeriods();
  }, []);

  return (
    <Container>
      <Text h1>De qual ano e período?</Text>
      <FlatList
        data={periods}
        keyExtractor={item => `${item.ano_letivo}-${item.periodo_letivo}`}
        style={{marginTop: 30}}
        ListEmptyComponent={
          <ActivityIndicator size="large" color={colors.primary} />
        }
        renderItem={({item}) => (
          <Button
            style={{height: 44, alignSelf: 'stretch'}}
            onPress={() =>
              navigation.navigate('Report', {
                period: `${item.ano_letivo}/${item.periodo_letivo}`,
              })
            }>
            <Text white>
              {item.ano_letivo}/{item.periodo_letivo}
            </Text>
          </Button>
        )}
      />
    </Container>
  );
}
