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
    case actions.ActionConstants.UPDATE_SELECTED_DODAY_PROGRESS:
      if (action.payload) {
        return {
          ...state,
          selectedDoday: {
            ...state.selectedDoday,
            progress: {
              ...state.selectedDoday.progress,
              ...action.payload,
            },
          },
        };
      }
      const { progress, ...omitted } = state.selectedDoday;
      return {
        ...state,
        selectedDoday: omitted,
      };
    case actions.ActionConstants.CLEAR_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: undefined,
      };
    case actions.ActionConstants.SET_DIRTY_STATUS:
      return {
        ...state,
        dirty: action.payload,
      };
    case actions.ActionConstants.SET_UPDATES_FOR_SELECTED_DODAY:
      return {
        ...state,
        updates: {
          ...state.updates,
          ...action.payload,
        },
      };
    case actions.ActionConstants.CLEAR_DIRTY_STUFF:
      return {
        ...state,
        dirty: undefined,
        updates: undefined,
      };
    default:
      return state;
  }
};
