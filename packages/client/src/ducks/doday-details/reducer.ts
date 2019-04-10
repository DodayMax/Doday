import * as actions from './actions';
import { DodayDetailsState } from '@lib/models';

export const initialState: DodayDetailsState = {
  loading: false,
};

export default (
  state = initialState,
  action?: actions.ActionTypes
): DodayDetailsState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.ActionConstants.SET_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: action.payload,
      };
    case actions.ActionConstants.UPDATE_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: {
          ...state.selectedDoday,
          ...action.payload.updates,
        },
      };
    case actions.ActionConstants.CLEAR_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: undefined,
      };
    default:
      return state;
  }
};
