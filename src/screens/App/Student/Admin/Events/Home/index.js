import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {withTheme} from 'styled-components';
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import EventsCard from '../../../../../../components/EventsCard';

import {api} from '../../../../../../services/api';

import {Container} from './styles';

function Home({theme, navigation}) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  async function getEvents() {
    try {
      const response = await api.get('/events?past=1');

      setEvents(response.data);
    } catch (err) {
      showMessage({type: 'danger', message: err.response.data.detail});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  function handleViewEvent(item) {
    if (item.type === 1) {
      navigation.navigate('AdminVotingEvent', {item});
    }
  }

  return (
    <Container>
      <Text h1 black medium>
        Gerenciar Eventos
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        style={{marginTop: 25}}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={{marginBottom: 20}}>
            <EventsCard
              title={item.title}
              desc={item.desc}
              featured={item.featured}
              type={item.type}
              image={item.image}
              past={item.past}
              admin
              onPress={() => handleViewEvent(item)}
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
  theme: PropTypes.shape({
    primary: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withTheme(Home);
