import { DodayAppActionConstants, DodayAppActionTypes } from './actions';
import { DodayAppStatusState } from '@doday/lib';

export const initialStatusState: DodayAppStatusState = {
  loading: false,
  route: '',
  routeParams: {},
  badge: 0,
};

export default (
  state = initialStatusState,
  action: DodayAppActionTypes
): DodayAppStatusState => {
  switch (action.type) {
    case DodayAppActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case DodayAppActionConstants.CHANGE_ROUTE:
      return {
        ...state,
        route: action.payload,
      };
    case DodayAppActionConstants.SET_QUERY_PARAMS:
      return {
        ...state,
        routeParams: action.payload,
      };
    case DodayAppActionConstants.SET_DODAYS_BADGE_FOR_TODAY:
      return {
        ...state,
        badge: action.payload,
      };
    default:
      return state;
  }
};
