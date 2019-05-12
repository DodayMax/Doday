import { AnyAction } from 'redux';
import {
  DodayLike,
  SerializedDodayLike,
  SerializedProgressLike,
  ProgressLike,
} from '@root/lib/models/entities/common';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-details] SET_LOADING_STATE',
  FETCH_SELECTED_DODAY = '[doday-details] FETCH_SELECTED_DODAY',
  FETCH_SELECTED_PROGRESS = '[doday-details] FETCH_SELECTED_PROGRESS',
  FETCH_SELECTED_GOAL = '[doday-details] FETCH_SELECTED_GOAL',
  SET_SELECTED_DODAY = '[doday-details] SET_SELECTED_DODAY',
  SET_SELECTED_GOAL = '[doday-details] SET_SELECTED_GOAL',
  UPDATE_SELECTED_DODAY_PROGRESS = '[doday-details] UPDATE_SELECTED_DODAY_PROGRESS',
  CLEAR_SELECTED_DODAY = '[doday-details] CLEAR_SELECTED_DODAY',
  SET_DIRTY_STATUS = '[doday-details] SET_DIRTY_STATUS',
  REQUEST_FOR_SET_UPDATES = '[doday-details] REQUEST_FOR_SET_UPDATES',
  SET_UPDATES_FOR_SELECTED_DODAY = '[doday-details] SET_UPDATES_FOR_SELECTED_DODAY',
  CLEAR_DIRTY_STUFF = '[doday-details] CLEAR_DIRTY_STUFF',
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
 * Select doday with progress node and show details page
 *
 * @export
 * @returns {FetchSelectedProgressAction}
 */
export function fetchSelectedProgressActionCreator(
  did: string
): FetchSelectedProgressAction {
  return {
    type: ActionConstants.FETCH_SELECTED_PROGRESS,
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
  progress: DodayLike
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
 * @returns {UpdateSelectedDodayProgressAction}
 */
export function updateSelectedDodayProgressActionCreator(
  did: string,
  updates: Partial<ProgressLike>
): UpdateSelectedDodayProgressAction {
  return {
    type: ActionConstants.UPDATE_SELECTED_DODAY_PROGRESS,
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
 * Set dirty status when there are some updates
 * for selected doday
 *
 * @export
 * @returns {SetDirtyStatusAction}
 */
export function setDirtyStatusActionCreator(
  status: boolean
): SetDirtyStatusAction {
  return {
    type: ActionConstants.SET_DIRTY_STATUS,
    payload: status,
  };
}

/**
 * Request for set updates to store
 * Needed for set updates to store in saga and then
 * set dirty status
 *
 * @export
 * @returns {RequestForSetUpdatesAction}
 */
export function requestForSetUpdatesActionCreator(
  updates: Partial<SerializedProgressLike>
): RequestForSetUpdatesAction {
  return {
    type: ActionConstants.REQUEST_FOR_SET_UPDATES,
    payload: updates,
  };
}

/**
 * Set updates for selected doday to store
 *
 * @export
 * @returns {SetUpdatesForSelectedDodayAction}
 */
export function setUpdatesForSelectedDodayActionCreator(
  updates: Partial<SerializedDodayLike>
): SetUpdatesForSelectedDodayAction {
  return {
    type: ActionConstants.SET_UPDATES_FOR_SELECTED_DODAY,
    payload: updates,
  };
}

/**
 * Clear all updates and dirty status for selected doday
 *
 * @export
 * @returns {ClearDirtyStuffAction}
 */
export function clearDirtyStuffActionCreator(): ClearDirtyStuffAction {
  return {
    type: ActionConstants.CLEAR_DIRTY_STUFF,
  };
}

export const actionCreators = {
  setDodayDetailsLoadingStateActionCreator,
  fetchSelectedDodayActionCreator,
  setSelectedDodayActionCreator,
  fetchSelectedProgressActionCreator,
  updateSelectedDodayProgressActionCreator,
  clearSelectedDodayActionCreator,
  setDirtyStatusActionCreator,
  requestForSetUpdatesActionCreator,
  setUpdatesForSelectedDodayActionCreator,
  clearDirtyStuffActionCreator,
};

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

export interface FetchSelectedProgressAction extends AnyAction {
  type: ActionConstants.FETCH_SELECTED_PROGRESS;
  payload: string;
}

export interface FetchSelectedGoalAction extends AnyAction {
  type: ActionConstants.FETCH_SELECTED_GOAL;
  payload: string;
}

export interface SetSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_SELECTED_DODAY;
  payload: DodayLike;
}

export interface UpdateSelectedDodayProgressAction extends AnyAction {
  type: ActionConstants.UPDATE_SELECTED_DODAY_PROGRESS;
  payload: {
    did: string;
    updates: Partial<ProgressLike>;
  };
}

export interface ClearSelectedDodayAction extends AnyAction {
  type: ActionConstants.CLEAR_SELECTED_DODAY;
}

export interface SetDirtyStatusAction extends AnyAction {
  type: ActionConstants.SET_DIRTY_STATUS;
  payload: boolean;
}

export interface SetUpdatesForSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_UPDATES_FOR_SELECTED_DODAY;
  payload: Partial<SerializedDodayLike>;
}

export interface RequestForSetUpdatesAction extends AnyAction {
  type: ActionConstants.REQUEST_FOR_SET_UPDATES;
  payload: Partial<SerializedProgressLike>;
}

export interface ClearDirtyStuffAction extends AnyAction {
  type: ActionConstants.CLEAR_DIRTY_STUFF;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetDodayDetailsLoadingStateAction
  | FetchSelectedDodayAction
  | FetchSelectedProgressAction
  | FetchSelectedGoalAction
  | SetSelectedDodayAction
  | UpdateSelectedDodayProgressAction
  | ClearSelectedDodayAction
  | SetDirtyStatusAction
  | RequestForSetUpdatesAction
  | SetUpdatesForSelectedDodayAction
  | ClearDirtyStuffAction;
