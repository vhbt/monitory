import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {format, parseISO} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

import Text from '../../../../../../components/Text';

import {api} from '../../../../../../services/api';

import {Container, QuestionCard} from './styles';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  async function getQuestions() {
    const response = await api.get(`/questions?limit=${10}&page=${page}`);

    setQuestions(response.data.questions);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Container>
      <FlatList
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <QuestionCard>
            <Text>{item.content}</Text>
            <Text gray>Resposta(s): {item.answers.length}</Text>
            <Text gray style={{marginTop: 10}}>
              {format(parseISO(item.createdAt), "d 'de' MMMM 'às' HH:MM", {
                locale: ptbr,
              })}
            </Text>
          </QuestionCard>
        )}
      />
    </Container>
  );
}

Home.navigationOptions = {
  title: 'Perguntas',
};
