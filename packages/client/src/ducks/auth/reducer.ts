import * as actions from './actions';
import { AuthState } from '@lib/models';

export const initialState: AuthState = {
  activeTools: [],
};

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
    case actions.ActionConstants.SET_ACTIVE_TOOL_BEACONS:
      return {
        ...state,
        activeTools: action.payload || [],
      };
    default:
      return state;
  }
};
