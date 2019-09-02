import produce from 'immer';

const INITIAL_STATE = {
  firstTime: true,
};

export default function app(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@app/UNSET_FIRST_TIME': {
        draft.firstTime = false;
        break;
      }
      default:
    }
  });
}
