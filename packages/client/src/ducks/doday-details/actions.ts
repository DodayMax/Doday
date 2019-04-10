import { AnyAction } from 'redux';
import { Doday } from '@root/lib/models/entities/Doday';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-details] SET_LOADING_STATE',
  FETCH_SELECTED_DODAY = '[doday-app] FETCH_SELECTED_DODAY',
  SET_SELECTED_DODAY = '[doday-app] SET_SELECTED_DODAY',
  UPDATE_SELECTED_DODAY = '[doday-app] UPDATE_SELECTED_DODAY',
  CLEAR_SELECTED_DODAY = '[doday-app] CLEAR_SELECTED_DODAY',
}

/**
 * Toggle drawer
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

export interface SetSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_SELECTED_DODAY;
  payload: Doday;
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
  | SetSelectedDodayAction
  | UpdateSelectedDodayAction
  | ClearSelectedDodayAction;
