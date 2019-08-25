import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';

import GradesCard from '../../../../../components/GradesCard';

import {suap_api} from '../../../../../services/api';
import colors from '../../../../../constants/theme';

import {Container} from './styles';

export default function Report({navigation}) {
  const period = navigation.getParam('period');

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
          navigation.navigate('SelectReport');
          showMessage({
            type: 'warning',
            message: 'Não encontrado',
            description: 'Ainda não há registros para o período selecionado.',
          });
        } else {
          navigation.navigate('SelectReport');
          showMessage({type: 'danger', message: err.response.data.detail});
        }
      }
    }

    getGrades();
  }, []);

  return (
    <Container>
      <FlatList
        data={grades}
        keyExtractor={item => item.codigo_diario}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{marginTop: 30}}
          />
        }
        renderItem={({item}) => (
          <GradesCard
            key={item.codigo_diario}
            title={item.formattedDisciplina}
            colors={[colors.black, colors.black]}
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
            style={{marginBottom: 10, height: 120, borderRadius: 4}}
          />
        )}
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
