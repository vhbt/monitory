import React, {useState, useRef} from 'react';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Text from '../../../../../../components/Text';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';

import {api} from '../../../../../../services/api';

import {Container} from './styles';

export default function PostNews() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

  const descRef = useRef();
  const tagRef = useRef();
  const contentRef = useRef();
  const bannerRef = useRef();

  async function handleSubmit() {
    try {
      await api.post('news', {
        title,
        description: desc,
        tags: tag,
        content,
        banner,
      });
    } catch (err) {
      showMessage({type: 'danger', message: err.response.data.detail});
    }
  }

  return (
    <KeyboardAwareScrollView>
      <Container>
        <Text h1 style={{marginBottom: 10}}>
          Postar Noticia
        </Text>
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
          onSubmitEditing={() => bannerRef.current.focus()}
          ref={contentRef}
        />
        <Input
          label="Banner"
          onChangeText={setBanner}
          value={banner}
          ref={bannerRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <Button
          style={{height: 44, alignSelf: 'stretch', marginTop: 20}}
          onPress={handleSubmit}>
          <Text white>Postar</Text>
        </Button>
      </Container>
    </KeyboardAwareScrollView>
  );
}
