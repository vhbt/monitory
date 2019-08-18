import {all} from 'redux-saga/effects';

import profile from './profile/saga';

export default function* rootSaga() {
  yield all([profile]);
}
