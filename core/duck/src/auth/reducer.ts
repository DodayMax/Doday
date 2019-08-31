import { AuthActionTypes, AuthActionConstants } from './actions';
import { AuthState } from '@doday/lib';

export const initialState: AuthState = {
  activeTools: [],
};

export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case AuthActionConstants.SET_HERO:
      return {
        ...state,
        hero: action.payload || false,
      };
    case AuthActionConstants.SET_ACTIVE_TOOL_BEACONS:
      return {
        ...state,
        activeTools: action.payload || [],
      };
    default:
      return state;
  }
};
