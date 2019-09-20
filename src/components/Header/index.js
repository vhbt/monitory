import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  Alert,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import CodePush from 'react-native-code-push';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import DeviceInfo from 'react-native-device-info';

import Text from '../Text';

import {getThemeColors} from '../../constants/theme';

import {Container, TopContainer, Avatar} from './styles';

export default function Header() {
  const user = useSelector(state => state.profile.user);
  const [loading, setLoading] = useState(true);
  const [infoClicks, setInfoClicks] = useState(0);

  const colors = getThemeColors();

  function handleShowInfo() {
    if (infoClicks === 6) {
      CodePush.getUpdateMetadata()
        .then(metadata => {
          Alert.alert(
            'Psiu!',
            `label: ${metadata.label}, version: ${metadata.appVersion}`,
          );
        })
        .catch(() =>
          Alert.alert('Psiu!', `label: X, version: ${DeviceInfo.getVersion()}`),
        );
      setInfoClicks(0);
      return;
    }
    setInfoClicks(infoClicks + 1);
  }

  return (
    <SafeAreaView forceInset={{top: 'always', bottom: 'never'}}>
      <Container>
        <TopContainer>
          <ShimmerPlaceholder
            autoRun
            colorShimmer={[
              colors.background2,
              colors.background2,
              colors.background,
            ]}
            visible={!loading}
            style={{height: 25, width: 220}}>
            <View style={{flexDirection: 'row'}}>
              <Text h2 black medium>
                Olá,{' '}
              </Text>
              <Text h2 black semibold>
                {user && user.nome_usual.split(' ')[0]}!
              </Text>
            </View>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            autoRun
            hasBorder
            visible={!loading}
            style={{height: 40, width: 40, borderRadius: 20}}>
            <TouchableWithoutFeedback onPress={handleShowInfo}>
              <Avatar
                onLoadEnd={() => setLoading(false)}
                source={{
                  uri: user && `https://suap.ifrn.edu.br/${user.avatar_suap}`,
                }}
              />
            </TouchableWithoutFeedback>
          </ShimmerPlaceholder>
        </TopContainer>
      </Container>
    </SafeAreaView>
  );
}
