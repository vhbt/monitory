import {combineReducers} from 'redux';

import profile from './profile/reducer';

const reducers = combineReducers({
  profile,
});

export default reducers;
