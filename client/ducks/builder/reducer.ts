import * as actions from './actions';
import { BuilderState } from '@lib/models';

export const initialState: BuilderState = {
  activityTypes: [],
};

export default (
  state = initialState,
  action?: actions.ActionTypes,
): BuilderState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: action!.payload,
      };
    default:
      return state;
  }
};