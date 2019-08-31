import * as actions from './actions';
import { HeroSettingsState } from '@lib/models';

export const initialHeroSettingsState: HeroSettingsState = {
  isDrawerCollapsed: false,
  isDodayAppCollapsed: false,
  theme: 'dark',
};

export default (
  state = initialHeroSettingsState,
  action?: actions.ActionTypes
): HeroSettingsState => {
  switch (action!.type) {
    case actions.ActionConstants.TOGGLE_DRAWER:
      const value =
        action.payload != null ? action.payload : !state.isDrawerCollapsed;
      return {
        ...state,
        isDrawerCollapsed: value,
      };
    case actions.ActionConstants.TOGGLE_THEME:
      return {
        ...state,
        theme: action!.payload,
      };
    default:
      return state;
  }
};
