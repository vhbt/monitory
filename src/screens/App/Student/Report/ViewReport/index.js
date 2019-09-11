import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import PropTypes from 'prop-types';

import GradesCard from '../../../../../components/GradesCard';

import {suap_api} from '../../../../../services/api';
import {getThemeColors} from '../../../../../constants/theme';

import {Container} from './styles';

export default function Report({navigation}) {
  const period = navigation.getParam('period');
  const colors = getThemeColors();

  const [grades, setGrades] = useState([]);

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
        ListTop
        renderItem={({item}) => (
          <GradesCard
            key={item.codigo_diario}
            title={item.formattedDisciplina}
            colors={['#323643', '#323643']}
            white
            grades={[
              [item.nota_etapa_1.nota, 1],
              [item.nota_etapa_2.nota, 2],
              [item.nota_etapa_3.nota, 3],
              [item.nota_etapa_4.nota, 4],
              [item.media_disciplina, 'M'],
              [item.nota_avaliacao_final.nota, 'F'],
              [item.media_final_disciplina, 'Media Final'],
            ]}
            attendance={item.percentual_carga_horaria_frequentada}
            status={item.situacao}
            style={{marginBottom: 10, height: 130, borderRadius: 4}}
            onPress={() => navigation.navigate('ViewFullReport', {item})}
          />
        )}
      />
    </Container>
  );
}

Report.navigationOptions = ({navigation}) => ({
  title: `Boletim ${navigation.getParam('period').split('/')[0]}`,
});

Report.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
