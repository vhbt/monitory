import {all, takeLatest, call, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {Keyboard} from 'react-native';

import {api, suap_api} from '../../../services/api';

import {
  loginFailed,
  loginSuccess,
  updateUserSuccess,
  updateUserFailed,
} from './actions';

export function* login({payload}) {
  try {
    const {username, password} = payload;

    const suap_response = yield call(suap_api.post, '/autenticacao/token/', {
      username,
      password,
    });

    const {token} = suap_response.data;

    const response = yield call(api.post, '/users', {
      token,
    });

    const user = response.data;

    yield put(loginSuccess({token, user}));
  } catch (err) {
    if (err.response) {
      showMessage({type: 'danger', message: err.response.data.detail});
    } else {
      showMessage({type: 'danger', message: 'Erro de conexão.'});
    }

    yield put(loginFailed());
  }
}

export function* updateUser({payload}) {
  try {
    const {
      id,
      email,
      selectedClassYear: curso_ano,
      selectedClassTurn: curso_turno,
    } = payload;

    const response = yield call(api.put, '/users', {
      id,
      email,
      curso_ano,
      curso_turno,
    });

    showMessage({type: 'success', message: 'Dados atualizados com sucesso.'});

    yield put(updateUserSuccess(response.data));
  } catch (err) {
    if (err.response) {
      showMessage({type: 'danger', message: err.response.data.detail});
    } else {
      showMessage({type: 'danger', message: 'Erro de conexão.'});
    }

    yield put(updateUserFailed());
  }
  Keyboard.dismiss();
}

export function* resetLoading() {
  yield put(loginFailed());
}

export default all([
  takeLatest('@profile/LOGIN_REQUEST', login),
  takeLatest('@profile/UPDATE_USER_REQUEST', updateUser),
  takeLatest('persist/REHYDRATE', resetLoading),
]);
