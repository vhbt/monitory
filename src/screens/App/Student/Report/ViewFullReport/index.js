import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../../components/Text';

import {getThemeColors} from '../../../../../constants/theme';

import {Container} from './styles';

function ViewFullReport({navigation}) {
  const {
    formattedDisciplina,
    segundo_semestre,
    carga_horaria,
    carga_horaria_cumprida,
    percentual_carga_horaria_frequentada,
    quantidade_avaliacoes: qnt_avaliacoes,
    nota_etapa_1: bi1,
    nota_etapa_2: bi2,
    nota_etapa_3: bi3,
    nota_etapa_4: bi4,
    media_final_disciplina,
    nota_avaliacao_final,
  } = navigation.getParam('item');

  console.tron.log(navigation.getParam('item'));

  const colors = getThemeColors();

  const labels_notas_semestre = segundo_semestre ? ['3', '4'] : ['1', '2'];

  const labels_notas =
    qnt_avaliacoes === 2 ? labels_notas_semestre : ['1', '2', '3', '4'];

  const data_notas =
    qnt_avaliacoes === 2
      ? [bi1.nota || 0, bi2.nota || 0]
      : [bi1.nota || 0, bi2.nota || 0, bi3.nota || 0, bi4.nota || 0];

  const labels_faltas_semestre = segundo_semestre ? ['3', '4'] : ['1', '2'];

  const labels_faltas =
    qnt_avaliacoes === 2 ? labels_faltas_semestre : ['1', '2', '3', '4'];

  const data_faltas =
    qnt_avaliacoes === 2
      ? [bi1.faltas, bi2.faltas]
      : [bi1.faltas, bi2.faltas, bi3.faltas, bi4.faltas];

  function calcFinal() {
    if (qnt_avaliacoes === 2) {
      const notaFinal = (bi1.nota * 2 + bi2.nota * 3) / 5;

      if (bi1.nota !== null && bi2.nota !== null) {
        if (notaFinal >= 60) return 'Aprovado';

        if (notaFinal >= 20) {
          const nM1 = 100 - (2 * bi1) / 3;
          const nM2 = 150 - (3 * bi2) / 2;

          const needed = Math.floor(Math.min(nM1, nM2));
          if (nota_avaliacao_final) {
            if (nota_avaliacao_final >= needed) {
              return `Aprovado na final`;
            }
            return 'Reprovado';
          }
          return `Prova Final precisando tirar ${needed}`;
        }

        return 'Reprovado';
      }
      if (bi1.nota !== null) {
        const needed = Math.ceil(300 - (2 * bi1) / 3);

        return `Aprovado caso tire ${needed} no 2 BI`;
      }
    }

    const notaFinal =
      (bi1.nota * 2 + bi2.nota * 2 + bi3.nota * 3 + bi4.nota * 3) / 10;

    if (notaFinal > 60) {
      return 'Aprovado';
    }

    if (
      bi1.nota !== null &&
      bi2.nota !== null &&
      bi3.nota !== null &&
      bi4.nota !== null
    ) {
      if (notaFinal > 150) return 'Aprovado';
      if (notaFinal >= 20) {
        const nM1 = 300 - bi1.nota - (3 * bi3) / 2 - (3 * bi4) / 2;
        const nM2 = 300 - bi1.nota - (3 * bi3) / 2 - (3 * bi4) / 2;
        const nM3 = 200 - bi4.nota - (2 * bi1) / 3 - (2 * bi2) / 3;
        const nM4 = 200 - bi3.nota - (2 * bi1) / 3 - (2 * bi2) / 3;

        const needed = Math.ceil(Math.min(nM1, nM2, nM3, nM4));
        if (nota_avaliacao_final.nota) {
          if (nota_avaliacao_final.nota >= needed) {
            return 'Aprovado na final';
          }
          return 'Reprovado';
        }
        return `Prova Final precisando tirar ${needed}`;
      }
      return 'Reprovado';
    }
    if (
      bi1.nota !== null &&
      bi2.nota !== null &&
      bi3.nota === null &&
      bi4.nota === null
    ) {
      const needed = Math.ceil((600 - (bi1.nota * 2 + bi2.nota * 2)) / 3);

      if (needed <= 100) {
        return `Aprovado caso tire ${needed} no 3 BI`;
      }

      return `Aprovado caso tire uma soma de 104 no 3 BI e 4 BI`;
    }
    if (
      bi1.nota !== null &&
      bi2.nota !== null &&
      bi3.nota !== null &&
      bi4.nota === null
    ) {
      const needed = Math.ceil(
        (600 - (bi1.nota * 2 + bi2.nota * 2 + bi3.nota * 3)) / 3,
      );

      return `Aprovado caso tire ${needed} no 4 BI`;
    }

    return 'Cursando';
  }

  return (
    <Container colors={colors}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text h2 semibold black style={{textAlign: 'center'}}>
          {formattedDisciplina}
        </Text>
        <Text h4 medium black style={{textAlign: 'center', marginBottom: 15}}>
          {segundo_semestre ? '2°' : '1°'} semestre
        </Text>
        <View style={{width: '80%', textAlign: 'center'}}>
          <Text black>
            Carga horária: {carga_horaria_cumprida}h / {carga_horaria}h
          </Text>
          <Text black>
            Presença: {Math.floor(percentual_carga_horaria_frequentada)}%
          </Text>
          <Text black>Média Final: {media_final_disciplina || 0}</Text>
          <Text black semibold style={{marginTop: 15}}>
            Situação atual
          </Text>
          <Text black style={{flexWrap: 'wrap'}}>
            {calcFinal()}
          </Text>
          <Text />
        </View>
        <Text black semibold style={{marginTop: 15}}>
          Desempenho (Bimestre)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {segundo_semestre && qnt_avaliacoes === 2 ? (
            <>
              <Text gray>3 BI: {bi3.nota !== null ? bi3.nota : 'X'}</Text>
              <Text gray>4 BI: {bi4.nota !== null ? bi4.nota : 'X'}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && qnt_avaliacoes === 2 ? (
            <>
              <Text gray>1 BI: {bi1.nota !== null ? bi1.nota : 'X'}</Text>
              <Text gray>2 BI: {bi2.nota !== null ? bi2.nota : 'X'}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && qnt_avaliacoes === 4 ? (
            <>
              <Text gray>1 BI: {bi1.nota !== null ? bi1.nota : 'X'}</Text>
              <Text gray>2 BI: {bi2.nota !== null ? bi2.nota : 'X'}</Text>
              <Text gray>3 BI: {bi3.nota !== null ? bi3.nota : 'X'}</Text>
              <Text gray>4 BI: {bi4.nota !== null ? bi4.nota : 'X'}</Text>
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
            backgroundColor: '#323643',
            backgroundGradientFrom: '#323643',
            backgroundGradientTo: '#323643',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
        <Text black semibold style={{marginTop: 15}}>
          Faltas (Bimestre)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {segundo_semestre && qnt_avaliacoes === 2 ? (
            <>
              <Text gray>3 BI: {bi3.faltas || 0}</Text>
              <Text gray>4 BI: {bi4.faltas || 0}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && qnt_avaliacoes === 2 ? (
            <>
              <Text gray>1 BI: {bi1.faltas || 0}</Text>
              <Text gray>2 BI: {bi2.faltas || 0}</Text>
              <Text />
              <Text />
            </>
          ) : null}
          {!segundo_semestre && qnt_avaliacoes === 4 ? (
            <>
              <Text gray>1 BI: {bi1.faltas || 0}</Text>
              <Text gray>2 BI: {bi2.faltas || 0}</Text>
              <Text gray>3 BI: {bi3.faltas || 0}</Text>
              <Text gray>4 BI: {bi4.faltas || 0}</Text>
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
            backgroundColor: '#323643',
            backgroundGradientFrom: '#323643',
            backgroundGradientTo: '#323643',
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

ViewFullReport.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

ViewFullReport.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default withTheme(ViewFullReport);
