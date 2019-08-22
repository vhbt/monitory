import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {Keyboard} from 'react-native';
import OneSignal from 'react-native-onesignal';

import {api, suap_api} from '../../../services/api';

import {
  loginFailed,
  loginSuccess,
  updateUserSuccess,
  updateUserFailed,
  logout,
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

    suap_api.defaults.headers.authorization = `JWT ${token}`;
    api.defaults.headers.authorization = `JWT ${token}`;

    OneSignal.setExternalUserId(user.matricula);

    OneSignal.sendTags({
      curso: user.curso,
      curso_ano: user.curso_ano,
      curso_turno: user.curso_turno,
    });

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

    const user = response.data;

    OneSignal.setExternalUserId(user.matricula);

    OneSignal.sendTags({
      curso: user.curso,
      curso_ano: user.curso_ano,
      curso_turno: user.curso_turno,
    });

    showMessage({type: 'success', message: 'Dados atualizados com sucesso.'});

    yield put(updateUserSuccess(user));
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

export function* refresh() {
  // unset loading
  yield put(loginFailed());

  const state = yield select();
  const {token} = state.profile;
  const {user} = state.profile;

  if (!token) return;

  try {
    const response = yield call(suap_api.post, '/autenticacao/token/refresh/', {
      token,
    });

    if (!(response.status === 200)) {
      yield put(logout());
    }

    suap_api.defaults.headers.authorization = `JWT ${token}`;
    api.defaults.headers.authorization = `JWT ${token}`;

    OneSignal.setExternalUserId(user.matricula);

    OneSignal.sendTags({
      curso: user.curso,
      curso_ano: user.curso_ano,
      curso_turno: user.curso_turno,
    });
  } catch (err) {
    yield put(logout());
  }
}

export function logOut() {
  OneSignal.removeExternalUserId();
}

export default all([
  takeLatest('@profile/LOGIN_REQUEST', login),
  takeLatest('@profile/UPDATE_USER_REQUEST', updateUser),
  takeLatest('@profile/LOGOUT', logOut),
  takeLatest('persist/REHYDRATE', refresh),
]);
