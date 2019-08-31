import {
  DodayDetailsActionConstants,
  DodayDetailsActionTypes,
} from './actions';
import { DodayDetailsState } from '@doday/lib';

export const initialDodayDetailsState: DodayDetailsState = {
  loading: false,
};

export default (
  state = initialDodayDetailsState,
  action: DodayDetailsActionTypes
): DodayDetailsState => {
  switch (action.type) {
    case DodayDetailsActionConstants.SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case DodayDetailsActionConstants.SET_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: action.payload,
      };
    case DodayDetailsActionConstants.UPDATE_SELECTED_DODAY:
      /** if there is updates in action = update selected doday progress */
      if (action!.payload) {
        return {
          ...state,
          selectedDoday: {
            ...state.selectedDoday,
            ...action.payload.doday,
            progress: {
              ...(state.selectedDoday && state.selectedDoday.progress),
              ...action.payload.progress,
            },
            resource: {
              ...(state.selectedDoday && state.selectedDoday.resource),
              ...action.payload.resource,
            },
          } as any,
        };
      }
      /** if there is no updates in action - remove progress from selected doday (untake) */
      const { progress, ...omitted } = state.selectedDoday!;
      return {
        ...state,
        selectedDoday: omitted,
      };
    case DodayDetailsActionConstants.SET_DIRTY_STATUS:
      return {
        ...state,
        dirty: action.payload,
      };
    case DodayDetailsActionConstants.SET_UPDATES_FOR_SELECTED_DODAY:
      return {
        ...state,
        updates: {
          ...state.updates,
          ...action.payload,
        },
      };
    case DodayDetailsActionConstants.CLEAR_DIRTY_STUFF:
      return {
        ...state,
        dirty: undefined,
        updates: undefined,
      };
    case DodayDetailsActionConstants.CLEAR_SELECTED_DODAY:
      return {
        ...state,
        selectedDoday: undefined,
      };
    default:
      return state;
  }
};
