import { AnyAction } from 'redux';

export enum LayoutActionConstants {
  TOGGLE_DRAWER = '[layout] TOGGLE_DRAWER',
  TOGGLE_SIDEBAR = '[layout] TOGGLE_SIDEBAR',
  SET_SIDEBAR_WIDTH = '[layout] SET_SIDEBAR_WIDTH',
  TOGGLE_THEME = '[layout] TOGGLE_THEME',
}

/**
 * Toggle drawer
 *
 * @export
 * @returns {ToggleDrawerAction}
 */
export function toggleDrawerActionCreator(value?: boolean): ToggleDrawerAction {
  return {
    type: LayoutActionConstants.TOGGLE_DRAWER,
    payload: value,
  };
}

/**
 * Toggle sidebar
 *
 * @export
 * @returns {ToggleSidebarAction}
 */
export function toggleSidebarActionCreator(): ToggleSidebarAction {
  return {
    type: LayoutActionConstants.TOGGLE_SIDEBAR,
  };
}

/**
 * Set sidebar width
 *
 * @export
 * @returns {SetSidebarWidthAction}
 */
export function toggleSidebarWidthActionCreator(
  value: number
): SetSidebarWidthAction {
  return {
    type: LayoutActionConstants.SET_SIDEBAR_WIDTH,
    payload: value <= 320 ? value : 320,
  };
}

/**
 * Toggle dark/light theme
 *
 * @export
 * @returns {ToggleThemeAction}
 */
export function toggleThemeActionCreator(
  mode: 'dark' | 'light'
): ToggleThemeAction {
  return {
    type: LayoutActionConstants.TOGGLE_THEME,
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
  type: LayoutActionConstants.TOGGLE_DRAWER;
  payload?: boolean;
}

export interface ToggleSidebarAction extends AnyAction {
  type: LayoutActionConstants.TOGGLE_SIDEBAR;
}

export interface SetSidebarWidthAction extends AnyAction {
  type: LayoutActionConstants.SET_SIDEBAR_WIDTH;
  payload: number;
}

export interface ToggleThemeAction extends AnyAction {
  type: LayoutActionConstants.TOGGLE_THEME;
  payload: 'light' | 'dark';
}

/**
 * Export all action types for reducers
 */

export type LayoutActionTypes =
  | ToggleDrawerAction
  | ToggleSidebarAction
  | SetSidebarWidthAction
  | ToggleThemeAction;
