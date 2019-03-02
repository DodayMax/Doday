import * as actions from './actions';
import { DodayAppState } from '@lib/models';

export const initialState: DodayAppState = {
  path: '',
  navStack: [],
};

export default (
  state = initialState,
  action: actions.ActionTypes,
): DodayAppState => {
  switch (action && action.type) {
    case actions.ActionConstants.CHANGE_PATH:
      return {
        ...state,
        path: action.payload,
      };
    case actions.ActionConstants.PUSH_TO_NAV_STACK:
      return {
        ...state,
        navStack: [...state.navStack, action.payload],
      }
    case actions.ActionConstants.POP_FROM_NAV_STACK:
      return {
        ...state,
        navStack: state.navStack.slice(0, state.navStack.length-1),
      }
    default:
      return state;
  }
};