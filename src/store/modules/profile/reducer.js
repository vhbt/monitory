import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  user: null,
  loading: false,
};

export default function profile(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@profile/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@profile/LOGIN_SUCCESS': {
        draft.loading = false;
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        break;
      }
      case '@profile/LOGIN_FAILED': {
        draft.loading = false;
        break;
      }
      case '@profile/LOGOUT': {
        draft.token = null;
        draft.user = null;
        break;
      }
      case '@profile/UPDATE_USER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@profile/UPDATE_USER_SUCCESS': {
        draft.loading = false;
        draft.user.email = action.payload.email;
        draft.user.curso_ano = action.payload.curso_ano;
        draft.user.curso_turno = action.payload.curso_turno;
        break;
      }
      case '@profile/UPDATE_USER_FAILED': {
        draft.loading = false;
        break;
      }
      case '@profile/RESET_LOADING': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
