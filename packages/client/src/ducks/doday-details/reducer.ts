import * as actions from './actions';
import { DodayDetailsState } from '@lib/models';

export const initialDodayDetailsState: DodayDetailsState = {
  loading: false,
};

export default (
  state = initialDodayDetailsState,
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
      /** if there is updates in action = update selected doday progress */
      if (action.payload) {
        return {
          ...state,
          selectedDoday: {
            ...state.selectedDoday,
            ...action.payload.doday,
            progress: {
              ...state.selectedDoday.progress,
              ...action.payload.progress,
            },
            resource: {
              ...state.selectedDoday.resource,
              ...action.payload.resource,
            },
          },
        };
      }
      /** if there is no updates in action - remove progress from selected doday (untake) */
      const { progress, ...omitted } = state.selectedDoday;
      return {
        ...state,
        selectedDoday: omitted,
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
    case actions.ActionConstants.CLEAR_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: undefined,
      };
    default:
      return state;
  }
};
