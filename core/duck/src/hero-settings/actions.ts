import { AnyAction } from 'redux';

export enum ActionConstants {
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
export function toggleDrawerActionCreator(value?: boolean): ToggleDrawerAction {
  return {
    type: ActionConstants.TOGGLE_DRAWER,
    payload: value,
  };
}

/**
 * Toggle Doday app
 *
 * @export
 * @returns {ToggleDodayAppAction}
 */
export function toggleDodayAppActionCreator(): ToggleDodayAppAction {
  return {
    type: ActionConstants.TOGGLE_DODAY_APP,
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
    type: ActionConstants.TOGGLE_THEME,
    payload: mode,
  };
}

export const actionCreators = {
  toggleDrawerActionCreator,
  toggleDodayAppActionCreator,
  toggleThemeActionCreator,
};

/**
 * Define return types of actions
 */

export interface ToggleDrawerAction extends AnyAction {
  type: ActionConstants.TOGGLE_DRAWER;
  payload?: boolean;
}

export interface ToggleDodayAppAction extends AnyAction {
  type: ActionConstants.TOGGLE_DODAY_APP;
}

export interface ToggleThemeAction extends AnyAction {
  type: ActionConstants.TOGGLE_THEME;
  payload: 'light' | 'dark';
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = ToggleDrawerAction | ToggleThemeAction;
