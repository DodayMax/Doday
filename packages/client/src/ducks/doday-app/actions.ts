import { AnyAction } from 'redux';
import { Goal } from '@root/lib/models/entities/Goal';
import { Doday } from '@root/lib/models/entities/Doday';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-app] SET_LOADING_STATE',
  CHANGE_PATH = '[doday-app] CHANGE_PATH',
  TOGGLE_DODAY = '[doday-app] TOGGLE_DODAY',
  DELETE_DODAY = '[doday-app] DELETE_DODAY',
  PUSH_TO_NAV_STACK = '[doday-app] PUSH_TO_NAV_STACK',
  POP_FROM_NAV_STACK = '[doday-app] POP_FROM_NAV_STACK',
  CHANGE_DATE = '[heroSettings] CHANGE_DATE',
  FETCH_DODAYS_FOR_DATE = '[doday-app] FETCH_DODAYS_FOR_DATE',
  SET_DODAYS_FOR_DATE = '[doday-app] SET_DODAYS_FOR_DATE',
  SET_DODAYS_BADGE_FOR_TODAY = '[doday-app] SET_DODAYS_BADGE_FOR_TODAY',
  FETCH_ALL_GOALS = '[doday-app] FETCH_ALL_GOALS',
  SET_GOALS = '[doday-app] SET_GOALS',
  FETCH_SELECTED_DODAY = '[doday-app] FETCH_SELECTED_DODAY',
  SET_SELECTED_DODAY = '[doday-app] SET_SELECTED_DODAY',
  CLEAR_SELECTED_DODAY = '[doday-app] CLEAR_SELECTED_DODAY',
}

/**
 * Set loading state for doday-app
 *
 * @export
 * @returns {SetLoadingState}
 */
export function setAppLoadingState(value: boolean): SetLoadingState {
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
export function pushToNavStack(doday: Goal): PushToNavigationStackAction {
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
 * Toggle doday
 *
 * @export
 * @returns {ToggleDodayAction}
 */
export function toggleDoday(doday: Doday): ToggleDodayAction {
  return {
    type: ActionConstants.TOGGLE_DODAY,
    payload: doday,
  };
}

/**
 * Completely delete Doday from app and from created section
 *
 * @export
 * @returns {DeleteDodayAction}
 */
export function deleteDodayActionCreator(doday: Doday): DeleteDodayAction {
  return {
    type: ActionConstants.DELETE_DODAY,
    payload: doday,
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
 * Fetch all goals
 *
 * @export
 * @returns {FetchAllGoals}
 */
export function fetchAllGoals(): FetchAllGoals {
  return {
    type: ActionConstants.FETCH_ALL_GOALS,
  };
}

/**
 * Set goals to redux store
 *
 * @export
 * @returns {SetGoals}
 */
export function setGoals(goals: Goal[]): SetGoals {
  return {
    type: ActionConstants.SET_GOALS,
    payload: goals,
  };
}

/**
 * Select doday and show details page
 *
 * @export
 * @returns {FetchSelectedDodayAction}
 */
export function fetchSelectedDodayActionCreator(
  did: string
): FetchSelectedDodayAction {
  return {
    type: ActionConstants.FETCH_SELECTED_DODAY,
    payload: did,
  };
}

/**
 * Set selected doday to store action
 *
 * @export
 * @returns {SetSelectedDodayAction}
 */
export function SetSelectedDodayActionCreator(
  progress: Doday
): SetSelectedDodayAction {
  return {
    type: ActionConstants.SET_SELECTED_DODAY,
    payload: progress,
  };
}

/**
 * Clear selected doday
 *
 * @export
 * @returns {ClearSelectedDodayAction}
 */
export function clearSelectedDodayActionCreator(): ClearSelectedDodayAction {
  return {
    type: ActionConstants.CLEAR_SELECTED_DODAY,
  };
}

/**
 * Define return types of actions
 */

export interface SetLoadingState extends AnyAction {
  type: ActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface ChangePathAction extends AnyAction {
  type: ActionConstants.CHANGE_PATH;
  payload: string;
}

export interface PushToNavigationStackAction extends AnyAction {
  type: ActionConstants.PUSH_TO_NAV_STACK;
  payload: Goal;
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
  payload: Doday[];
}

export interface SetDodaysBadgeForToday extends AnyAction {
  type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY;
  payload: number;
}

export interface FetchAllGoals extends AnyAction {
  type: ActionConstants.FETCH_ALL_GOALS;
}

export interface SetGoals extends AnyAction {
  type: ActionConstants.SET_GOALS;
  payload: Goal[];
}

export interface ToggleDodayAction extends AnyAction {
  type: ActionConstants.TOGGLE_DODAY;
  payload: Doday;
}

export interface DeleteDodayAction extends AnyAction {
  type: ActionConstants.DELETE_DODAY;
  payload: Doday;
}

export interface FetchSelectedDodayAction extends AnyAction {
  type: ActionConstants.FETCH_SELECTED_DODAY;
  payload: string;
}

export interface SetSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_SELECTED_DODAY;
  payload: Doday;
}

export interface ClearSelectedDodayAction extends AnyAction {
  type: ActionConstants.CLEAR_SELECTED_DODAY;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | ChangePathAction
  | SetLoadingState
  | PushToNavigationStackAction
  | PopFromNavigationStackAction
  | ChangeDateAction
  | FetchDodayForDate
  | SetDodaysForDate
  | SetDodaysBadgeForToday
  | SetGoals
  | ToggleDodayAction
  | FetchSelectedDodayAction
  | SetSelectedDodayAction
  | ClearSelectedDodayAction;
