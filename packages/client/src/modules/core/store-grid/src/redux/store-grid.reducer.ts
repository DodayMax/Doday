import { StoreGridState, BASE_ROUTES } from '@doday/lib';
import { Action, ActionTypes } from './store-grid.actions';

export const storeGridInitialState: StoreGridState = {
  status: {},
  items: [],
  count: 0,
};

export default (
  state = storeGridInitialState,
  action: Action
): StoreGridState => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_STORE_GRID_STATUS:
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
