import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {format, parseISO, differenceInSeconds, isBefore} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import CountDown from 'react-native-countdown-component';
import {withTheme} from 'styled-components';
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import CandidatureCard from '../../../../components/CandidatureCard';

import {api} from '../../../../services/api';

import {Container} from './styles';

function VotingEvent({navigation, theme}) {
  const [loading, setLoading] = useState(true);
  const [voteLoading, setVoteLoading] = useState(false);
  const [candidatures, setCandidatures] = useState([]);
  const {id, enabled, date, until_date, past} = navigation.getParam('item');

  const user = useSelector(state => state.profile.user);

  const formattedDate = format(parseISO(date), "d 'de' MMMM 'às' HH:mm", {
    locale: ptbr,
  });

  const formattedUntilDate =
    until_date &&
    format(parseISO(until_date), "d 'de' MMMM 'às' HH:mm", {
      locale: ptbr,
    });

  const timeLeftInSeconds = differenceInSeconds(parseISO(date), new Date());
  const eventDidntStart = isBefore(new Date(), parseISO(date));

  async function getCandidatures() {
    const response = await api.get(`/events/${id}`);

    setCandidatures(response.data.candidatures);
    setLoading(false);
  }

  useEffect(() => {
    getCandidatures();
  }, []);

  async function handleVote(candidature_id) {
    setVoteLoading(true);

    try {
      await api.post('/votes', {
        user_id: user.id,
        event_id: id,
        candidature_id,
      });
      showMessage({
        type: 'success',
        message: 'Voto computado com sucesso. Obrigado!',
      });
    } catch (err) {
      showMessage({
        type: 'danger',
        message: err.response.data.detail,
      });
    } finally {
      setVoteLoading(false);
    }
  }

  function handleVoteConfirm(candidature_id) {
    Alert.alert(
      'Confirmacão',
      'Tem certeza que deseja votar nesse candidato?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => handleVote(candidature_id)},
      ],
      {cancelable: false},
    );
  }

  function renderDidntStartEvent() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          h3
          black
          medium
          style={{alignSelf: 'center', textAlign: 'center'}}>
          A votação ainda não começou.
        </Text>
        <View style={{marginTop: 30}}>
          <Text h3 gray style={{alignSelf: 'center', marginBottom: 10}}>
            Tempo restante para a votação
          </Text>
          <Text gray style={{alignSelf: 'center', marginBottom: 15}}>
            {formattedDate}
          </Text>
          <CountDown
            until={timeLeftInSeconds}
            size={28}
            digitStyle={{backgroundColor: theme.card}}
            digitTxtStyle={{color: theme.primary}}
            timeLabelStyle={{color: theme.primary}}
            timeLabels={{d: 'Dias', h: 'Horas', m: 'Min', s: 'Seg'}}
          />
        </View>
      </View>
    );
  }

  function renderAlreadyPassedEvent() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text h3 gray medium style={{alignSelf: 'center', textAlign: 'center'}}>
          Essa votação já acabou.
        </Text>
      </View>
    );
  }

  function renderDisabled() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text h3 gray medium style={{alignSelf: 'center', textAlign: 'center'}}>
          Essa votação está desativada no momento.
          {'\n\n'}
          Entre em contato conosco para mais informações.
        </Text>
      </View>
    );
  }

  function renderEvent() {
    return (
      <>
        {!loading && until_date > 0 ? (
          <Text gray h3 style={{alignSelf: 'center', textAlign: 'center'}}>
            As votações se encerram em:
            {'\n'}
            {formattedUntilDate}
          </Text>
        ) : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={candidatures}
          renderItem={({item}) => (
            <View style={{marginTop: 15}}>
              <CandidatureCard
                id={item.id}
                text={item.text}
                user={item.user}
                buttonText="Votar"
                onButtonPress={() => handleVoteConfirm(item.id)}
                loading={voteLoading}
              />
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              {loading ? (
                <ActivityIndicator size="large" color={theme.primary} />
              ) : (
                <Text
                  h3
                  gray
                  medium
                  style={{alignSelf: 'center', textAlign: 'center'}}>
                  Nenhum candidato cadastrado.
                </Text>
              )}
            </View>
          }
        />
      </>
    );
  }

  function eventHandler() {
    if (past) {
      return renderAlreadyPassedEvent();
    }
    if (!enabled) {
      return renderDisabled();
    }
    if (eventDidntStart) {
      return renderDidntStartEvent();
    }
    return renderEvent();
  }

  return <Container>{eventHandler()}</Container>;
}

VotingEvent.navigationOptions = ({navigation, screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
  title: navigation.getParam('item').title,
});

VotingEvent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    card: PropTypes.string,
  }).isRequired,
};

export default withTheme(VotingEvent);
