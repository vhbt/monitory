import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {format} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Button from '../../../../../../components/Button';

import {onesignal} from '../../../../../../services/api';

import {getThemeColors} from '../../../../../../constants/theme';
import {Container, NotificationCard} from './styles';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [maxiumOffset, setMaxiumOffset] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [showNotificationDetails, setShowNotificationDetails] = useState(null);

  const colors = getThemeColors();

  const limit = 15;

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

  function renderNotificationDetailsModal() {
    return showNotificationDetails ? (
      <Modal
        animationType="slide"
        visible={!!showNotificationDetails}
        style={{padding: 20}}>
        <SafeAreaView
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
          }}>
          <TouchableOpacity
            onPress={() => setShowNotificationDetails('')}
            style={{
              padding: 5,
              margin: 5,
              height: Platform.OS === 'ios' ? 48 : 38,
              width: Platform.OS === 'ios' ? 48 : 38,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="ios-close" size={48} color={colors.black} />
          </TouchableOpacity>
          <Text h2 black medium>
            {showNotificationDetails.headings.en}
          </Text>
          <Text black>{showNotificationDetails.contents.en}</Text>
          <Text gray style={{marginTop: 5}}>
            Enviado para {showNotificationDetails.successful}{' '}
            {showNotificationDetails.successful > 1
              ? 'dispositivos'
              : 'dispositivo'}
            .
          </Text>
          <Text gray style={{marginBottom: 5}}>
            Enviado em{' '}
            {format(
              new Date(showNotificationDetails.send_after * 1000),
              "d 'de' MMMM 'às' HH:MM",
              {locale: ptbr},
            )}
          </Text>
        </SafeAreaView>
      </Modal>
    ) : null;
  }

  function renderNotificationShimmerRows(numberOfrows) {
    const shimmerRows = [];
    for (let i = 0; i < numberOfrows; i += 1) {
      shimmerRows.push(
        <ShimmerPlaceholder
          key={i}
          autoRun
          hasBorder
          colorShimmer={[
            colors.background2,
            colors.background2,
            colors.background,
          ]}
          style={{
            width: '100%',
            height: 75,
            borderRadius: 4,
            marginVertical: 5,
          }}
        />,
      );
    }

    return <>{shimmerRows}</>;
  }

  return (
    <Container colors={colors}>
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
            <NotificationCard
              colors={colors}
              onPress={() => setShowNotificationDetails(item)}>
              <Text black medium>
                {item.headings.en || 'Sem título'}
              </Text>
              <Text black>{item.shortContent}</Text>
              {item.included_segments.map(segment => (
                <Text gray key={segment} style={{marginTop: 5}}>
                  {segment}
                </Text>
              ))}
            </NotificationCard>
          )}
          ListEmptyComponent={
            loading ? (
              renderNotificationShimmerRows(7)
            ) : (
              <Text gray style={{marginTop: 30}}>
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
          onPress={() => navigation.navigate('SendNotification')}>
          <Text white>Nova Notificação</Text>
        </Button>
      </View>
      {renderNotificationDetailsModal()}
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
