import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

import Text from '../../../../../../components/Text';

import {api} from '../../../../../../services/api';
import colors from '../../../../../../constants/theme';

import {Container, UserCard} from './styles';

export default function Home() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState('...');

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  async function getUsers() {
    setLoading(true);
    const response = await api.get(`/users?limit=${5}&page=${page}`);

    const filteredResponse = response.data.users.map(user => ({
      ...user,
      smallCurso: user.curso.replace('Técnico de Nível Médio em ', ''),
    }));

    setUsers(
      users.length === 0 ? filteredResponse : [...users, ...filteredResponse],
    );
    setTotalCount(response.data.totalCount);
    setLoading(false);
    setFetching(false);
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  async function loadMore() {
    if (totalCount > users.length && !fetching) {
      setFetching(true);
      setPage(page + 1);
    }
  }

  return (
    <Container>
      <Text h1 black medium style={{marginBottom: 15}}>
        Alunos
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text>Total: </Text>
        <Text black bold>
          {totalCount}
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 15}}
        data={users}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <UserCard>
            <Text black medium>
              {item.nome_usual} ({item.matricula})
            </Text>
            <Text black style={{marginBottom: 5}}>
              {item.smallCurso}
            </Text>
            <Text gray>Ano/Período: {item.curso_ano || '?'}</Text>
            <Text gray>Turno: {item.curso_turno || '?'}</Text>
          </UserCard>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={{paddingTop: 5}}>
            {loading && users.length > 0 ? (
              <ActivityIndicator
                size="small"
                color={colors.primary}
                style={{paddingBottom: 5}}
              />
            ) : null}
          </View>
        }
      />
    </Container>
  );
}
