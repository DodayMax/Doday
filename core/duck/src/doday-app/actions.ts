import { AnyAction } from 'redux';
import { DodayAppQueryParams } from '@root/lib/common-interfaces';

export enum ActionConstants {
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
export function setDodayAppLoadingStateActionCreator(
  value: boolean
): SetDodayAppLoadingStateAction {
  return {
    type: ActionConstants.SET_LOADING_STATE,
    payload: value,
  };
}

/**
 * Change route for doday app
 *
 * @export
 * @returns {ChangeDodayAppRouteAction}
 */
export function changeDodayAppRouteActionCreator(
  route: string
): ChangeDodayAppRouteAction {
  return {
    type: ActionConstants.CHANGE_ROUTE,
    payload: route,
  };
}

/**
 * Set query params for doday app route
 *
 * @export
 * @returns {SetDodayAppQueryParamsAction}
 */
export function setDodayAppQueryParamsActionCreator(
  params: DodayAppQueryParams
): SetDodayAppQueryParamsAction {
  return {
    type: ActionConstants.SET_QUERY_PARAMS,
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
    type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
    payload: value,
  };
}

export const actionCreators = {
  setDodayAppLoadingStateActionCreator,
  changeDodayAppRouteActionCreator,
  setDodayAppQueryParamsActionCreator,
  setDodaysBadgeForTodayActionCreator,
};

export interface SetDodayAppLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface ChangeDodayAppRouteAction extends AnyAction {
  type: ActionConstants.CHANGE_ROUTE;
  payload: string;
}

export interface SetDodayAppQueryParamsAction extends AnyAction {
  type: ActionConstants.SET_QUERY_PARAMS;
  payload: DodayAppQueryParams;
}

export interface SetDodaysBadgeForTodayAction extends AnyAction {
  type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY;
  payload: number;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetDodayAppLoadingStateAction
  | ChangeDodayAppRouteAction
  | SetDodayAppQueryParamsAction
  | SetDodaysBadgeForTodayAction;
