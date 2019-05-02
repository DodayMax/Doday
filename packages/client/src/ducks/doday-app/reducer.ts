import * as actions from './actions';
import { DodayAppState } from '@lib/models';

export const initialState: DodayAppState = {
  loading: false,
  path: '',
  badge: 0,
  chosenDate: new Date(),
  dodays: [],
  completed: [],
};

export default (
  state = initialState,
  action: actions.ActionTypes
): DodayAppState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.ActionConstants.CHANGE_PATH:
      return {
        ...state,
        path: action.payload,
      };
    case actions.ActionConstants.CHANGE_DATE:
      return {
        ...state,
        chosenDate: action!.payload,
      };
    case actions.ActionConstants.SET_DODAYS:
      return {
        ...state,
        dodays: action.payload,
      };
    case actions.ActionConstants.SET_COMPLETED_DODAYS:
      return {
        ...state,
        completed: action.payload,
      };
    case actions.ActionConstants.SET_DODAYS_BADGE_FOR_TODAY:
      return {
        ...state,
        badge: action.payload,
      };
    default:
      return state;
  }
};
