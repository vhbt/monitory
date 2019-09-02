import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Image, Dimensions, SafeAreaView} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import PropTypes from 'prop-types';

import Text from '../../components/Text';

import phoneIlustration from '../../assets/images/phoneIlustration.png';
import grades from '../../assets/images/grades.png';
import classDetails from '../../assets/images/classDetails.png';
import schedules from '../../assets/images/schedules.png';
import catIlustration from '../../assets/images/catIlustration.png';

import {unsetFirstTime} from '../../store/modules/app/actions';

import {Container} from './styles';

export default function Splash() {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);

  const slides = [
    {
      key: 'welcome',
      title: 'Bem-vindo ao\nMonitory!',
      text:
        'Criamos esse app especialmente para você, estudante do IFRN.\n\nVeja um pouco sobre o que você pode fazer e aproveite!',
      image: phoneIlustration,
      width: '85%',
    },
    {
      key: 'grades',
      title: 'Veja suas notas',
      text: 'Presenças e faltas.',
      image: grades,
      backgroundColor: '#febe29',
      width: '85%',
      height: '50%',
    },
    {
      key: 'classes',
      title: 'Detalhes das materias',
      text: 'Materiais postados pelos professores e diário de classe.',
      image: classDetails,
      width: Dimensions.get('window').width - 130,
      height: Dimensions.get('window').height - 260,
    },
    {
      key: 'schedules',
      title: 'Horários',
      text: 'Atualizados diretamente do mange.',
      image: schedules,
      width: Dimensions.get('window').width - 130,
      height: Dimensions.get('window').height - 260,
    },
    {
      key: 'more',
      title: 'Sugestões?',
      text:
        'Conte para nós! Queremos tornar sua experiência cada vez melhor!\n\n💖',
      image: catIlustration,
      width: Dimensions.get('window').width - 85,
      height: Dimensions.get('window').height - 410,
    },
  ];

  useEffect(() => {
    if (done) {
      dispatch(unsetFirstTime());
    }
  }, [done]);

  function renderItem({item}) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Container>
          <Text h2 white semibold style={{textAlign: 'center', width: 250}}>
            {item.title}
          </Text>
          <Image
            source={item.image}
            style={{
              flex: 0.8,
              width: item.width,
              height: item.height,
              resizeMode: 'contain',
              marginVertical: 30,
              backgroundColor: 'transparent',
            }}
          />
          <Text
            white
            medium
            style={{paddingHorizontal: 30, textAlign: 'center', width: 320}}>
            {item.text}
          </Text>
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <AppIntroSlider
      renderItem={renderItem}
      slides={slides}
      nextLabel="Próximo"
      doneLabel="Fazer login"
      onDone={() => setDone(true)}
    />
  );
}

Splash.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    resizeMode: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Splash.defaultProps = {
  item: {},
};
