import * as actions from './actions';
import { HeroSettingsState } from '@lib/models';

export const initialHeroSettingsState: HeroSettingsState = {
  isDrawerCollapsed: false,
  isDodayAppCollapsed: false,
};

export default (
  state = initialHeroSettingsState,
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
