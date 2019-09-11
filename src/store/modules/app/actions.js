export function unsetFirstTime() {
  return {
    type: '@app/UNSET_FIRST_TIME',
  };
}

export function setOneSignalPlayerId({userId}) {
  return {
    type: '@app/SET_ONE_SIGNAL_PLAYER_ID',
    payload: {userId},
  };
}

export function toggleDarkMode(enabled) {
  return {
    type: '@app/TOGGLE_DARKMODE',
    payload: enabled,
  };
}
