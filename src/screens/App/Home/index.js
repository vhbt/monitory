import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, FlatList, Image, Alert, Modal, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {format, parseISO} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ImportantWarning from '../../../components/ImportantWarning';
import NewsCard from '../../../components/NewsCard';
import LoadingNews from '../../../components/NewsCard/loading';
import Switch from '../../../components/Switch';

import {api} from '../../../services/api';
import {toggleDarkMode} from '../../../store/modules/app/actions';

import {
  Container,
  QuickItems,
  Item,
  QuestionContainer,
  CloseModalButton,
  QuestionModalContainer,
  QuestionModalBackdrop,
} from './styles';

function Home({navigation, theme}) {
  const dispatch = useDispatch();
  const [showNews, setShowNews] = useState(null);
  const [showHomeQuestionModal, setShowHomeQuestionModal] = useState(null);
  const [news, setNews] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);
  const [homeQuestion, setHomeQuestion] = useState();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.profile.user);
  const app = useSelector(state => state.app);
  const isAdmin = user.admin;

  const [darkMode, setDarkMode] = useState(app.darkMode || false);

  async function getNews() {
    const response = await api.get('/news?limit=8&page=1');

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
    const response = await api.get('/questions?limit=1&new=1');
    setHomeQuestion(response.data.questions[0]);
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
      <Modal
        animationType="slide"
        visible={Boolean(showNews)}
        style={{backgroundColor: theme.background}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: theme.background}}>
          <Image
            source={{uri: showNews && showNews.banner}}
            style={{height: 200, width: '100%'}}
          />
          <View style={{alignItems: 'flex-end'}}>
            <CloseModalButton onPress={() => setShowNews('')}>
              <Icon name="ios-close" size={48} color={theme.black} />
            </CloseModalButton>
          </View>
          <View style={{flex: 1, marginHorizontal: 15, marginTop: 5}}>
            <Text h2 black bold style={{textAlign: 'justify'}}>
              {showNews && showNews.title}
            </Text>
            <Text gray>Postado: {showNews && showNews.formattedDate}</Text>
            {isAdmin ? (
              <Button
                style={{height: 26, width: 110}}
                colors={[theme.accent, theme.accent]}
                onPress={() => handleConfirmDelete(showNews.id)}>
                <Text white>Deletar</Text>
              </Button>
            ) : null}
            <Text black style={{marginTop: 10, textAlign: 'justify'}}>
              {showNews && showNews.content}
            </Text>
          </View>
        </KeyboardAwareScrollView>
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

  function handleCloseHomeQuestionModal() {
    setShowHomeQuestionModal(false);
    setLoading(false);
  }

  function renderHomeQuestion() {
    return (
      <Modal animationType="slide" visible={showHomeQuestionModal} transparent>
        <QuestionModalBackdrop>
          <QuestionModalContainer>
            <CloseModalButton onPress={handleCloseHomeQuestionModal}>
              <Icon name="ios-close" size={48} color={theme.black} />
            </CloseModalButton>
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
          </QuestionModalContainer>
        </QuestionModalBackdrop>
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
                <Icon name="md-time" size={30} color={theme.icon} />
              </Item>
              <Item onPress={() => navigation.navigate('SelectReport')}>
                <Icon name="md-list-box" size={30} color={theme.icon} />
              </Item>
              <Item onPress={() => navigation.navigate('SelectClass')}>
                <Icon name="md-school" size={30} color={theme.icon} />
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
            colorShimmer={[
              theme.background2,
              theme.background2,
              theme.background,
            ]}
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              paddingVertical: 10,
              marginLeft: 30,
              width: 300,
              height: 100,
            }}>
            <View>
              <QuestionContainer>
                <Text
                  gray
                  medium
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    paddingVertical: 10,
                    maxWidth: 270,
                  }}>
                  Pergunta: {homeQuestion && homeQuestion.content}
                </Text>
              </QuestionContainer>
              <View style={{flex: 1, marginLeft: 30}}>
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

Home.navigationOptions = ({screenProps}) => ({
  tabBarLabel: 'Home',
  tabBarIcon: HomeIcon,
  tabBarOptions: {
    style: {
      backgroundColor: screenProps.theme.darkMode
        ? screenProps.theme.background2
        : screenProps.theme.white,
      height: 58,
    },
    activeTintColor: screenProps.theme.primary,
  },
});

HomeIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  theme: PropTypes.shape({
    background: PropTypes.string,
    background2: PropTypes.string,
    black: PropTypes.string,
    accent: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

export default withTheme(Home);
