import { AnyAction } from 'redux';
import { Doday } from '@root/lib/common-interfaces';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-app] SET_LOADING_STATE',
  CHANGE_PATH = '[doday-app] CHANGE_PATH',
  PUSH_TO_NAV_STACK = '[doday-app] PUSH_TO_NAV_STACK',
  POP_FROM_NAV_STACK = '[doday-app] POP_FROM_NAV_STACK',
  CHANGE_DATE = '[heroSettings] CHANGE_DATE',
  FETCH_DODAYS_FOR_DATE = '[doday-app] FETCH_DODAYS_FOR_DATE',
  SET_DODAYS_FOR_DATE = '[doday-app] SET_DODAYS_FOR_DATE',
  SET_DODAYS_BADGE_FOR_TODAY = '[doday-app] SET_DODAYS_BADGE_FOR_TODAY',
}

/**
 * Set loading state for doday-app
 *
 * @export
 * @returns {SetLoadingState}
 */
export function setLoadingState(value: boolean): SetLoadingState {
  return {
    type: ActionConstants.SET_LOADING_STATE,
    payload: value,
  };
}

/**
 * Go to path
 *
 * @export
 * @returns {ChangePathAction}
 */
export function changePath(path: string): ChangePathAction {
  return {
    type: ActionConstants.CHANGE_PATH,
    payload: path,
  };
}

/**
 * Push Doday with children to navigation stack
 *
 * @export
 * @returns {PushToNavigationStackAction}
 */
export function pushToNavStack(doday: Doday): PushToNavigationStackAction {
  return {
    type: ActionConstants.PUSH_TO_NAV_STACK,
    payload: doday,
  };
}

/**
 * Pop from navigation stack
 *
 * @export
 * @returns {PopFromNavigationStackAction}
 */
export function popFromNavStack(): PopFromNavigationStackAction {
  return {
    type: ActionConstants.POP_FROM_NAV_STACK,
  };
}

/**
 * Change date in doday app today section
 *
 * @export
 * @returns {ChangeDateAction}
 */
export function changeDate(date: Date): ChangeDateAction {
  return {
    type: ActionConstants.CHANGE_DATE,
    payload: date,
  };
}

/**
 * Fetch dodays for chosen date
 *
 * @export
 * @returns {FetchDodayForDate}
 */
export function fetchDodaysForDate(): FetchDodayForDate {
  return {
    type: ActionConstants.FETCH_DODAYS_FOR_DATE,
  };
}

/**
 * Set dodays for chosen date to redux store
 *
 * @export
 * @returns {SetDodaysForDate}
 */
export function setDodaysForDate(dodays: Doday[]): SetDodaysForDate {
  return {
    type: ActionConstants.SET_DODAYS_FOR_DATE,
    payload: dodays,
  };
}

/**
 * Set dodays badge for today
 *
 * @export
 * @returns {SetDodaysBadgeForToday}
 */
export function setDodaysBadgeForToday(value: number): SetDodaysBadgeForToday {
  return {
    type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
    payload: value,
  };
}

/**
 * Define return types of actions
 */

export interface SetLoadingState extends AnyAction {
  type: ActionConstants.SET_LOADING_STATE;
  payload: boolean,
}

export interface ChangePathAction extends AnyAction {
  type: ActionConstants.CHANGE_PATH;
  payload: string;
}

export interface PushToNavigationStackAction extends AnyAction {
  type: ActionConstants.PUSH_TO_NAV_STACK;
  payload: Doday,
}

export interface PopFromNavigationStackAction extends AnyAction {
  type: ActionConstants.POP_FROM_NAV_STACK;
}

export interface ChangeDateAction extends AnyAction {
  type: ActionConstants.CHANGE_DATE;
  payload: Date;
}

export interface FetchDodayForDate extends AnyAction {
  type: ActionConstants.FETCH_DODAYS_FOR_DATE;
}

export interface SetDodaysForDate extends AnyAction {
  type: ActionConstants.SET_DODAYS_FOR_DATE;
  payload: Doday[],
}

export interface SetDodaysBadgeForToday extends AnyAction {
  type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY;
  payload: number,
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = ChangePathAction
  | SetLoadingState
  | PushToNavigationStackAction
  | PopFromNavigationStackAction
  | ChangeDateAction
  | FetchDodayForDate
  | SetDodaysForDate
  | SetDodaysBadgeForToday;