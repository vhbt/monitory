export function loginRequest(username, password) {
  return {
    type: '@profile/LOGIN_REQUEST',
    payload: {username, password},
  };
}

export function loginSuccess(payload) {
  return {
    type: '@profile/LOGIN_SUCCESS',
    payload,
  };
}

export function loginFailed() {
  return {
    type: '@profile/LOGIN_FAILED',
  };
}

export function logout() {
  return {
    type: '@profile/LOGOUT',
  };
}

export function updateUserRequest(payload) {
  return {
    type: '@profile/UPDATE_USER_REQUEST',
    payload,
  };
}

export function updateUserSuccess(payload) {
  return {
    type: '@profile/UPDATE_USER_SUCCESS',
    payload,
  };
}

export function updateUserFailed() {
  return {
    type: '@profile/UPDATE_USER_FAILED',
  };
}

export function resetLoading() {
  return {
    type: '@profile/RESET_LOADING',
  };
}
