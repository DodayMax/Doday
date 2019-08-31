import { AnyAction } from 'redux';
import { DodayAppQueryParams } from '@doday/lib';

export enum DodayAppActionConstants {
  SET_LOADING_STATE = '[doday-app] SET_LOADING_STATE',
  CHANGE_ROUTE = '[doday-app] CHANGE_ROUTE',
  SET_QUERY_PARAMS = '[doday-app] SET_QUERY_PARAMS',
  SET_DODAYS_BADGE_FOR_TODAY = '[doday-app] SET_DODAYS_BADGE_FOR_TODAY',
}

/**
 * Set loading state for doday-app
 *
 * @export
 * @returns {SetDodayAppLoadingStateAction}
 */
function setDodayAppLoadingStateActionCreator(
  value: boolean
): SetDodayAppLoadingStateAction {
  return {
    type: DodayAppActionConstants.SET_LOADING_STATE,
    payload: value,
  };
}

/**
 * Change route for doday app
 *
 * @export
 * @returns {ChangeDodayAppRouteAction}
 */
function changeDodayAppRouteActionCreator(
  route: string
): ChangeDodayAppRouteAction {
  return {
    type: DodayAppActionConstants.CHANGE_ROUTE,
    payload: route,
  };
}

/**
 * Set query params for doday app route
 *
 * @export
 * @returns {SetDodayAppQueryParamsAction}
 */
function setDodayAppQueryParamsActionCreator(
  params: DodayAppQueryParams
): SetDodayAppQueryParamsAction {
  return {
    type: DodayAppActionConstants.SET_QUERY_PARAMS,
    payload: params,
  };
}

/**
 * Set dodays badge for today
 *
 * @export
 * @returns {SetDodaysBadgeForTodayAction}
 */
function setDodaysBadgeForTodayActionCreator(
  value: number
): SetDodaysBadgeForTodayAction {
  return {
    type: DodayAppActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
    payload: value,
  };
}

export default {
  setDodayAppLoadingStateActionCreator,
  changeDodayAppRouteActionCreator,
  setDodayAppQueryParamsActionCreator,
  setDodaysBadgeForTodayActionCreator,
};

export interface SetDodayAppLoadingStateAction extends AnyAction {
  type: DodayAppActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface ChangeDodayAppRouteAction extends AnyAction {
  type: DodayAppActionConstants.CHANGE_ROUTE;
  payload: string;
}

export interface SetDodayAppQueryParamsAction extends AnyAction {
  type: DodayAppActionConstants.SET_QUERY_PARAMS;
  payload: DodayAppQueryParams;
}

export interface SetDodaysBadgeForTodayAction extends AnyAction {
  type: DodayAppActionConstants.SET_DODAYS_BADGE_FOR_TODAY;
  payload: number;
}

/**
 * Export all action types for reducers
 */

export type DodayAppActionTypes =
  | SetDodayAppLoadingStateAction
  | ChangeDodayAppRouteAction
  | SetDodayAppQueryParamsAction
  | SetDodaysBadgeForTodayAction;
