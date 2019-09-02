import {combineReducers} from 'redux';

import profile from './profile/reducer';
import app from './app/reducer';

const reducers = combineReducers({
  profile,
  app,
});

export default reducers;
