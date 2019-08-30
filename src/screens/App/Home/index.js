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
} from 'react-native';
import {format, parseISO} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import ImportantWarning from '../../../components/ImportantWarning';
import NewsCard from '../../../components/NewsCard';
import LoadingNews from '../../../components/NewsCard/loading';

import {api} from '../../../services/api';
import colors from '../../../constants/theme';

import {Container, QuickItems, Item} from './styles';

export default function Home({navigation}) {
  const [showNews, setShowNews] = useState(null);
  const [news, setNews] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  const user = useSelector(state => state.profile.user);
  const isAdmin = user.admin;

  async function getNews() {
    const response = await api.get('/news');

    const newsData = response.data.map(newsDataRaw => ({
      ...newsDataRaw,
      formattedDate: format(
        parseISO(newsDataRaw.createdAt),
        "d 'de' MMMM 'às' HH:MM",
        {
          locale: ptbr,
        },
      ),
    }));

    setNews(newsData);
  }

  useEffect(() => {
    getNews();
  }, []);

  function refreshNews() {
    setRefreshing(true);

    getNews();

    setRefreshing(false);
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
            alignSelf: 'stretch',
            marginLeft: Platform.OS === 'ios' ? 15 : 10,
            marginRight: Platform.OS === 'ios' ? 15 : 10,
            marginBottom: Platform.OS === 'ios' ? 20 : 5,
          }}>
          <Text white>Fechar</Text>
        </Button>
      </Modal>
    );
  }

  return (
    <Container>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
          {user.curso_ano && user.curso_turno ? null : (
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
                <Icon name="md-time" size={24} color="#acacb8" />
              </Item>
              <Item onPress={() => navigation.navigate('SelectReport')}>
                <Icon name="md-bookmarks" size={24} color="#acacb8" />
              </Item>
              <Item onPress={() => navigation.navigate('SelectClass')}>
                <Icon name="md-school" size={24} color="#acacb8" />
              </Item>
            </QuickItems>
          )}
        </View>
        <View style={{paddingHorizontal: 0, paddingVertical: 10}}>
          <Text
            h3
            black
            style={{
              paddingBottom: 10,
              paddingHorizontal: 30,
              fontFamily: 'SFProText-Medium',
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
      </ScrollView>
      {renderNews()}
    </Container>
  );
}

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-home" size={32} color={tintColor} />
  ),
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
