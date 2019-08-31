import { AnyAction } from 'redux';
import { Resource, DodayLike, ProgressLike } from '@doday/lib';

export enum DodayDetailsActionConstants {
  SET_LOADING_STATE = '[doday-details] SET_LOADING_STATE',
  FETCH_SELECTED_DODAY = '[doday-details] FETCH_SELECTED_DODAY',
  FETCH_SELECTED_PROGRESS = '[doday-details] FETCH_SELECTED_PROGRESS',
  SET_SELECTED_DODAY = '[doday-details] SET_SELECTED_DODAY',
  UPDATE_SELECTED_DODAY = '[doday-details] UPDATE_SELECTED_DODAY',
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
function setDodayDetailsLoadingStateActionCreator(
  state: boolean
): SetDodayDetailsLoadingStateAction {
  return {
    type: DodayDetailsActionConstants.SET_LOADING_STATE,
    payload: state,
  };
}

/**
 * Select doday and show details page
 *
 * @export
 * @returns {FetchSelectedDodayAction}
 */
function fetchSelectedDodayActionCreator(
  did: string
): FetchSelectedDodayAction {
  return {
    type: DodayDetailsActionConstants.FETCH_SELECTED_DODAY,
    payload: did,
  };
}

/**
 * Select doday with progress node and show details page
 *
 * @export
 * @returns {FetchSelectedProgressAction}
 */
function fetchSelectedProgressActionCreator(
  did: string
): FetchSelectedProgressAction {
  return {
    type: DodayDetailsActionConstants.FETCH_SELECTED_PROGRESS,
    payload: did,
  };
}

/**
 * Set selected doday to store action
 *
 * @export
 * @returns {SetSelectedDodayAction}
 */
function setSelectedDodayActionCreator(
  progress: DodayLike
): SetSelectedDodayAction {
  return {
    type: DodayDetailsActionConstants.SET_SELECTED_DODAY,
    payload: progress,
  };
}

/**
 * Update selected doday optimistically or remove progress from
 * selected doday when undefined is passed
 *
 * @export
 * @returns {UpdateSelectedDodayAction}
 */
function updateSelectedDodayActionCreator(payload?: {
  doday?: Partial<DodayLike>;
  progress?: Partial<ProgressLike>;
  resource?: Resource;
}): UpdateSelectedDodayAction {
  return {
    type: DodayDetailsActionConstants.UPDATE_SELECTED_DODAY,
    payload,
  };
}

/**
 * Clear selected doday
 *
 * @export
 * @returns {ClearSelectedDodayAction}
 */
function clearSelectedDodayActionCreator(): ClearSelectedDodayAction {
  return {
    type: DodayDetailsActionConstants.CLEAR_SELECTED_DODAY,
  };
}

/**
 * Set dirty status when there are some updates
 * for selected doday
 *
 * @export
 * @returns {SetDirtyStatusAction}
 */
function setDirtyStatusActionCreator(status: boolean): SetDirtyStatusAction {
  return {
    type: DodayDetailsActionConstants.SET_DIRTY_STATUS,
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
function requestForSetUpdatesActionCreator(
  progress?: Partial<ProgressLike>
): RequestForSetUpdatesAction {
  return {
    type: DodayDetailsActionConstants.REQUEST_FOR_SET_UPDATES,
    payload: {
      progress,
    },
  };
}

/**
 * Set updates for selected doday after requestForSetUpdates was called
 *
 * @export
 * @returns {SetUpdatesForSelectedDodayAction}
 */
function setUpdatesForSelectedDodayActionCreator(
  updates: Partial<ProgressLike>
): SetUpdatesForSelectedDodayAction {
  return {
    type: DodayDetailsActionConstants.SET_UPDATES_FOR_SELECTED_DODAY,
    payload: updates,
  };
}

/**
 * Clear all updates and dirty status for selected doday
 *
 * @export
 * @returns {ClearDodayDetailsDirtyStuffAction}
 */
function clearDodayDetailsDirtyStuffActionCreator(): ClearDodayDetailsDirtyStuffAction {
  return {
    type: DodayDetailsActionConstants.CLEAR_DIRTY_STUFF,
  };
}

export default {
  setDodayDetailsLoadingStateActionCreator,
  fetchSelectedDodayActionCreator,
  setSelectedDodayActionCreator,
  updateSelectedDodayActionCreator,
  fetchSelectedProgressActionCreator,
  setDirtyStatusActionCreator,
  setUpdatesForSelectedDodayActionCreator,
  requestForSetUpdatesActionCreator,
  clearDodayDetailsDirtyStuffActionCreator,
  clearSelectedDodayActionCreator,
};

/**
 * Define return types of actions
 */

export interface SetDodayDetailsLoadingStateAction extends AnyAction {
  type: DodayDetailsActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface FetchSelectedDodayAction extends AnyAction {
  type: DodayDetailsActionConstants.FETCH_SELECTED_DODAY;
  payload: string;
}

export interface FetchSelectedProgressAction extends AnyAction {
  type: DodayDetailsActionConstants.FETCH_SELECTED_PROGRESS;
  payload: string;
}

export interface SetSelectedDodayAction extends AnyAction {
  type: DodayDetailsActionConstants.SET_SELECTED_DODAY;
  payload: DodayLike;
}

export interface UpdateSelectedDodayAction extends AnyAction {
  type: DodayDetailsActionConstants.UPDATE_SELECTED_DODAY;
  payload?: {
    doday?: Partial<DodayLike>;
    progress?: Partial<ProgressLike>;
    resource?: Resource;
  };
}

export interface ClearSelectedDodayAction extends AnyAction {
  type: DodayDetailsActionConstants.CLEAR_SELECTED_DODAY;
}

export interface SetDirtyStatusAction extends AnyAction {
  type: DodayDetailsActionConstants.SET_DIRTY_STATUS;
  payload: boolean;
}

export interface SetUpdatesForSelectedDodayAction extends AnyAction {
  type: DodayDetailsActionConstants.SET_UPDATES_FOR_SELECTED_DODAY;
  payload: Partial<ProgressLike>;
}

export interface RequestForSetUpdatesAction extends AnyAction {
  type: DodayDetailsActionConstants.REQUEST_FOR_SET_UPDATES;
  payload?: {
    progress: Partial<ProgressLike> | undefined;
  };
}

export interface ClearDodayDetailsDirtyStuffAction extends AnyAction {
  type: DodayDetailsActionConstants.CLEAR_DIRTY_STUFF;
}

/**
 * Export all action types for reducers
 */

export type DodayDetailsActionTypes =
  | SetDodayDetailsLoadingStateAction
  | FetchSelectedDodayAction
  | FetchSelectedProgressAction
  | UpdateSelectedDodayAction
  | SetSelectedDodayAction
  | SetDirtyStatusAction
  | SetUpdatesForSelectedDodayAction
  | RequestForSetUpdatesAction
  | ClearDodayDetailsDirtyStuffAction
  | ClearSelectedDodayAction;
