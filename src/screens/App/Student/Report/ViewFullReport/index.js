import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import PropTypes from 'prop-types';

import Text from '../../../../../components/Text';

import colors from '../../../../../constants/theme';

import {Container} from './styles';

export default function ViewFullReport({navigation}) {
  const {
    formattedDisciplina,
    segundo_semestre,
    carga_horaria,
    carga_horaria_cumprida,
    percentual_carga_horaria_frequentada,
    quantidade_avaliacoes,
    nota_etapa_1,
    nota_etapa_2,
    nota_etapa_3,
    nota_etapa_4,
    media_final_disciplina,
  } = navigation.getParam('item');

  const labels_notas_semestre = segundo_semestre ? ['3', '4'] : ['1', '2'];

  const labels_notas =
    quantidade_avaliacoes === 2 ? labels_notas_semestre : ['1', '2', '3', '4'];

  const data_notas =
    quantidade_avaliacoes === 2
      ? [nota_etapa_1.nota || 0, nota_etapa_2.nota || 0]
      : [
          nota_etapa_1.nota || 0,
          nota_etapa_2.nota || 0,
          nota_etapa_3.nota || 0,
          nota_etapa_4.nota || 0,
        ];

  const labels_faltas_semestre = segundo_semestre ? ['3', '4'] : ['1', '2'];

  const labels_faltas =
    quantidade_avaliacoes === 2 ? labels_faltas_semestre : ['1', '2', '3', '4'];

  const data_faltas =
    quantidade_avaliacoes === 2
      ? [nota_etapa_1.faltas, nota_etapa_2.faltas]
      : [
          nota_etapa_1.faltas,
          nota_etapa_2.faltas,
          nota_etapa_3.faltas,
          nota_etapa_4.faltas,
        ];

  function calcFinal() {
    if (quantidade_avaliacoes === 2) {
      const notaFinal = (nota_etapa_1.nota * 2 + nota_etapa_2.nota * 3) / 5;

      if (nota_etapa_1.nota && nota_etapa_2.nota) {
        if (notaFinal > 62) return 'Aprovado';
        if (notaFinal >= 20) {
          const nM1 = 100 - (2 * nota_etapa_1) / 3;
          const nM2 = 150 - (3 * nota_etapa_2) / 2;

          const needed = Math.floor(Math.min(nM1, nM2));
          return `Prova Final precisando tirar ${needed}`;
        }
        return 'Reprovado';
      }
      return 'Cursando';
    }
    const notaFinal =
      (nota_etapa_1.nota * 2 +
        nota_etapa_2.nota * 2 +
        nota_etapa_3.nota * 3 +
        nota_etapa_4.nota * 3) /
      10;

    if (
      nota_etapa_1.nota &&
      nota_etapa_2.nota &&
      nota_etapa_3.nota &&
      nota_etapa_4.nota
    ) {
      if (notaFinal > 62) return 'Aprovado';
      if (notaFinal >= 20) {
        const nM1 =
          300 - nota_etapa_1 - (3 * nota_etapa_3) / 2 - (3 * nota_etapa_4) / 2;
        const nM2 =
          300 - nota_etapa_2 - (3 * nota_etapa_3) / 2 - (3 * nota_etapa_4) / 2;
        const nM3 =
          200 - nota_etapa_3 - (2 * nota_etapa_1) / 3 - (2 * nota_etapa_4) / 3;
        const nM4 =
          200 - nota_etapa_1 - (2 * nota_etapa_1) / 3 - (2 * nota_etapa_4) / 3;

        const needed = Math.floor(Math.min(nM1, nM2, nM3, nM4));
        return `Prova Final precisando tirar ${needed}`;
      }
      return 'Reprovado';
    }
    return 'Cursando';
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text h2 semibold black style={{textAlign: 'center'}}>
          {formattedDisciplina}
        </Text>
        <Text h4 medium black style={{textAlign: 'center', marginBottom: 15}}>
          {segundo_semestre ? '2°' : '1°'} semestre
        </Text>
        <View style={{width: '80%', textAlign: 'center'}}>
          <Text black>
            Carga horária: {carga_horaria_cumprida} / {carga_horaria}
          </Text>
          <Text black>Presença: {percentual_carga_horaria_frequentada}%</Text>
          <Text black>Média: {media_final_disciplina}</Text>
          <Text medium style={{marginTop: 15}}>
            Situação atual
          </Text>
          <Text>{calcFinal()}</Text>
          <Text />
        </View>
        <Text medium style={{marginTop: 15}}>
          Desempenho (Bimestre)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {segundo_semestre && quantidade_avaliacoes === 2 ? (
            <>
              <Text gray>3 BI: {nota_etapa_3.nota || 'X'}</Text>
              <Text gray>4 BI: {nota_etapa_4.nota || 'X'}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && quantidade_avaliacoes === 2 ? (
            <>
              <Text gray>1 BI: {nota_etapa_1.nota || 'X'}</Text>
              <Text gray>2 BI: {nota_etapa_2.nota || 'X'}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && quantidade_avaliacoes === 4 ? (
            <>
              <Text gray>1 BI: {nota_etapa_1.nota || 'X'}</Text>
              <Text gray>2 BI: {nota_etapa_2.nota || 'X'}</Text>
              <Text gray>3 BI: {nota_etapa_3.nota || 'X'}</Text>
              <Text gray>4 BI: {nota_etapa_4.nota || 'X'}</Text>
            </>
          ) : null}
        </View>
        <LineChart
          style={{marginTop: 5, borderRadius: 4}}
          data={{
            labels: labels_notas,
            datasets: [
              {
                data: data_notas,
              },
            ],
          }}
          width={Dimensions.get('window').width - 60}
          height={220}
          chartConfig={{
            backgroundColor: colors.black,
            backgroundGradientFrom: colors.black,
            backgroundGradientTo: colors.black,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
        <Text medium style={{marginTop: 15}}>
          Faltas (Bimestre)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {segundo_semestre && quantidade_avaliacoes === 2 ? (
            <>
              <Text gray>3 BI: {nota_etapa_3.faltas || 0}</Text>
              <Text gray>4 BI: {nota_etapa_4.faltas || 0}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && quantidade_avaliacoes === 2 ? (
            <>
              <Text gray>1 BI: {nota_etapa_1.faltas || 0}</Text>
              <Text gray>2 BI: {nota_etapa_2.faltas || 0}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && quantidade_avaliacoes === 4 ? (
            <>
              <Text gray>1 BI: {nota_etapa_1.faltas || 0}</Text>
              <Text gray>2 BI: {nota_etapa_2.faltas || 0}</Text>
              <Text gray>3 BI: {nota_etapa_3.faltas || 0}</Text>
              <Text gray>4 BI: {nota_etapa_4.faltas || 0}</Text>
            </>
          ) : null}
        </View>
        <BarChart
          style={{marginVertical: 5, borderRadius: 4}}
          data={{
            labels: labels_faltas,
            datasets: [
              {
                data: data_faltas,
              },
            ],
          }}
          bezier
          width={Dimensions.get('window').width - 60}
          height={220}
          chartConfig={{
            backgroundColor: colors.black,
            backgroundGradientFrom: colors.black,
            backgroundGradientTo: colors.black,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </ScrollView>
    </Container>
  );
}

ViewFullReport.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
