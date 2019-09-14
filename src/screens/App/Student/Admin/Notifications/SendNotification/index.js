import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';

import {api} from '../../../../../../services/api';

import {getThemeColors} from '../../../../../../constants/theme';
import {Container} from './styles';

export default function SendNotification({navigation}) {
  const myCurrentPlayerId = useSelector(state => state.app.oneSignalPlayerId);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingList, setLoadingList] = useState();

  const messageRef = useRef();

  const colors = getThemeColors();

  async function getStudents() {
    setLoadingList(true);
    const response = await api.get('/users?limit=300');
    const studentsRaw = response.data.users.filter(user => {
      return user.devices.length > 0;
    });
    const classes = [];

    const sortedStudents = studentsRaw.sort((a, b) => {
      const aClassString =
        a.curso_ano && a.curso_turno
          ? `${a.curso} ${a.curso_ano} ${a.curso_turno}`
          : `${a.curso}`;
      const bClassString =
        b.curso_ano && b.curso_turno
          ? `${b.curso} ${b.curso_ano} ${b.curso_turno}`
          : `${b.curso}`;

      if (aClassString < bClassString) return -1;
      if (aClassString > bClassString) return 1;
      return 0;
    });

    sortedStudents.forEach(student => {
      const shortStudentCurso = student.curso.replace(
        'Técnico de Nível Médio em ',
        '',
      );

      const nameClassString =
        student.curso_ano && student.curso_turno
          ? `${shortStudentCurso} ${student.curso_ano} ${student.curso_turno}`
          : `${shortStudentCurso}`;

      const idClassString =
        student.curso_ano && student.curso_turno
          ? `${student.curso} ${student.curso_ano} ${student.curso_turno}`
          : `${student.curso}`;

      const currentClass = {};
      currentClass.name = nameClassString;
      currentClass.id = idClassString;
      currentClass.children = [];

      if (!classes.filter(curClass => curClass.id === idClassString).length) {
        classes.push(currentClass);
      }
    });

    sortedStudents.forEach(user => {
      const devicesRaw = user.devices.map(device => device.id);

      const classString =
        user.curso_ano && user.curso_turno
          ? `${user.curso} ${user.curso_ano} ${user.curso_turno}`
          : `${user.curso}`;

      const devices = devicesRaw.filter(device => {
        return device !== myCurrentPlayerId;
      });

      const student = {
        id: devices.length > 0 ? devices : user.matricula,
        name: user.nome_completo,
      };

      classes.forEach(curClass =>
        curClass.id === classString ? curClass.children.push(student) : null,
      );
    });

    setItems(classes);
    setLoadingList(false);
  }

  function handleSelected(selectedItems) {
    setSelected(selectedItems);
  }

  useEffect(() => {
    getStudents();
  }, []);

  async function handleSubmit() {
    const devicesToSend = [];

    selected.map(student => {
      if (Array.isArray(student)) {
        return student.map(each => devicesToSend.push(each));
      }
      return devicesToSend.push(student);
    });

    try {
      setLoading(true);

      const response = await api.post('/notifications', {
        title,
        message,
        playerids: devicesToSend,
      });

      const {recipients} = response.data;
      showMessage({
        type: 'success',
        message: `Notificação enviada para ${recipients} dispositivo(s).`,
      });

      navigation.navigate('StudentHome');
      setLoading(false);
    } catch (err) {
      if (err.response.detail) {
        showMessage({type: 'danger', message: err.response.data.errors[0]});
      } else if (err.message) {
        showMessage({type: 'danger', message: err.message});
      } else {
        showMessage({
          type: 'danger',
          message: 'Erro de conexão',
          description: 'Verifique sua conexão com a internet.',
        });
      }
      setLoading(false);
    }
  }

  function handleConfirmSend(id) {
    Alert.alert(
      'Confirmacão',
      'Tem certeza que deseja enviar essa notificação?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => handleSubmit(id)},
      ],
      {cancelable: false},
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: colors.background}}>
        <Container colors={colors}>
          <Text black h1 medium style={{marginBottom: 20}}>
            Enviar Notificação
          </Text>
          <SectionedMultiSelect
            items={items}
            uniqueKey="id"
            subKey="children"
            onSelectedItemsChange={handleSelected}
            selectedItems={selected}
            displayKey="name"
            confirmText="Selecionar"
            selectText="Selecione os alunos"
            searchPlaceholderText="Procurar"
            submitButtonText="Selecionar"
            noResultsComponent={
              <Text black medium style={{alignSelf: 'center', marginTop: 10}}>
                Nenhum resultado...
              </Text>
            }
            loading={loadingList}
            highlightChildren
            readOnlyHeadings
            styles={{
              button: {backgroundColor: colors.primary},
              modalWrapper: {paddingVertical: 30},
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
            onPress={handleConfirmSend}>
            <Text white>Enviar</Text>
          </Button>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

SendNotification.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
