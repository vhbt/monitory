import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../../components/Header';
import SubjectCard from '../../../components/SubjectCard';

import {subjects} from '../../../constants/mocks';

import {Container, SubjectsList, SubjectsView} from './styles';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Container>
      <Header loading={loading} />
      <SubjectsList>
        <SubjectsView>
          {subjects.map(subject => (
            <SubjectCard
              key={subject.id}
              source={subject.image}
              name={subject.name}
              count={subject.count}
            />
          ))}
        </SubjectsView>
      </SubjectsList>
    </Container>
  );
}

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-home" size={32} color={tintColor} />
  ),
};
