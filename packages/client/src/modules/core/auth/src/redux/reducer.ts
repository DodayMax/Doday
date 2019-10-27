import { AuthActionTypes, AuthActionConstants } from './actions';
import { AuthState } from '@doday/lib';

export const initialState: AuthState = {
  status: {
    loading: false,
  },
  activeTools: {},
};

export default (state = initialState, action: AuthActionTypes): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionConstants.SET_AUTH_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case AuthActionConstants.SET_IS_AUTHENTICATED_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case AuthActionConstants.SET_HERO:
      return {
        ...state,
        hero: payload || false,
      };
    default:
      return state;
  }
};
