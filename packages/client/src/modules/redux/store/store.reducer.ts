import { StoreState } from '@doday/lib';
import { Action, ActionTypes } from './store.actions';

export const storeInitialState: StoreState = {
  status: {},
  items: [],
  count: 0,
};

export default (state = storeInitialState, action: Action): StoreState => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_STORE_STATUS:
      return {
        ...state,
        status: payload,
      };
    case ActionTypes.SET_DODAYS:
      return {
        ...state,
        items: payload,
      };
    case ActionTypes.SET_COUNT:
      return {
        ...state,
        count: payload,
      };
    default:
      return state;
  }
};
