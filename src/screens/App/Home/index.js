import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, Modal, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import ImportantWarning from '../../../components/ImportantWarning';
import NewsCard from '../../../components/NewsCard';

import {api} from '../../../services/api';

import {Container} from './styles';

export default function Home({navigation}) {
  const [showNews, setShowNews] = useState(null);
  const [news, setNews] = useState([]);

  const user = useSelector(state => state.profile.user);

  useEffect(() => {
    async function getNews() {
      const newsArray = await api.get('/news');

      setNews(newsArray.data);
    }

    getNews();
  }, []);

  function renderNews() {
    return (
      <Modal animationType="slide" visible={Boolean(showNews)}>
        <Image
          source={{uri: showNews && showNews.banner}}
          style={{height: 200, width: '100%'}}
        />
        <View style={{margin: 10, flex: 1}}>
          <Text h1 black bold>
            {showNews && showNews.title}
          </Text>
          <Text>{showNews && showNews.content}</Text>
        </View>
        <Button
          gradient
          onPress={() => setShowNews('')}
          style={{
            height: 44,
            alignSelf: 'stretch',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 15,
          }}>
          <Text white>Fechar</Text>
        </Button>
      </Modal>
    );
  }

  return (
    <Container>
      <Header />
      <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
        {user.email && user.curso_ano ? null : (
          <ImportantWarning
            content="Voce ainda não configurou seu perfil. Clique aqui."
            onPress={() => navigation.navigate('Profile')}
          />
        )}
      </View>
      <View style={{paddingHorizontal: 0, paddingVertical: 10}}>
        <Text
          h3
          style={{
            paddingBottom: 10,
            paddingHorizontal: 30,
            fontFamily: 'SFProText-Medium',
          }}>
          Noticias
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={news}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <NewsCard
              title={item.title}
              desc={item.description}
              tags={item.tags}
              banner={item.banner}
              onPress={() => setShowNews(item)}
            />
          )}
        />
      </View>
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
