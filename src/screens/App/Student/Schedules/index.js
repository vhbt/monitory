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
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import colors from '../../../../constants/theme';

import {api} from '../../../../services/api';

import {Container} from './styles';

export default function SelectSchedules({navigation}) {
  const user = useSelector(state => state.profile.user);
  const [showImage, setShowImage] = useState(null);
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getClasses() {
    const classesResponse = await api.get('/schedules');
    const classes = classesResponse.data;

    const filteredClasses = classes.filter(mc => {
      if (user.curso_ano && user.curso_turno) {
        return (
          user.curso === mc.course.description &&
          Number(user.curso_ano) === Number(mc.year) &&
          user.curso_turno === mc.turn
        );
      }
      return mc;
    });

    if (filteredClasses.length === 1) {
      setShowImage(`${Config.STATIC_FILES_URL}/${filteredClasses[0].name}.png`);
    } else if (!user.curso_ano || !user.curso_turno) {
      showMessage({
        type: 'info',
        duration: 6000,
        message:
          'Configure o seu curso e ano na aba Perfil para abrir o horário de sua turma automaticamente.',
      });
    }

    setMyClasses(filteredClasses);
    setLoading(false);
  }

  useEffect(() => {
    getClasses();
  }, []);

  function renderImage() {
    return (
      <Modal animationType="slide" visible={Boolean(showImage)}>
        <ImageViewer
          imageUrls={[{url: showImage}]}
          enableSwipeDown
          onCancel={() => {
            setShowImage(false);
            navigation.navigate('StudentHome');
          }}
          renderIndicator={() => {}}
          loadingRender={() => <ActivityIndicator size="large" color="#fff" />}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => {
                setShowImage(false);
                navigation.navigate('StudentHome');
              }}
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
        showsVerticalScrollIndicator={false}
        data={myClasses}
        keyExtractor={item => `${item.name}${item.year}${item.turn}`}
        style={{marginTop: 30}}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{marginTop: 30}}
            />
          ) : (
            <Text gray style={{textAlign: 'center'}}>
              Nenhum horário encontrado para sua turma... Tem certeza que
              escolheu o ano/período e turno certo?
            </Text>
          )
        }
        renderItem={({item}) => (
          <Button
            style={{height: 44, alignSelf: 'stretch'}}
            onPress={() => setShowImage(item.path)}>
            <Text white>
              {item.name} ({item.turn})
            </Text>
          </Button>
        )}
      />
      {renderImage()}
    </Container>
  );
}

SelectSchedules.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
