import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {withTheme} from 'styled-components';
import {parseISO, format} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Switch from '../../../../../../components/Switch';

import {api} from '../../../../../../services/api';

import {Container} from './styles';

function VotingEvent({theme, navigation}) {
  const event = navigation.getParam('item');
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState([]);
  const [total, setTotal] = useState(0);
  const [enabled, setEnabled] = useState(event.enabled);

  const formattedDate = format(parseISO(event.date), "d 'de' MMMM 'às' HH:mm", {
    locale: ptbr,
  });

  const formattedUntilDate = format(
    parseISO(event.until_date),
    "d 'de' MMMM 'às' HH:mm",
    {
      locale: ptbr,
    },
  );

  async function getVotes() {
    const response = await api.get(`/votes/${event.id}`);

    const colors = [
      '#2d95ec',
      '#f6ba2a',
      '#f64d2a',
      '#8abb21',
      '#e2711d',
      '#5c415d',
      '#498c8a',
    ];

    const data = response.data.map((resp, index) => ({
      ...resp,
      color: colors[index],
      legendFontColor: colors[index],
    }));

    const totalCount = data.reduce((prev, value) => prev + value.votes, 0);
    setTotal(totalCount);

    setVotes(data);
    setLoading(false);
  }

  useEffect(() => {
    getVotes();
  }, []);

  async function handleChangeEventEnabled(newEnabled) {
    try {
      const {id} = event;

      setEnabled(newEnabled);

      await api.put('/events', {
        id,
        enabled: newEnabled,
      });

      const newStatus = newEnabled ? 'habilitado' : 'desabilitado';

      showMessage({
        type: 'success',
        message: `Evento ${newStatus} com sucesso!`,
      });
    } catch (err) {
      setEnabled(event.enabled);
      showMessage({type: 'danger', message: err});
    }
  }

  const chartConfig = {
    backgroundGradientFrom: theme.black,
    backgroundGradientTo: theme.black,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3,
  };

  return (
    <Container>
      <Text gray medium style={{alignSelf: 'center', textAlign: 'center'}}>
        {event.desc}
      </Text>
      <View style={{marginTop: 15}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.primary}
            style={{marginTop: 10}}
          />
        ) : (
          <>
            <PieChart
              data={votes}
              width={Dimensions.get('window').width}
              height={150}
              chartConfig={chartConfig}
              accessor="votes"
              backgroundColor="transparent"
              style={{marginTop: 15}}
              absolute
            />
            <Text gray style={{marginLeft: 35}}>
              Total de Votos: {total}
            </Text>
            <View style={{marginTop: 30}}>
              <Text gray medium>
                Inicio do evento:
              </Text>
              <Text black>{formattedDate}</Text>
              <Text gray medium style={{marginTop: 10}}>
                Fim do evento:
              </Text>
              <Text black>{formattedUntilDate || 'não definido'}</Text>
              <View style={{marginTop: 20}}>
                <Switch
                  label="Evento habilitado"
                  value={enabled}
                  onValueChange={() => handleChangeEventEnabled(!enabled)}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </Container>
  );
}

VotingEvent.navigationOptions = ({screenProps, navigation}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
  title: navigation.getParam('item').title,
});

VotingEvent.propTypes = {
  theme: PropTypes.shape({
    primary: PropTypes.string,
    black: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default withTheme(VotingEvent);
