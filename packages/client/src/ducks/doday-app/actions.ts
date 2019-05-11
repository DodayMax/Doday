import { AnyAction } from 'redux';
import { DodayLike } from '@root/lib/models/entities/common';
import { DodayAppQueryParams } from '@root/lib/common-interfaces';

export enum ActionConstants {
  FETCH_DODAYS_WITH_PROGRESS_FOR_DATE = '[dodays-app] FETCH_DODAYS_WITH_PROGRESS_FOR_DATE',
  SET_LOADING_STATE = '[doday-app] SET_LOADING_STATE',
  CHANGE_ROUTE = '[doday-app] CHANGE_ROUTE',
  SET_QUERY_PARAMS = '[doday-app] SET_QUERY_PARAMS',
  PUSH_TO_NAV_STACK = '[doday-app] PUSH_TO_NAV_STACK',
  PUSH_TO_NAV_STACK_BY_DID = '[doday-app] PUSH_TO_NAV_STACK_BY_DID',
  POP_FROM_NAV_STACK = '[doday-app] POP_FROM_NAV_STACK',
  SET_NAV_STACK = '[doday-app] SET_NAV_STACK',
  CLEAR_NAV_STACK = '[doday-app] CLEAR_NAV_STACK',
  CHANGE_DATE = '[heroSettings] CHANGE_DATE',
  SET_DODAYS = '[doday-app] SET_DODAYS',
  SET_COMPLETED_DODAYS = '[doday-app] SET_COMPLETED_DODAYS',
  SET_DODAYS_BADGE_FOR_TODAY = '[doday-app] SET_DODAYS_BADGE_FOR_TODAY',
  PLAN_OUT = '[doday-app] PLAN_OUT',
}

/**
 * Fetch dodays with progress nodes with query params
 *
 * @export
 * @returns {FetchDodaysWithProgressForDateAction}
 */
export function fetchDodaysWithProgressForDateActionCreator(
  date?: Date
): FetchDodaysWithProgressForDateAction {
  return {
    type: ActionConstants.FETCH_DODAYS_WITH_PROGRESS_FOR_DATE,
    payload: date,
  };
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
 * Clear nav stack
 *
 * @export
 * @returns {ClearNavStackAction}
 */
export function clearNavStackActionCreator(): ClearNavStackAction {
  return {
    type: ActionConstants.CLEAR_NAV_STACK,
  };
}

/**
 * Push Goal to navigation stack by its DID
 *
 * @export
 * @returns {PushToNavigationStackByDIDAction}
 */
export function pushToNavStackByDIDActionCreator(
  did: string
): PushToNavigationStackByDIDAction {
  return {
    type: ActionConstants.PUSH_TO_NAV_STACK_BY_DID,
    payload: did,
  };
}

/**
 * Pop from navigation stack
 *
 * @export
 * @returns {PopFromNavigationStackAction}
 */
export function popFromNavigationStackActionCreator(): PopFromNavigationStackAction {
  return {
    type: ActionConstants.POP_FROM_NAV_STACK,
  };
}

/**
 * Change selected date in doday app today section
 *
 * @export
 * @returns {ChangeDodayAppDateAction}
 */
export function changeDodayAppDateActionCreator(
  date: Date
): ChangeDodayAppDateAction {
  return {
    type: ActionConstants.CHANGE_DATE,
    payload: date,
  };
}

/**
 * Set dodays for chosen date to redux store
 *
 * @export
 * @returns {SetDodaysAction}
 */
export function setDodaysActionCreator(dodays: DodayLike[]): SetDodaysAction {
  return {
    type: ActionConstants.SET_DODAYS,
    payload: dodays,
  };
}

/**
 * Set completed dodays for chosen date to redux store
 *
 * @export
 * @returns {SetCompletedDodaysAction}
 */
export function setCompletedDodaysActionCreator(
  dodays: DodayLike[]
): SetCompletedDodaysAction {
  return {
    type: ActionConstants.SET_COMPLETED_DODAYS,
    payload: dodays,
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

/**
 * Plan out overloading dodays to next days action creator
 *
 * @export
 * @returns {PlanOutAction}
 */
export function planOutActionCreator(date: number): PlanOutAction {
  return {
    type: ActionConstants.PLAN_OUT,
    payload: date,
  };
}

export const actionCreators = {
  fetchDodaysWithProgressForDateActionCreator,
  setDodayAppLoadingStateActionCreator,
  changeDodayAppRouteActionCreator,
  setDodayAppQueryParamsActionCreator,
  clearNavStackActionCreator,
  popFromNavigationStackActionCreator,
  pushToNavStackByDIDActionCreator,
  changeDodayAppDateActionCreator,
  setDodaysActionCreator,
  setCompletedDodaysActionCreator,
  setDodaysBadgeForTodayActionCreator,
  planOutActionCreator,
};

/**
 * Define return types of actions
 */

export interface FetchDodaysWithProgressForDateAction extends AnyAction {
  type: ActionConstants.FETCH_DODAYS_WITH_PROGRESS_FOR_DATE;
  payload?: Date;
}

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

export interface SetDodaysAction extends AnyAction {
  type: ActionConstants.SET_DODAYS;
  payload: DodayLike[];
}

export interface SetCompletedDodaysAction extends AnyAction {
  type: ActionConstants.SET_COMPLETED_DODAYS;
  payload: DodayLike[];
}

export interface PushToNavigationStackByDIDAction extends AnyAction {
  type: ActionConstants.PUSH_TO_NAV_STACK_BY_DID;
  payload: string;
}

export interface PopFromNavigationStackAction extends AnyAction {
  type: ActionConstants.POP_FROM_NAV_STACK;
}

export interface ChangeDodayAppDateAction extends AnyAction {
  type: ActionConstants.CHANGE_DATE;
  payload: Date;
}

export interface SetDodaysBadgeForTodayAction extends AnyAction {
  type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY;
  payload: number;
}

export interface ClearNavStackAction extends AnyAction {
  type: ActionConstants.CLEAR_NAV_STACK;
}

export interface PlanOutAction extends AnyAction {
  type: ActionConstants.PLAN_OUT;
  payload: number;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetDodayAppLoadingStateAction
  | SetDodaysAction
  | ChangeDodayAppRouteAction
  | SetDodayAppQueryParamsAction
  | SetCompletedDodaysAction
  | PushToNavigationStackByDIDAction
  | PopFromNavigationStackAction
  | ClearNavStackAction
  | ChangeDodayAppDateAction
  | SetDodaysBadgeForTodayAction;
