import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';

import {onesignal} from '../../../../../../services/api';

import colors from '../../../../../../constants/theme';
import {Container} from './styles';

export default function PostNews({navigation}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState([]);

  const messageRef = useRef();

  const items = [
    {
      id: 'Info',
      name: 'Todos os INFO',
      children: [
        {
          id: 'Info Matutino',
          name: 'INFO MATUTINO',
        },
        {
          id: 'Info Vespertino',
          name: 'INFO VESPERTINO',
        },
      ],
    },
    {
      id: 'Meca',
      name: 'Todos os MECA',
      children: [
        {
          id: 'Meca Matutino',
          name: 'MECA MATUTINO',
        },
        {
          id: 'Meca Vespertino',
          name: 'MECA VESPERTINO',
        },
      ],
    },
  ];

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await onesignal.post('notifications', {
        app_id: Config.ONESIGNAL_APP_ID,
        included_segments: selected,
        headings: {en: title},
        contents: {en: message},
      });

      const {recipients} = response.data;

      showMessage({
        type: 'success',
        message: `Notificação enviada para ${recipients} usuários.`,
      });
      navigation.navigate('StudentHome');
      setLoading(false);
    } catch (err) {
      showMessage({type: 'danger', message: err.response.data.errors[0]});
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#fafafa'}}>
        <Container>
          <Text h1 medium style={{marginBottom: 20}}>
            Enviar Notificação
          </Text>
          <SectionedMultiSelect
            items={items}
            uniqueKey="id"
            subKey="children"
            onSelectedItemsChange={setSelected}
            selectedItems={selected}
            displayKey="name"
            confirmText="Selecionar"
            selectText="Selecione as turmas"
            searchPlaceholderText="Procurar"
            submitButtonText="Selecionar"
            highlightChildren
            expandDropDowns
            styles={{
              button: {backgroundColor: colors.primary},
              selectToggle: {
                marginVertical: 10,
                padding: 5,
                borderWidth: 1,
                borderColor: colors.gray2,
                borderRadius: 4,
              },
            }}
          />
          <Input
            label="Título"
            onChangeText={setTitle}
            value={title}
            returnKeyType="next"
            onSubmitEditing={() => messageRef.current.focus()}
          />
          <Input
            label="Mensagem"
            multiline
            style={{height: 100, textAlignVertical: 'top'}}
            onChangeText={setMessage}
            value={message}
            ref={messageRef}
          />
          <Button
            loading={loading}
            style={{height: 44, alignSelf: 'stretch', marginTop: 20}}
            onPress={handleSubmit}>
            <Text white>Enviar</Text>
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
