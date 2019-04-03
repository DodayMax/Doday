import * as actions from './actions';
import { AuthState } from '@lib/models';

export const initialState: AuthState = {};

export default (
  state = initialState,
  action?: actions.ActionTypes
): AuthState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_HERO:
      return {
        ...state,
        hero: action.payload || false,
      };
    default:
      return state;
  }
};
