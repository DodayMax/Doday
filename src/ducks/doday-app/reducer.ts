import * as actions from './actions';
import { DodayAppState } from '@lib/models';

export const initialState: DodayAppState = {
  path: '',
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
    default:
      return state;
  }
};