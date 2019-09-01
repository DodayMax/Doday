import {
  HeroSettingsActionConstants,
  HeroSettingsActionTypes,
} from './actions';
import { HeroSettingsState } from '@doday/lib';

export const initialHeroSettingsState: HeroSettingsState = {
  isDrawerCollapsed: true,
  isDodayAppCollapsed: false,
  theme: 'dark',
};

export default (
  state = initialHeroSettingsState,
  action: HeroSettingsActionTypes
): HeroSettingsState => {
  switch (action.type) {
    case HeroSettingsActionConstants.TOGGLE_DRAWER:
      const value =
        action!.payload != null ? action!.payload : !state.isDrawerCollapsed;
      return {
        ...state,
        isDrawerCollapsed: value,
      };
    case HeroSettingsActionConstants.TOGGLE_THEME:
      const theme = action.payload != null ? action.payload : 'dark';
      return {
        theme,
        ...state,
      };
    default:
      return state;
  }
};
