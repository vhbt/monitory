import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  FlatList,
  ActivityIndicator,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import Text from '../../../../../components/Text';
import Button from '../../../../../components/Button';

import colors from '../../../../../constants/theme';

import {Container} from './styles';

export default function SelectSchedules() {
  const user = useSelector(state => state.profile.user);
  const [showImage, setShowImage] = useState(null);

  const classes = [
    {
      name: 'Informática',
      year: 1,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/info1m.png`,
    },
    {
      name: 'Informática',
      year: 2,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/info2m.png`,
    },
    {
      name: 'Informática',
      year: 3,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/info3m.png`,
    },
    {
      name: 'Informática',
      year: 4,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/info4m.png`,
    },
    {
      name: 'Mecatrônica',
      year: 1,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/meca1m.png`,
    },
    {
      name: 'Mecatrônica',
      year: 2,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/meca2m.png`,
    },
    {
      name: 'Mecatrônica',
      year: 3,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/meca3m.png`,
    },
    {
      name: 'Mecatrônica',
      year: 4,
      turn: 'Matutino',
      path: `${Config.API_URL}/files/horarios/meca4m.png`,
    },
  ];

  const myClasses = classes.filter(mc => {
    if (user.curso_ano && user.curso_turno) {
      return (
        user.curso.includes(mc.name) &&
        Number(user.curso_ano) === mc.year &&
        user.curso_turno === mc.turn
      );
    }
    return mc;
  });

  useEffect(() => {
    if (myClasses.length === 1) {
      setShowImage(myClasses[0].path);
    }
  }, []);

  function renderImage() {
    return (
      <Modal animationType="slide" visible={Boolean(showImage)}>
        <ImageViewer
          imageUrls={[{url: showImage}]}
          enableSwipeDown
          onCancel={() => setShowImage(false)}
          renderIndicator={() => {}}
          renderHeader={props => (
            <TouchableOpacity
              onPress={() => setShowImage(null)}
              style={{
                padding: 20,
              }}>
              <Icon name="ios-close" size={42} color="#fff" />
            </TouchableOpacity>
          )}
          renderImage={props => (
            <Image {...props} style={{width: '100%', aspectRatio: 1.47}} />
          )}
        />
      </Modal>
    );
  }

  return (
    <Container>
      <Text h1>De qual turma e turno?</Text>
      <FlatList
        data={myClasses}
        keyExtractor={item => item.name + item.year + item.turn}
        style={{marginTop: 30}}
        ListEmptyComponent={
          <ActivityIndicator size="large" color={colors.primary} />
        }
        renderItem={({item}) => (
          <Button
            style={{height: 44, alignSelf: 'stretch'}}
            onPress={() => setShowImage(item.path)}>
            <Text white>
              {item.name} {item.year} - {item.turn}
            </Text>
          </Button>
        )}
      />
      {renderImage()}
    </Container>
  );
}
