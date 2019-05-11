import * as actions from './actions';
import { DodayAppStatusState, ScheduleState } from '@lib/models';

export const initialStatusState: DodayAppStatusState = {
  loading: false,
  route: '',
  routeParams: {},
  badge: 0,
};

export const initialState: ScheduleState = {
  chosenDate: new Date(),
  dodays: [],
  completed: [],
};

export const dodayAppStatusReducer = (
  state = initialStatusState,
  action: actions.ActionTypes
): DodayAppStatusState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.ActionConstants.CHANGE_ROUTE:
      return {
        ...state,
        route: action.payload,
      };
    case actions.ActionConstants.SET_QUERY_PARAMS:
      return {
        ...state,
        routeParams: action.payload,
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

export const dodayAppReducer = (
  state = initialState,
  action: actions.ActionTypes
): ScheduleState => {
  switch (action && action.type) {
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
    default:
      return state;
  }
};
