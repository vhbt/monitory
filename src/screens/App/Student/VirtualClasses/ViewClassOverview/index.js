import React, {useEffect, useState} from 'react';
import {View, FlatList, Linking} from 'react-native';
import {parseISO, isAfter, subDays} from 'date-fns';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../../../../../components/Text';

import {suap_api} from '../../../../../services/api';

import colors from '../../../../../constants/theme';
import {Container} from './styles';

export default function ViewClassOverview({navigation}) {
  const myClass = navigation.getParam('data');

  const [myClassData, setMyClassData] = useState(null);
  const [classes, setClasses] = useState(null);
  const [materiais, setMateriais] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getClassData() {
    try {
      const response = await suap_api.get(
        `/minhas-informacoes/turma-virtual/${myClass.id}/`,
      );

      const last30daysClasses = response.data.aulas.filter(aula =>
        isAfter(parseISO(aula.data), subDays(new Date(), 30)),
      );

      setMyClassData(response.data);
      setClasses(last30daysClasses);
      setMateriais(response.data.materiais_de_aula);
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

  function renderGradesShimmerRows(
    numberOfRows,
    height,
    width,
    direction = 'column',
  ) {
    const shimmerRows = [];

    for (let i = 0; i < numberOfRows; i += 1) {
      shimmerRows.push(
        <ShimmerPlaceholder
          key={i}
          autoRun
          style={{
            marginRight: direction === 'row' ? 10 : 0,
            marginBottom: direction === 'column' ? 5 : 0,
            borderRadius: 4,
            height,
            width,
          }}
        />,
      );
    }

    return <View style={{flexDirection: direction}}>{shimmerRows}</View>;
  }

  return (
    <Container>
      <View style={{marginBottom: 15, paddingHorizontal: 30}}>
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
        <Text h3 black medium style={{paddingHorizontal: 30}}>
          Aulas dos ultimos 30 dias
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}
          data={classes}
          keyExtractor={item => String(item.data)}
          ListEmptyComponent={
            loading ? (
              renderGradesShimmerRows(2, 140, 240, 'row')
            ) : (
              <Text gray>Ainda não há nada aqui.</Text>
            )
          }
          ListHeaderComponent={<View style={{marginLeft: 30}} />}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: colors.black,
                padding: 10,
                marginRight: 10,
                borderRadius: 4,
                height: 140,
                width: 240,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginRight: 10,
                }}>
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
                <Text white style={{flexWrap: 'wrap'}}>
                  {item.conteudo}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{marginTop: 15, flex: 1, marginHorizontal: 30}}>
        <Text h3 black medium style={{marginBottom: 10}}>
          Materiais Postados
        </Text>
        <FlatList
          data={materiais}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.descricao)}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{marginBottom: 5}}>
                <Text black>{item.descricao || 'Arquivo sem nome'}</Text>
                <Text gray>{item.data_vinculacao}</Text>
              </View>
              <Icon
                name="md-download"
                size={22}
                onPress={() =>
                  Linking.openURL(`https://suap.ifrn.edu.br${item.url}`)
                }
              />
            </View>
          )}
          ListEmptyComponent={
            loading ? (
              renderGradesShimmerRows(5, 32, 230)
            ) : (
              <Text gray>Ainda não há nada aqui.</Text>
            )
          }
        />
      </View>
    </Container>
  );
}

ViewClassOverview.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('data').formattedDisciplina,
});
