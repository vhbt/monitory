import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {showMessage} from 'react-native-flash-message';

import Text from '../../../../../components/Text';
import Button from '../../../../../components/Button';

import {suap_api} from '../../../../../services/api';

import {Container} from './styles';

export default function SelectClass({navigation}) {
  const [myClasses, setMyClasses] = useState([]);

  async function getClasses() {
    try {
      const responsePeriods = await suap_api.get(
        'minhas-informacoes/meus-periodos-letivos/',
      );

      const periods = responsePeriods.data.filter(
        period => period.periodo_letivo !== 2,
      );

      const currentPeriod = periods[periods.length - 1];
      const formattedCurrentPeriod = `${currentPeriod.ano_letivo}/${currentPeriod.periodo_letivo}`;

      const response = await suap_api.get(
        `minhas-informacoes/turmas-virtuais/${formattedCurrentPeriod}/`,
      );

      const data = response.data.map(myClass => ({
        ...myClass,
        formattedDisciplina: myClass.descricao.split('(')[0],
      }));

      setMyClasses(data);
    } catch (err) {
      if (err.response) {
        showMessage({type: 'danger', message: err.response.data.detail});
      } else {
        showMessage({
          type: 'danger',
          message: 'Erro de conexão',
          description: 'Verifique sua conexão com a internet.',
        });
      }

      navigation.goBack();
    }
  }

  useEffect(() => {
    getClasses();
  }, []);

  function renderGradesShimmerRows(numberOfRows) {
    const shimmerRows = [];

    for (let i = 0; i < numberOfRows; i += 1) {
      shimmerRows.push(
        <ShimmerPlaceholder
          key={i}
          autoRun
          style={{
            marginVertical: 5,
            height: 58,
            width: '100%',
            borderRadius: 4,
          }}
        />,
      );
    }

    return <>{shimmerRows}</>;
  }

  return (
    <Container>
      <Text h1 black semibold>
        Minhas Matérias
      </Text>
      <FlatList
        style={{marginTop: 10}}
        showsVerticalScrollIndicator={false}
        data={myClasses}
        ListEmptyComponent={renderGradesShimmerRows(8)}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Button
            style={{height: 58, alignSelf: 'stretch'}}
            onPress={() =>
              navigation.navigate('ViewClassOverview', {data: item})
            }>
            <Text white style={{textAlign: 'center', width: 240}}>
              {item.formattedDisciplina}
            </Text>
          </Button>
        )}
      />
    </Container>
  );
}
