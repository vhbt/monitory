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
import {withTheme} from 'styled-components';
import {showMessage} from 'react-native-flash-message';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import {getThemeColors} from '../../../../constants/theme';

import {api} from '../../../../services/api';

import {Container} from './styles';

function SelectSchedules() {
  const user = useSelector(state => state.profile.user);
  const [showImage, setShowImage] = useState(null);
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = getThemeColors();

  async function getClasses() {
    const classesResponse = await api.get('/schedules');
    const classes = classesResponse.data;
    const otherClasses = classes.filter(
      otherClass =>
        user.curso !== otherClass.course.description ||
        Number(user.curso_ano) !== Number(otherClass.year) ||
        user.curso_turno !== otherClass.turn,
    );

    const myClass = classes
      .filter(mc => {
        if (user.curso_ano && user.curso_turno) {
          return (
            user.curso === mc.course.description &&
            Number(user.curso_ano) === Number(mc.year) &&
            user.curso_turno === mc.turn
          );
        }
        return mc;
      })
      .map(mc => ({...mc, myClass: true}));

    if (!user.curso_ano || !user.curso_turno) {
      showMessage({
        type: 'info',
        duration: 6000,
        message:
          'Configure o seu curso e ano na aba Perfil para abrir o horário de sua turma automaticamente.',
      });
    }

    setMyClasses([...myClass, ...otherClasses]);
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
          }}
          renderIndicator={() => null}
          loadingRender={() => <ActivityIndicator size="large" color="#fff" />}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => {
                setShowImage(false);
              }}
              style={{
                padding: 20,
              }}>
              <Icon name="ios-close" size={42} color="#fff" />
            </TouchableOpacity>
          )}
          renderImage={props => (
            <Image
              {...props}
              style={{
                width: '100%',
                aspectRatio: 1.47,
                position: 'absolute',
              }}
            />
          )}
        />
      </Modal>
    );
  }

  return (
    <Container colors={colors}>
      <Text black h1>
        De qual turma e turno?
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={myClasses}
        keyExtractor={item => `${item.name}${item.year}${item.turn}`}
        style={{marginTop: 30, flex: 1}}
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
          <>
            <Button
              style={{
                height: 44,
                alignSelf: 'stretch',
                marginBottom: item.myClass ? 25 : 5,
              }}
              onPress={() =>
                setShowImage(`${Config.STATIC_FILES_URL}/${item.name}.png`)
              }>
              <Text white>
                {item.name} ({item.turn})
              </Text>
            </Button>
            {item.myClass ? (
              <Text black h3 style={{marginBottom: 5}}>
                Outras turmas
              </Text>
            ) : null}
          </>
        )}
      />
      {renderImage()}
    </Container>
  );
}

SelectSchedules.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

export default withTheme(SelectSchedules);
