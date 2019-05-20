import { AnyAction } from 'redux';
import {
  DodayLike,
  ProgressLike,
  SerializedProgressLike,
} from '@root/tools/types';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-details] SET_LOADING_STATE',
  FETCH_SELECTED_DODAY = '[doday-details] FETCH_SELECTED_DODAY',
  FETCH_SELECTED_PROGRESS = '[doday-details] FETCH_SELECTED_PROGRESS',
  SET_SELECTED_DODAY = '[doday-details] SET_SELECTED_DODAY',
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
 * Update selected doday optimistically or remove progress from
 * selected doday when undefined is passed
 *
 * @export
 * @returns {UpdateSelectedDodayProgressAction}
 */
export function updateSelectedDodayProgressActionCreator(
  progress?: Partial<ProgressLike>
): UpdateSelectedDodayProgressAction {
  return {
    type: ActionConstants.UPDATE_SELECTED_DODAY_PROGRESS,
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
 * Needed for set updates to store in saga before
 * set dirty status
 *
 * @export
 * @returns {RequestForSetUpdatesAction}
 */
export function requestForSetUpdatesActionCreator(
  progress: Partial<SerializedProgressLike>,
  deserialize: (progress: SerializedProgressLike) => ProgressLike
): RequestForSetUpdatesAction {
  return {
    type: ActionConstants.REQUEST_FOR_SET_UPDATES,
    payload: {
      progress,
      deserialize,
    },
  };
}

/**
 * Set updates for selected doday after requestForSetUpdates was called
 *
 * @export
 * @returns {SetUpdatesForSelectedDodayAction}
 */
export function setUpdatesForSelectedDodayActionCreator(
  updates: Partial<ProgressLike>
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
 * @returns {ClearDodayDetailsDirtyStuffAction}
 */
export function clearDodayDetailsDirtyStuffActionCreator(): ClearDodayDetailsDirtyStuffAction {
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
  clearDodayDetailsDirtyStuffActionCreator,
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

export interface SetSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_SELECTED_DODAY;
  payload: DodayLike;
}

export interface UpdateSelectedDodayProgressAction extends AnyAction {
  type: ActionConstants.UPDATE_SELECTED_DODAY_PROGRESS;
  payload: Partial<ProgressLike>;
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
  payload: Partial<ProgressLike>;
}

export interface RequestForSetUpdatesAction extends AnyAction {
  type: ActionConstants.REQUEST_FOR_SET_UPDATES;
  payload: {
    progress: Partial<SerializedProgressLike>;
    deserialize: (progress: SerializedProgressLike) => ProgressLike;
  };
}

export interface ClearDodayDetailsDirtyStuffAction extends AnyAction {
  type: ActionConstants.CLEAR_DIRTY_STUFF;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetDodayDetailsLoadingStateAction
  | FetchSelectedDodayAction
  | FetchSelectedProgressAction
  | SetSelectedDodayAction
  | UpdateSelectedDodayProgressAction
  | ClearSelectedDodayAction
  | SetDirtyStatusAction
  | RequestForSetUpdatesAction
  | SetUpdatesForSelectedDodayAction
  | ClearDodayDetailsDirtyStuffAction;
