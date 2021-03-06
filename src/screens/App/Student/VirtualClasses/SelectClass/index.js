import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {showMessage} from 'react-native-flash-message';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../../components/Text';
import Button from '../../../../../components/Button';

import {suap_api} from '../../../../../services/api';

import {getThemeColors} from '../../../../../constants/theme';

import {Container} from './styles';

function SelectClass({navigation}) {
  const [myClasses, setMyClasses] = useState([]);
  const user = useSelector(state => state.profile.user);

  const colors = getThemeColors();

  async function getClasses() {
    try {
      const responsePeriods = await suap_api.get(
        'minhas-informacoes/meus-periodos-letivos/',
      );

      let periods = [];

      if (user.curso_turno === 'Noturno') {
        periods = responsePeriods.data;
      } else {
        periods = responsePeriods.data.filter(
          period => period.periodo_letivo !== 2,
        );
      }

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
          colorShimmer={[
            colors.background2,
            colors.background2,
            colors.background,
          ]}
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
    <Container colors={colors}>
      <Text h1 black semibold>
        Turmas Virtuais
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

SelectClass.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

SelectClass.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default withTheme(SelectClass);
