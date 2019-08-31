import * as actions from './actions';
import { DodayAppStatusState } from '@lib/models';

export const initialStatusState: DodayAppStatusState = {
  loading: false,
  route: '',
  routeParams: {},
  badge: 0,
};

export default (
  state = initialStatusState,
  action: actions.ActionTypes
): DodayAppStatusState => {
  switch (action.type) {
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
