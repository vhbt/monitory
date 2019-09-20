import React, {useState, useRef} from 'react';
import {Image, View, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';

import {api} from '../../../../../../services/api';

import {getThemeColors} from '../../../../../../constants/theme';

import {Container} from './styles';

function PostNews({navigation}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

  const categoryRef = useRef();
  const contentRef = useRef();

  const colors = getThemeColors();

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      if (!banner) {
        showMessage({
          type: 'danger',
          message: 'Selecione um banner para a notícia.',
        });
        setLoading(false);
        return;
      }

      if (!title || !category || !content) {
        showMessage({
          type: 'danger',
          message: 'Preencha todos os campos.',
        });
        setLoading(false);
        return;
      }

      const data = new FormData();

      data.append('file', {
        name: banner.fileName,
        type: banner.type,
        uri:
          Platform.OS === 'android'
            ? banner.uri
            : banner.uri.replace('file://', ''),
      });

      const response = await api.post('files', data);

      const {path, path_thumb} = response.data;

      await api.post('news', {
        title,
        category,
        content,
        banner: path,
        banner_thumb: path_thumb,
      });

      showMessage({type: 'success', message: 'Noticia criada com sucesso.'});
      navigation.navigate('StudentHome');
      setLoading(false);
    } catch (err) {
      showMessage({type: 'danger', message: err.response.data.detail});
    } finally {
      setLoading(false);
    }
  }

  function handleChoosePhoto() {
    const options = {
      noData: true,
      mediaType: 'photo',
      title: 'Selecione um banner',
      takePhotoButtonTitle: 'Tirar uma foto',
      chooseFromLibraryButtonTitle: 'Escolher da biblioteca',
      cancelButtonTitle: 'Cancelar',
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setBanner(response);
      }
    });
  }

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: colors.background}}>
      <Container colors={colors}>
        <Text black h1 style={{marginBottom: 20}}>
          Postar Notícia
        </Text>
        <View
          style={{
            height: 120,
            width: '100%',
            backgroundColor: colors.background2,
            borderRadius: 4,
          }}>
          {banner ? (
            <>
              <Image
                source={{uri: banner.uri}}
                style={{flex: 1, borderRadius: 4}}
              />
              <Button
                borderless
                style={{
                  position: 'absolute',
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  alignSelf: 'center',
                  textAlign: 'center',
                  background: '#fff',
                }}
                onPress={() => setBanner('')}>
                <Text white style={{alignSelf: 'center'}}>
                  Limpar banner
                </Text>
              </Button>
            </>
          ) : (
            <Button
              borderless
              marginless
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleChoosePhoto}>
              {banner ? null : <Text gray>Selecionar Banner</Text>}
            </Button>
          )}
        </View>
        <Input
          label="Título"
          onChangeText={setTitle}
          value={title}
          returnKeyType="next"
          onSubmitEditing={() => categoryRef.current.focus()}
        />
        <Input
          label="Categoria"
          onChangeText={setCategory}
          value={category}
          ref={categoryRef}
          returnKeyType="next"
          onSubmitEditing={() => contentRef.current.focus()}
        />
        <Input
          label="Conteúdo"
          multiline
          autoCorrect
          onChangeText={setContent}
          value={content}
          style={{height: 130, textAlignVertical: 'top'}}
          ref={contentRef}
        />
        <Button
          loading={loading}
          style={{height: 44, alignSelf: 'stretch', marginTop: 10}}
          onPress={handleSubmit}>
          <Text white>Postar</Text>
        </Button>
      </Container>
    </KeyboardAwareScrollView>
  );
}

PostNews.navigationOptions = ({screenProps}) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.background,
    borderBottomColor: screenProps.theme.background,
    elevation: 0,
  },
  headerTintColor: screenProps.theme.black,
});

PostNews.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withTheme(PostNews);
