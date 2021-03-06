import produce from 'immer';

const INITIAL_STATE = {
  firstTime: true,
  oneSignalPlayerId: null,
  darkMode: true,
};

export default function app(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@app/UNSET_FIRST_TIME': {
        draft.firstTime = false;
        break;
      }
      case '@app/SET_ONE_SIGNAL_PLAYER_ID': {
        draft.oneSignalPlayerId = action.payload.userId;
        break;
      }
      case '@app/TOGGLE_DARKMODE': {
        draft.darkMode = action.payload;
        break;
      }
      default:
    }
  });
}
