import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../../components/Text';
import GradesCard from '../../../../../components/GradesCard';

import {suap_api} from '../../../../../services/api';
import {getThemeColors} from '../../../../../constants/theme';

import {Container} from './styles';

function Report({navigation}) {
  const period = navigation.getParam('period');
  const colors = getThemeColors();

  const [grades, setGrades] = useState([]);
  const [totalAttendence, setTotalAttendence] = useState([]);

  useEffect(() => {
    async function getGrades() {
      try {
        const response = await suap_api.get(
          `/minhas-informacoes/boletim/${period}/`,
        );

        const data = response.data.map(grade => ({
          ...grade,
          formattedDisciplina: grade.disciplina.split('-')[1].split('(')[0],
        }));

        const total = data.reduce(
          (prev, curr) =>
            prev + Math.floor(curr.percentual_carga_horaria_frequentada),
          0,
        );

        setTotalAttendence(Math.floor(total / data.length - 0.4));
        setGrades(data);
      } catch (err) {
        if (err.response.status === 404) {
          showMessage({
            type: 'warning',
            message: 'Não encontrado',
            description: 'Ainda não há registros para o período selecionado.',
          });
          navigation.navigate('SelectReport');
        } else if (err.response) {
          navigation.navigate('SelectReport');
          showMessage({type: 'danger', message: err.response.data.detail});
        } else {
          showMessage({
            type: 'danger',
            message: 'Erro de conexão',
            description: 'Verifique sua conexão com a internet.',
          });
          navigation.navigate('SelectReport');
        }
      }
    }

    getGrades();
  }, []);

  function renderGradesShimmerRows(numberOfRows) {
    const shimmerRows = [];

    for (let i = 0; i < numberOfRows; i += 1) {
      shimmerRows.push(
        <ShimmerPlaceholder
          key={i}
          autoRun
          colorShimmer={[
            colors.background2,
            colors.background2,
            colors.background,
          ]}
          style={{
            marginBottom: 10,
            height: 130,
            width: '100%',
            borderRadius: 4,
          }}
        />,
      );
    }

    return <>{shimmerRows}</>;
  }

  return (
    <Container colors={colors}>
      <FlatList
        data={grades}
        keyExtractor={item => item.codigo_diario}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderGradesShimmerRows(5)}
        ListHeaderComponent={
          <View
            style={{
              marginVertical: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <ShimmerPlaceholder
              autorun
              style={{width: 135, height: 18}}
              colorShimmer={[
                colors.background2,
                colors.background2,
                colors.background,
              ]}
              visible={grades.length > 0}>
              <Text black>Presença total: {totalAttendence}%</Text>
            </ShimmerPlaceholder>
          </View>
        }
        renderItem={({item}) => {
          const semiannual = item.quantidade_avaliacoes === 2;
          const secondhalf = item.segundo_semestre;

          const semiannualGrades = secondhalf
            ? [
                [null, 1],
                [null, 2],
                [item.nota_etapa_1.nota, 3],
                [item.nota_etapa_2.nota, 4],
                [item.media_disciplina, 'M'],
                [item.nota_avaliacao_final.nota, 'F'],
                [item.media_final_disciplina, 'Media Final'],
              ]
            : [
                [item.nota_etapa_1.nota, 1],
                [item.nota_etapa_2.nota, 2],
                [null, 3],
                [null, 4],
                [item.media_disciplina, 'M'],
                [item.nota_avaliacao_final.nota, 'F'],
                [item.media_final_disciplina, 'Media Final'],
              ];

          const gradesTags = semiannual
            ? semiannualGrades
            : [
                [item.nota_etapa_1.nota, 1],
                [item.nota_etapa_2.nota, 2],
                [item.nota_etapa_3.nota, 3],
                [item.nota_etapa_4.nota, 4],
                [item.media_disciplina, 'M'],
                [item.nota_avaliacao_final.nota, 'F'],
                [item.media_final_disciplina, 'Media Final'],
              ];

          return (
            <GradesCard
              key={item.codigo_diario}
              title={item.formattedDisciplina}
              colors={['#323643', '#323643']}
              white
              grades={gradesTags}
              semiannual={item.quantidade_avaliacoes === 2}
              attendance={item.percentual_carga_horaria_frequentada}
              status={item.situacao}
              style={{marginBottom: 10, height: 130, borderRadius: 4}}
              onPress={() => navigation.navigate('ViewFullReport', {item})}
            />
          );
        }}
      />
    </Container>
  );
}

Report.navigationOptions = ({navigation, screenProps}) => ({
  title: `Boletim ${navigation.getParam('period').split('/')[0]}`,
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

Report.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default withTheme(Report);
