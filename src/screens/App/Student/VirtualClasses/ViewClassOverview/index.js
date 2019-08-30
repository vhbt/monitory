import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {parseISO, isAfter, subDays} from 'date-fns';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {showMessage} from 'react-native-flash-message';

import Text from '../../../../../components/Text';

import {suap_api} from '../../../../../services/api';

import colors from '../../../../../constants/theme';
import {Container} from './styles';

export default function ViewClassOverview({navigation}) {
  const myClass = navigation.getParam('data');

  const [myClassData, setMyClassData] = useState(null);
  const [classes, setClasses] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getClassData() {
    try {
      const response = await suap_api.get(
        `/minhas-informacoes/turma-virtual/${myClass.id}`,
      );

      const last30daysClasses = response.data.aulas.filter(aula =>
        isAfter(parseISO(aula.data), subDays(new Date(), 30)),
      );

      setMyClassData(response.data);
      setClasses(last30daysClasses);
      setLoading(false);
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
    getClassData();
  }, []);

  function renderGradesShimmerRows(numberOfRows) {
    const shimmerRows = [];

    for (let i = 0; i < numberOfRows; i += 1) {
      shimmerRows.push(
        <ShimmerPlaceholder
          key={i}
          autoRun
          style={{
            marginTop: 10,
            height: 100,
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
      <View style={{marginBottom: 10}}>
        <Text h3 black medium>
          Professor(a):
        </Text>
        <ShimmerPlaceholder
          autoRun
          visible={!loading}
          style={{width: 200, height: 15, marginVertical: 5}}>
          <Text black>{myClassData && myClassData.professores[0].nome}</Text>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          autoRun
          visible={!loading}
          style={{width: 180, height: 15}}>
          <Text black>{myClassData && myClassData.professores[0].email}</Text>
        </ShimmerPlaceholder>
      </View>
      <View>
        <Text h3 black medium>
          Aulas dos ultimos 30 dias
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 110, marginTop: 10}}
          data={classes}
          keyExtractor={item => String(item.data)}
          ListEmptyComponent={
            loading ? (
              renderGradesShimmerRows(4)
            ) : (
              <Text gray>Ainda não há nada aqui.</Text>
            )
          }
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: colors.black,
                padding: 10,
                marginBottom: 10,
                borderRadius: 4,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginRight: 10}}>
                  <Text white semibold>
                    Aulas:
                  </Text>
                  <Text white>{item.quantidade}</Text>
                </View>
                <View style={{alignItems: 'center', marginRight: 10}}>
                  <Text white semibold>
                    Faltas:
                  </Text>
                  <Text white>{item.faltas}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text white semibold>
                    Data:
                  </Text>
                  <Text white>{item.data}</Text>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text white semibold>
                  Conteúdo:
                </Text>
                <Text white>{item.conteudo}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </Container>
  );
}

ViewClassOverview.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('data').formattedDisciplina,
});
