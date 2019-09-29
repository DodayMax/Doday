import { SidebarActionConstants, SidebarActionTypes } from './actions';
import { SidebarState } from '@doday/lib';

export const initialStatusState: SidebarState = {
  loading: false,
  route: '',
  routeParams: {},
  badge: 0,
};

export default (
  state = initialStatusState,
  action: SidebarActionTypes
): SidebarState => {
  switch (action.type) {
    case SidebarActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case SidebarActionConstants.CHANGE_ROUTE:
      return {
        ...state,
        route: action.payload,
      };
    case SidebarActionConstants.SET_QUERY_PARAMS:
      return {
        ...state,
        routeParams: action.payload,
      };
    case SidebarActionConstants.SET_DODAYS_BADGE_FOR_TODAY:
      return {
        ...state,
        badge: action.payload,
      };
    default:
      return state;
  }
};
