import * as actions from './actions';
import { AuthState } from '@lib/models';

export const initialState: AuthState = {
  isAuthenticated: false,
};

export default (
  state = initialState,
  action?: actions.ActionTypes,
): AuthState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_AUTHENTICATED_STATUS:
      return {
        ...state,
        isAuthenticated: action!.payload,
      };
    default:
      return state;
  }
};