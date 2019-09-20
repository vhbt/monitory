import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import EventsCard from '../../../../components/EventsCard';

import {api} from '../../../../services/api';

import {Container} from './styles';

function Home({navigation, theme}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getEvents() {
    const response = await api.get('/events');

    setEvents(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getEvents();
  }, []);

  function handleEvent(item) {
    if (item.type === 1) {
      navigation.navigate('VotingEvent', {item});
    }
  }

  return (
    <Container>
      <Text black h1 medium>
        Eventos
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        style={{marginTop: 20}}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={{marginBottom: 15}}>
            <EventsCard
              title={item.title}
              desc={item.desc}
              featured={item.featured}
              type={item.type}
              image={item.image}
              past={item.past}
              onPress={() => handleEvent(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={theme.primary}
              style={{marginTop: 30}}
            />
          ) : (
            <View>
              <Text gray>Não há nenhum evento no momento.</Text>
            </View>
          )
        }
      />
    </Container>
  );
}

Home.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  theme: PropTypes.shape({
    primary: PropTypes.string,
  }).isRequired,
};

export default withTheme(Home);
