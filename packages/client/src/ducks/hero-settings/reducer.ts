import * as actions from './actions';
import { HeroSettingsState } from '@lib/models';

export const initialState: HeroSettingsState = {
  isDrawerCollapsed: false,
};

export default (
  state = initialState,
  action?: actions.ActionTypes
): HeroSettingsState => {
  switch (action && action.type) {
    case actions.ActionConstants.TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerCollapsed: !state.isDrawerCollapsed,
      };
    default:
      return state;
  }
};
