import React, {useState, useEffect} from 'react';
import {View, FlatList, Modal, TouchableOpacity, Platform} from 'react-native';
import {format, parseISO} from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../../../../../../components/Text';

import {api} from '../../../../../../services/api';

import {getThemeColors} from '../../../../../../constants/theme';
import {Container, QuestionCard} from './styles';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showAnswers, setShowAnswers] = useState(null);

  const colors = getThemeColors();

  async function getQuestions() {
    const response = await api.get(`/questions?limit=${10}&page=${page}&new=1`);
    setQuestions(response.data.questions);
    setLoading(false);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  function renderGradesShimmerRows(numberOfRows) {
    const shimmerRows = [];

    for (let i = 0; i < numberOfRows; i += 1) {
      shimmerRows.push(
        <ShimmerPlaceholder
          key={i}
          autoRun
          colorShimmer={[
            colors.background2,
            colors.background2,
            colors.background,
          ]}
          style={{
            marginVertical: 5,
            height: 58,
            width: '100%',
            borderRadius: 4,
          }}
        />,
      );
    }

    return <>{shimmerRows}</>;
  }

  function renderAnswers() {
    return (
      <Modal animationType="slide" visible={Boolean(showAnswers)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            height: '100%',
            width: '100%',
            backgroundColor: colors.background,
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowAnswers(null);
              setLoading(false);
            }}
            style={{
              padding: 5,
              martinVertical: Platform.OS === 'ios' ? 10 : 0,
              height: Platform.OS === 'ios' ? 48 : 38,
              width: Platform.OS === 'ios' ? 48 : 38,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="ios-close" size={48} color={colors.black} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={showAnswers}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => (
                <View style={{marginVertical: 10}}>
                  <Text black>{item.content}</Text>
                  <Text gray>{item.user.nome_usual}</Text>
                  <Text gray>
                    {format(
                      parseISO(item.created_at),
                      "d 'de' MMMM 'às' HH:MM",
                      {locale: ptbr},
                    )}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Container colors={colors}>
      <FlatList
        data={questions}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={() =>
          loading ? (
            renderGradesShimmerRows(4)
          ) : (
            <Text gray>Ainda não há nada aqui.</Text>
          )
        }
        renderItem={({item}) => (
          <QuestionCard
            colors={colors}
            onPress={() => setShowAnswers(item.answers)}>
            <Text black>{item.content}</Text>
            <Text gray>Resposta(s): {item.answers.length}</Text>
            <Text gray style={{marginTop: 10}}>
              {format(parseISO(item.createdAt), "d 'de' MMMM 'às' HH:MM", {
                locale: ptbr,
              })}
            </Text>
          </QuestionCard>
        )}
      />
      {renderAnswers()}
    </Container>
  );
}

Home.navigationOptions = {
  title: 'Perguntas',
};
