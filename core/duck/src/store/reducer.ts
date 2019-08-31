import * as actions from './actions';
import { StoreState } from '@lib/models';

export const initialStoreState: StoreState = {
  dodays: [],
};

export default (
  state = initialStoreState,
  action?: actions.ActionTypes
): StoreState => {
  switch (action!.type) {
    case actions.ActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.ActionConstants.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actions.ActionConstants.SET_SEARCH_FLAG:
      return {
        ...state,
        searching: action.payload,
      };
    case actions.ActionConstants.SET_DODAYS:
      return {
        ...state,
        dodays: action.payload.concat
          ? state.dodays.concat(action.payload.dodays)
          : action.payload.dodays,
        totalCount:
          action.payload.totalCount != null
            ? action.payload.totalCount
            : state.totalCount,
      };
    case actions.ActionConstants.OPTIMISTIC_REMOVE_PUBLIC_DODAY:
      return {
        ...state,
        dodays: state.dodays.filter(doday => doday.did !== action.payload),
        totalCount: state.totalCount - 1,
      };
    default:
      return state;
  }
};
