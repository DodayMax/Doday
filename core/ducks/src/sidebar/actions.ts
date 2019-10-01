import { AnyAction } from 'redux';
import { SidebarQueryParams } from '@doday/lib';

export enum SidebarActionConstants {
  SET_LOADING_STATE = '[sidebar] SET_LOADING_STATE',
  CHANGE_ROUTE = '[sidebar] CHANGE_ROUTE',
  SET_QUERY_PARAMS = '[sidebar] SET_QUERY_PARAMS',
  SET_DODAYS_BADGE_FOR_TODAY = '[sidebar] SET_DODAYS_BADGE_FOR_TODAY',
}

/**
 * Set loading state for doday-app
 *
 * @export
 * @returns {SetSidebarLoadingStateAction}
 */
export function setSidebarLoadingStateActionCreator(
  value: boolean
): SetSidebarLoadingStateAction {
  return {
    type: SidebarActionConstants.SET_LOADING_STATE,
    payload: value,
  };
}

/**
 * Change route for doday app
 *
 * @export
 * @returns {ChangeSidebarRouteAction}
 */
export function changeSidebarRouteActionCreator(
  route: string
): ChangeSidebarRouteAction {
  return {
    type: SidebarActionConstants.CHANGE_ROUTE,
    payload: route,
  };
}

/**
 * Set query params for doday app route
 *
 * @export
 * @returns {SetSidebarQueryParamsAction}
 */
export function setSidebarQueryParamsActionCreator(
  params: SidebarQueryParams
): SetSidebarQueryParamsAction {
  return {
    type: SidebarActionConstants.SET_QUERY_PARAMS,
    payload: params,
  };
}

/**
 * Set dodays badge for today
 *
 * @export
 * @returns {SetDodaysBadgeForTodayAction}
 */
export function setDodaysBadgeForTodayActionCreator(
  value: number
): SetDodaysBadgeForTodayAction {
  return {
    type: SidebarActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
    payload: value,
  };
}

export default {
  setSidebarLoadingStateActionCreator,
  changeSidebarRouteActionCreator,
  setSidebarQueryParamsActionCreator,
  setDodaysBadgeForTodayActionCreator,
};

export interface SetSidebarLoadingStateAction extends AnyAction {
  type: SidebarActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface ChangeSidebarRouteAction extends AnyAction {
  type: SidebarActionConstants.CHANGE_ROUTE;
  payload: string;
}

export interface SetSidebarQueryParamsAction extends AnyAction {
  type: SidebarActionConstants.SET_QUERY_PARAMS;
  payload: SidebarQueryParams;
}

export interface SetDodaysBadgeForTodayAction extends AnyAction {
  type: SidebarActionConstants.SET_DODAYS_BADGE_FOR_TODAY;
  payload: number;
}

/**
 * Export all action types for reducers
 */

export type SidebarActionTypes =
  | SetSidebarLoadingStateAction
  | ChangeSidebarRouteAction
  | SetSidebarQueryParamsAction
  | SetDodaysBadgeForTodayAction;
