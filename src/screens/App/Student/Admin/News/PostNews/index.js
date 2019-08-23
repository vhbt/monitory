import React, {useState, useRef} from 'react';
import {SafeAreaView, Image, View, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';

import {api} from '../../../../../../services/api';

import {Container} from './styles';

export default function PostNews({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

  const descRef = useRef();
  const tagRef = useRef();
  const contentRef = useRef();

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

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

      const {path} = response.data;

      await api.post('news', {
        title,
        description: desc,
        tags: tag,
        content,
        banner: path,
      });

      showMessage({type: 'success', message: 'Noticia criada com sucesso.'});
      navigation.navigate('StudentCentral');
      setLoading(false);
    } catch (err) {
      showMessage({type: 'danger', message: err.response.data.detail});
      setLoading(false);
    }
  }

  function handleChoosePhoto() {
    const options = {noData: true};

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setBanner(response);
      }
    });
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Container>
          <Text h1 style={{marginBottom: 20}}>
            Postar Noticia
          </Text>
          <View
            style={{
              height: 120,
              width: '100%',
              backgroundColor: '#ddd',
              borderRadius: 4,
            }}>
            {banner ? (
              <Image
                source={{uri: banner.uri}}
                style={{flex: 1, borderRadius: 4}}
              />
            ) : (
              <Button
                borderless
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
            label="Titulo"
            onChangeText={setTitle}
            value={title}
            returnKeyType="next"
            onSubmitEditing={() => descRef.current.focus()}
          />
          <Input
            label="Descricao"
            onChangeText={setDesc}
            value={desc}
            ref={descRef}
            returnKeyType="next"
            onSubmitEditing={() => tagRef.current.focus()}
          />
          <Input
            label="Tag"
            onChangeText={setTag}
            value={tag}
            ref={tagRef}
            returnKeyType="next"
            onSubmitEditing={() => contentRef.current.focus()}
          />
          <Input
            label="Conteudo"
            multiline
            onChangeText={setContent}
            value={content}
            style={{height: 100, textAlignVertical: 'top'}}
            returnKeyType="next"
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
    </SafeAreaView>
  );
}

PostNews.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
