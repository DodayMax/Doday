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
    default:
      return state;
  }
};
