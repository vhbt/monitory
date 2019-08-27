import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Button from '../../../../../../components/Button';

import {onesignal} from '../../../../../../services/api';

import colors from '../../../../../../constants/theme';
import {Container} from './styles';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [maxiumOffset, setMaxiumOffset] = useState(0);
  const [fetching, setFetching] = useState(false);

  const limit = 7;

  async function loadNotifications(offset = 0) {
    if (offset > maxiumOffset) return;

    setLoading(true);

    const response = await onesignal.get(
      `notifications?app_id=${
        Config.ONESIGNAL_APP_ID
      }&limit=${limit}&offset=${offset * limit}`,
    );

    setMaxiumOffset(response.data.total_count / limit);

    const data = response.data.notifications.map(notification => ({
      ...notification,
      shortContent:
        notification.contents.en.length > 30
          ? `${notification.contents.en.substr(0, 30)}...`
          : notification.contents.en,
    }));

    setNotifications(offset === 0 ? data : [...notifications, ...data]);
    setLoading(false);
    setFetching(false);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  function loadMore() {
    if (!fetching) {
      const newOffset = currentOffset + 1;

      loadNotifications(newOffset);
      setCurrentOffset(newOffset);
      setFetching(true);
    }
  }

  return (
    <Container>
      <View style={{marginHorizontal: 30}}>
        <Text h1 black medium>
          Notificações
        </Text>
        <Text gray medium>
          Ultimas notificações enviadas
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notifications}
          style={{height: '75%'}}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 4,
                padding: 10,
                marginVertical: 10,
              }}>
              <Text medium>{item.headings.en}</Text>
              <Text>{item.shortContent}</Text>
              {item.included_segments.map(segment => (
                <Text key={segment} gray style={{marginTop: 5}}>
                  {segment}
                </Text>
              ))}
            </View>
          )}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{marginTop: 30}}
              />
            ) : (
              <Text black style={{marginTop: 30}}>
                Aguardando a primeira notificação.
              </Text>
            )
          }
          ListFooterComponent={
            <View style={{paddingTop: 5}}>
              {loading && notifications.length > 0 ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                  style={{paddingBottom: 5}}
                />
              ) : null}
            </View>
          }
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
        />
        <Button
          gradient
          style={{height: 44, lignSelf: 'stretch', marginTop: 15}}
          onPress={() => navigation.navigate('SendToClasses')}>
          <Text white>Nova Notificação</Text>
        </Button>
      </View>
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
