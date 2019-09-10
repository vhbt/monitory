import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {Keyboard} from 'react-native';
import OneSignal from 'react-native-onesignal';

import {api, suap_api} from '../../../services/api';

import {
  loginRequest,
  loginFailed,
  loginSuccess,
  updateUserSuccess,
  updateUserFailed,
  logout,
  resetLoading,
} from './actions';

export function* login({payload}) {
  const {username, password, renew} = payload;

  try {
    const suap_response = yield call(suap_api.post, '/autenticacao/token/', {
      username,
      password,
    });

    const state = yield select();
    const {oneSignalPlayerId} = state.app;
    const {token} = suap_response.data;

    const response = yield call(api.post, '/users', {
      token,
      oneSignalPlayerId,
    });

    const user = response.data;

    if (
      user.matricula &&
      (user.campus !== 'PAR' || user.tipo_vinculo !== 'Aluno')
    ) {
      showMessage({
        type: 'danger',
        message:
          'Por enquanto o Monitory só está disponivel para alunos do IFRN Parnamirim.',
        duration: 3000,
      });
      yield put(loginFailed());
      return;
    }
    if (!user.matricula && user.name === 'Error') {
      showMessage({
        type: 'danger',
        message: user,
        duration: 3000,
      });
      yield put(loginFailed());
      return;
    }

    suap_api.defaults.headers.authorization = `JWT ${token}`;
    api.defaults.headers.authorization = `JWT ${token}`;

    OneSignal.setExternalUserId(user.matricula);

    OneSignal.sendTags({
      curso: user.curso,
      curso_ano: user.curso_ano,
      curso_turno: user.curso_turno,
    });

    yield put(loginSuccess({token, user, username, password}));
  } catch (err) {
    if (err.response) {
      showMessage({type: 'danger', message: err.response.data.detail});
      if (renew) {
        yield put(logout());
      }
    } else {
      showMessage({
        type: 'danger',
        message: 'Erro de conexão',
        description: 'Verifique sua conexão com a internet.',
      });
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
      playerId,
    } = payload;

    const data = {
      id,
      curso_ano,
      curso_turno,
      playerId,
    };

    if (email && email !== '') {
      data.email = email;
    }

    const response = yield call(api.put, '/users', data);

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
      showMessage({
        type: 'danger',
        message: 'Erro de conexão',
        description: 'Verifique sua conexão com a internet.',
      });
    }

    yield put(updateUserFailed());
  }
  Keyboard.dismiss();
}

export function* refresh() {
  yield put(resetLoading());

  api.defaults.timeout = 10000;
  suap_api.defaults.timeout = 10000;

  const state = yield select();
  const {token, user, username, password} = state.profile;

  if (!token) return;

  try {
    yield call(suap_api.post, '/autenticacao/token/refresh/', {
      token,
    });

    suap_api.defaults.headers.authorization = `JWT ${token}`;
    api.defaults.headers.authorization = `JWT ${token}`;

    OneSignal.setExternalUserId(user.matricula);

    OneSignal.sendTags({
      curso: user.curso,
      curso_ano: user.curso_ano,
      curso_turno: user.curso_turno,
    });
  } catch (err) {
    if (err.response) {
      if (err.response.status === 400) {
        yield put(loginRequest(username, password, true));
      }
    } else {
      showMessage({
        type: 'danger',
        message: 'Erro de conexão',
        description: 'Verifique sua conexão com a internet.',
      });
    }
  }
}

export function* logOut() {
  try {
    OneSignal.removeExternalUserId();

    const state = yield select();
    const {oneSignalPlayerId} = state.app;

    return yield call(api.delete, '/playerid', {data: {oneSignalPlayerId}});
  } catch (err) {
    return err;
  }
}

export default all([
  takeLatest('@profile/LOGIN_REQUEST', login),
  takeLatest('@profile/UPDATE_USER_REQUEST', updateUser),
  takeLatest('@profile/LOGOUT', logOut),
  takeLatest('persist/REHYDRATE', refresh),
]);
