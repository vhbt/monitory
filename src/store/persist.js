import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'monitory',
      storage,
      whitelist: ['profile', 'app'],
    },
    reducers,
  );

  return persistedReducer;
};
