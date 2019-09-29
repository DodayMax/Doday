import { AnyAction } from 'redux';

export enum HeroSettingsActionConstants {
  TOGGLE_DRAWER = '[heroSettings] TOGGLE_DRAWER',
  TOGGLE_SIDEBAR = '[heroSettings] TOGGLE_SIDEBAR',
  SET_SIDEBAR_WIDTH = '[heroSettings] SET_SIDEBAR_WIDTH',
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
 * Toggle sidebar
 *
 * @export
 * @returns {ToggleSidebarAction}
 */
function toggleSidebarActionCreator(): ToggleSidebarAction {
  return {
    type: HeroSettingsActionConstants.TOGGLE_SIDEBAR,
  };
}

/**
 * Set sidebar width
 *
 * @export
 * @returns {SetSidebarWidthAction}
 */
function toggleSidebarWidthActionCreator(value: number): SetSidebarWidthAction {
  return {
    type: HeroSettingsActionConstants.SET_SIDEBAR_WIDTH,
    payload: value <= 320 ? value : 320,
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
  toggleSidebarActionCreator,
  toggleSidebarWidthActionCreator,
  toggleThemeActionCreator,
};

/**
 * Define return types of actions
 */

export interface ToggleDrawerAction extends AnyAction {
  type: HeroSettingsActionConstants.TOGGLE_DRAWER;
  payload?: boolean;
}

export interface ToggleSidebarAction extends AnyAction {
  type: HeroSettingsActionConstants.TOGGLE_SIDEBAR;
}

export interface SetSidebarWidthAction extends AnyAction {
  type: HeroSettingsActionConstants.SET_SIDEBAR_WIDTH;
  payload: number;
}

export interface ToggleThemeAction extends AnyAction {
  type: HeroSettingsActionConstants.TOGGLE_THEME;
  payload: 'light' | 'dark';
}

/**
 * Export all action types for reducers
 */

export type HeroSettingsActionTypes =
  | ToggleDrawerAction
  | ToggleSidebarAction
  | SetSidebarWidthAction
  | ToggleThemeAction;
