import { StoreActionConstants, StoreActionTypes } from './actions';
import { StoreState } from '@doday/lib';

export const initialStoreState: StoreState = {
  dodays: [],
};

export default (
  state = initialStoreState,
  action: StoreActionTypes
): StoreState => {
  switch (action.type) {
    case StoreActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case StoreActionConstants.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case StoreActionConstants.SET_SEARCH_FLAG:
      return {
        ...state,
        searching: action.payload,
      };
    case StoreActionConstants.SET_DODAYS:
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
    case StoreActionConstants.OPTIMISTIC_REMOVE_PUBLIC_DODAY:
      return {
        ...state,
        dodays: state.dodays.filter(doday => doday.did !== action.payload),
        totalCount: state.totalCount ? state.totalCount - 1 : 0,
      };
    default:
      return state;
  }
};
