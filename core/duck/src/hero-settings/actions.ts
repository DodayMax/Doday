import { AnyAction } from 'redux';

export enum HeroSettingsActionConstants {
  TOGGLE_DRAWER = '[heroSettings] TOGGLE_DRAWER',
  TOGGLE_DODAY_APP = '[heroSettings] TOGGLE_DODAY_APP',
  TOGGLE_THEME = '[heroSettings] TOGGLE_THEME',
}

/**
 * Toggle drawer
 *
 * @export
 * @returns {ToggleDrawerAction}
 */
function toggleDrawerActionCreator(value?: boolean): ToggleDrawerAction {
  return {
    type: HeroSettingsActionConstants.TOGGLE_DRAWER,
    payload: value,
  };
}

/**
 * Toggle Doday app
 *
 * @export
 * @returns {ToggleDodayAppAction}
 */
function toggleDodayAppActionCreator(): ToggleDodayAppAction {
  return {
    type: HeroSettingsActionConstants.TOGGLE_DODAY_APP,
  };
}

/**
 * Toggle dark/light theme
 *
 * @export
 * @returns {ToggleThemeAction}
 */
function toggleThemeActionCreator(mode: 'dark' | 'light'): ToggleThemeAction {
  return {
    type: HeroSettingsActionConstants.TOGGLE_THEME,
    payload: mode,
  };
}

export default {
  toggleDrawerActionCreator,
  toggleDodayAppActionCreator,
  toggleThemeActionCreator,
};

/**
 * Define return types of actions
 */

export interface ToggleDrawerAction extends AnyAction {
  type: HeroSettingsActionConstants.TOGGLE_DRAWER;
  payload?: boolean;
}

export interface ToggleDodayAppAction extends AnyAction {
  type: HeroSettingsActionConstants.TOGGLE_DODAY_APP;
}

export interface ToggleThemeAction extends AnyAction {
  type: HeroSettingsActionConstants.TOGGLE_THEME;
  payload: 'light' | 'dark';
}

/**
 * Export all action types for reducers
 */

export type HeroSettingsActionTypes = ToggleDrawerAction | ToggleThemeAction;
