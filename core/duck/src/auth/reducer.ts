import { AuthActionTypes, AuthActionConstants } from './actions';
import { AuthState } from '@doday/lib';

export const initialState: AuthState = {
  activeTools: {},
};

export default (state = initialState, action: AuthActionTypes): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionConstants.SET_HERO:
      return {
        ...state,
        hero: payload || false,
      };
    case AuthActionConstants.SET_ACTIVE_TOOL_BEACONS:
      return {
        ...state,
        activeTools: payload || {},
      };
    case AuthActionConstants.ADD_ACTIVE_TOOL_BEACON:
      console.log(payload);
      return {
        ...state,
        activeTools: {
          ...state.activeTools,
          [payload.config.sysname]: payload,
        },
      };
    default:
      return state;
  }
};
