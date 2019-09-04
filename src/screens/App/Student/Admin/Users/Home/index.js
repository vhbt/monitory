import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../../../../components/Text';

import {api} from '../../../../../../services/api';
import colors from '../../../../../../constants/theme';

import {Container, UserCard} from './styles';

export default function Home({navigation}) {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState('...');

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function getUsers(shouldRefresh = false) {
    setLoading(true);
    const response = await api.get(`/users?limit=${5}&page=${page}`);

    const filteredResponse = response.data.users.map(user => ({
      ...user,
      smallCurso: user.curso.replace('Técnico de Nível Médio em ', ''),
    }));

    if (refreshing || shouldRefresh) {
      setUsers(filteredResponse);
    } else {
      setUsers(
        users.length === 0 ? filteredResponse : [...users, ...filteredResponse],
      );
    }

    setTotalCount(response.data.totalCount);
    setLoading(false);
    setFetching(false);
    setRefreshing(false);
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

  async function handleRefresh() {
    setRefreshing(true);

    if (page === 1) {
      getUsers(true);
    } else {
      setPage(1);
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
          <UserCard
            onPress={() => navigation.navigate('ViewStudent', {student: item})}>
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
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{marginTop: 10}}
            />
          ) : (
            <Text>Algo deu errado...</Text>
          )
        }
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

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
