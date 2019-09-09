import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  FlatList,
  Image,
  Platform,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {format, parseISO} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Header from '../../../components/Header';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ImportantWarning from '../../../components/ImportantWarning';
import NewsCard from '../../../components/NewsCard';
import LoadingNews from '../../../components/NewsCard/loading';

import {api} from '../../../services/api';
import colors from '../../../constants/theme';

import {Container, QuickItems, Item} from './styles';

export default function Home({navigation}) {
  const [showNews, setShowNews] = useState(null);
  const [showHomeQuestionModal, setShowHomeQuestionModal] = useState(null);
  const [news, setNews] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);
  const [homeQuestion, setHomeQuestion] = useState();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.profile.user);
  const isAdmin = user.admin;

  async function getNews() {
    const response = await api.get('/news?limit=10');

    const newsData = response.data.map(newsDataRaw => ({
      ...newsDataRaw,
      formattedDate: format(
        parseISO(newsDataRaw.createdAt),
        "d 'de' MMMM 'às' HH:MM",
        {locale: ptbr},
      ),
    }));

    setNews(newsData);
    setRefreshing(false);
  }

  async function getQuestion() {
    const response = await api.get('/questions?limit=1');
    setHomeQuestion(response.data[0]);
  }

  useEffect(() => {
    getNews();
    getQuestion();
  }, []);

  function refreshNews() {
    setRefreshing(true);
    getNews();
  }

  async function handleDelete(id) {
    try {
      await api.delete('news', {
        data: {
          id,
        },
      });

      const newDataNews = news.filter(n => n.id !== id);

      showMessage({type: 'success', message: 'Notícia deletada com sucesso.'});
      setNews(newDataNews);
      setShowNews('');
    } catch (err) {
      showMessage({type: 'danger', message: err.response.data.detail});
      setShowNews('');
    }
  }

  function handleConfirmDelete(id) {
    Alert.alert(
      'Confirmacão',
      'Tem certeza que deseja deletar essa notícia?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => handleDelete(id)},
      ],
      {cancelable: false},
    );
  }

  const handleViewableChanged = useCallback(({changed}) => {
    setViewable(changed.map(({item}) => item.id));
  }, []);

  function renderNews() {
    return (
      <Modal animationType="slide" visible={Boolean(showNews)}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: showNews && showNews.banner}}
            style={{height: 200, width: '100%'}}
          />
          <View style={{flex: 1, margin: 15}}>
            <Text h2 black bold style={{textAlign: 'justify'}}>
              {showNews && showNews.title}
            </Text>
            <Text gray>Postado: {showNews && showNews.formattedDate}</Text>
            {isAdmin ? (
              <Button
                style={{height: 26, width: 110}}
                colors={[colors.accent, colors.accent]}
                onPress={() => handleConfirmDelete(showNews.id)}>
                <Text white>Deletar</Text>
              </Button>
            ) : null}
            <Text style={{marginTop: 10, textAlign: 'justify'}}>
              {showNews && showNews.content}
            </Text>
          </View>
        </KeyboardAwareScrollView>
        <Button
          gradient
          onPress={() => setShowNews('')}
          style={{
            height: 44,
            borderRadius: 0,
            alignSelf: 'stretch',
            marginHorizontal: Platform.OS === 'ios' ? 15 : 10,
          }}>
          <Text white>Fechar</Text>
        </Button>
      </Modal>
    );
  }

  async function handleSendQuestionAnswers() {
    setLoading(true);

    try {
      await api.post('/answers', {
        user_id: user.id,
        question_id: homeQuestion.id,
        content,
      });

      setShowHomeQuestionModal(false);
      showMessage({
        type: 'success',
        message: 'Sugestão enviada com sucesso. Obrigado!',
      });
    } catch (err) {
      showMessage({
        type: 'danger',
        message: err.response.data.detail,
      });
    } finally {
      setLoading(false);
    }
  }

  function renderHomeQuestion() {
    return (
      <Modal animationType="slide" visible={showHomeQuestionModal} transparent>
        <View
          style={{
            padding: 20,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: 240,
              borderColor: '#f3f2f3',
              borderWidth: 1,
              backgroundColor: '#fff',
              elevation: 2,
              padding: 10,
              borderRadius: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowHomeQuestionModal(false);
                setLoading(false);
              }}
              style={{
                padding: 5,
                height: 38,
                width: 38,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="ios-close" size={48} />
            </TouchableOpacity>
            <Input
              label={homeQuestion && homeQuestion.content}
              multiline
              onChangeText={setContent}
              value={content}
              style={{height: 70, textAlignVertical: 'top'}}
            />
            <Button
              loading={loading}
              style={{
                height: 44,
                alignSelf: 'stretch',
                width: '100%',
              }}
              onPress={() => handleSendQuestionAnswers()}>
              <Text white>Enviar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Container>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
          {user.curso_ano || user.curso_turno ? null : (
            <ImportantWarning
              content="Voce ainda não configurou seu perfil. Clique aqui."
              onPress={() => navigation.navigate('Profile')}
            />
          )}
        </View>
        <View style={{paddingHorizontal: 30}}>
          {!(user.curso_ano && user.curso_turno) ? null : (
            <QuickItems>
              <Item onPress={() => navigation.navigate('Schedules')}>
                <Icon name="md-time" size={30} color="#acacb8" />
              </Item>
              <Item onPress={() => navigation.navigate('SelectReport')}>
                <Icon name="md-list-box" size={30} color="#acacb8" />
              </Item>
              <Item onPress={() => navigation.navigate('SelectClass')}>
                <Icon name="md-school" size={30} color="#acacb8" />
              </Item>
            </QuickItems>
          )}
        </View>
        <View style={{paddingHorizontal: 0, paddingVertical: 10}}>
          <Text
            h3
            black
            medium
            style={{
              paddingBottom: 10,
              paddingHorizontal: 30,
            }}>
            Atualizações
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={news}
            onViewableItemsChanged={handleViewableChanged}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 10,
              minimumViewTime: 500,
            }}
            onRefresh={() => refreshNews()}
            refreshing={refreshing}
            ListEmptyComponent={
              news ? (
                <Text gray style={{fontSize: 12, paddingHorizontal: 30}}>
                  Ainda não há nada aqui.
                </Text>
              ) : (
                <LoadingNews />
              )
            }
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <NewsCard
                title={item.title}
                category={item.category}
                banner={item.banner}
                bannerThumb={item.banner_thumb}
                shouldLoad={viewable.includes(item.id)}
                onPress={() => setShowNews(item)}
              />
            )}
          />
        </View>
        <Text h3 black medium style={{marginLeft: 30, marginTop: 10}}>
          Dashboard
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}>
          <ShimmerPlaceHolder
            autoRun
            visible={Boolean(homeQuestion)}
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              paddingVertical: 10,
              marginLeft: 30,
              width: 300,
              height: 100,
            }}>
            <View>
              <View
                style={{
                  marginLeft: 30,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#f3f2f3',
                  borderBottomWidth: 0,
                  width: 300,
                }}>
                <Text
                  gray
                  medium
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    paddingVertical: 10,
                  }}>
                  Pergunta: {homeQuestion && homeQuestion.content}
                </Text>
              </View>
              <View style={{marginLeft: 30}}>
                <Button
                  marginless
                  style={{
                    width: '100%',
                    borderRadius: 0,
                    borderColor: '#f3f2f3',
                    height: 36,
                  }}
                  onPress={() => setShowHomeQuestionModal(true)}>
                  <Text white>Responder</Text>
                </Button>
              </View>
            </View>
          </ShimmerPlaceHolder>
        </ScrollView>
      </ScrollView>
      {renderNews()}
      {renderHomeQuestion()}
    </Container>
  );
}

function HomeIcon({tintColor}) {
  return <Icon name="ios-home" size={32} color={tintColor} />;
}

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: HomeIcon,
};

HomeIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
