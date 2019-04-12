import { AnyAction } from 'redux';
import { Doday } from '@root/lib/models/entities/Doday';
import { Goal } from '@root/lib/models/entities/Goal';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-details] SET_LOADING_STATE',
  FETCH_SELECTED_DODAY = '[doday-app] FETCH_SELECTED_DODAY',
  FETCH_SELECTED_GOAL = '[doday-app] FETCH_SELECTED_GOAL',
  SET_SELECTED_DODAY = '[doday-app] SET_SELECTED_DODAY',
  SET_SELECTED_GOAL = '[doday-app] SET_SELECTED_GOAL',
  UPDATE_SELECTED_DODAY = '[doday-app] UPDATE_SELECTED_DODAY',
  CLEAR_SELECTED_DODAY = '[doday-app] CLEAR_SELECTED_DODAY',
}

/**
 * Set loading state for doday details peace of state
 *
 * @export
 * @returns {SetDodayDetailsLoadingStateAction}
 */
export function setDodayDetailsLoadingStateActionCreator(
  state: boolean
): SetDodayDetailsLoadingStateAction {
  return {
    type: ActionConstants.SET_LOADING_STATE,
    payload: state,
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
 * Select goal and set to the store
 *
 * @export
 * @returns {FetchSelectedGoalAction}
 */
export function fetchSelectedGoalActionCreator(
  did: string
): FetchSelectedGoalAction {
  return {
    type: ActionConstants.FETCH_SELECTED_GOAL,
    payload: did,
  };
}

/**
 * Set selected doday to store action
 *
 * @export
 * @returns {SetSelectedDodayAction}
 */
export function setSelectedDodayActionCreator(
  progress: Doday
): SetSelectedDodayAction {
  return {
    type: ActionConstants.SET_SELECTED_DODAY,
    payload: progress,
  };
}

/**
 * Set selected goal to store action
 *
 * @export
 * @returns {SetSelectedGoalAction}
 */
export function setSelectedGoalActionCreator(
  goal: Goal
): SetSelectedGoalAction {
  return {
    type: ActionConstants.SET_SELECTED_GOAL,
    payload: goal,
  };
}

/**
 * Update selected doday optimistically
 *
 * @export
 * @returns {UpdateSelectedDodayAction}
 */
export function updateSelectedDodayActionCreator(
  did: string,
  updates: Partial<Doday>
): UpdateSelectedDodayAction {
  return {
    type: ActionConstants.UPDATE_SELECTED_DODAY,
    payload: {
      did,
      updates,
    },
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

export interface SetDodayDetailsLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface FetchSelectedDodayAction extends AnyAction {
  type: ActionConstants.FETCH_SELECTED_DODAY;
  payload: string;
}

export interface FetchSelectedGoalAction extends AnyAction {
  type: ActionConstants.FETCH_SELECTED_GOAL;
  payload: string;
}

export interface SetSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_SELECTED_DODAY;
  payload: Doday;
}

export interface SetSelectedGoalAction extends AnyAction {
  type: ActionConstants.SET_SELECTED_GOAL;
  payload: Goal;
}

export interface UpdateSelectedDodayAction extends AnyAction {
  type: ActionConstants.UPDATE_SELECTED_DODAY;
  payload: {
    did: string;
    updates: Partial<Doday>;
  };
}

export interface ClearSelectedDodayAction extends AnyAction {
  type: ActionConstants.CLEAR_SELECTED_DODAY;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetDodayDetailsLoadingStateAction
  | FetchSelectedDodayAction
  | FetchSelectedGoalAction
  | SetSelectedDodayAction
  | SetSelectedGoalAction
  | UpdateSelectedDodayAction
  | ClearSelectedDodayAction;
