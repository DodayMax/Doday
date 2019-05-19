import * as actions from './actions';
import { StoreState } from '@lib/models';
import { DodayLike } from '@root/tools/types';

export const initialStoreState: StoreState = {
  dodays: [],
};

export default (
  state = initialStoreState,
  action?: actions.ActionTypes
): StoreState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_DODAYS:
      return {
        ...state,
        dodays: action.payload as DodayLike[],
      };
    default:
      return state;
  }
};
