import { LayoutActionConstants, LayoutActionTypes } from './actions';
import { LayoutState } from '@doday/lib';

export const initialHeroSettingsState: LayoutState = {
  isDrawerCollapsed: true,
  isSidebarCollapsed: false,
  sidebarWidth: 280,
  theme: 'dark',
};

export default (
  state = initialHeroSettingsState,
  action: LayoutActionTypes
): LayoutState => {
  switch (action!.type) {
    case LayoutActionConstants.TOGGLE_DRAWER:
      const value =
        action!.payload != null ? action.payload : !state.isDrawerCollapsed;
      return {
        ...state,
        isDrawerCollapsed: value,
      };
    case LayoutActionConstants.SET_SIDEBAR_WIDTH:
      return {
        ...state,
        sidebarWidth: action.payload,
      };
    case LayoutActionConstants.TOGGLE_THEME:
      const theme = action.payload != null ? action.payload : 'dark';
      return {
        theme,
        ...state,
      };
    default:
      return state;
  }
};
