import { AnyAction } from 'redux';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { Goal } from '@root/lib/models/entities/Goal';

export enum ActionConstants {
  SET_LOADING_STATE = '[doday-details] SET_LOADING_STATE',
  FETCH_SELECTED_DODAY = '[doday-details] FETCH_SELECTED_DODAY',
  FETCH_SELECTED_DODAY_WITH_PROGRESS = '[doday-details] FETCH_SELECTED_DODAY_WITH_PROGRESS',
  FETCH_SELECTED_GOAL = '[doday-details] FETCH_SELECTED_GOAL',
  SET_SELECTED_DODAY = '[doday-details] SET_SELECTED_DODAY',
  SET_SELECTED_GOAL = '[doday-details] SET_SELECTED_GOAL',
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
 * @returns {FetchSelectedDodayWithProgressAction}
 */
export function fetchSelectedDodayWithProgressActionCreator(
  did: string
): FetchSelectedDodayWithProgressAction {
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
  updates: Partial<SerializedDoday>
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
  updates: Partial<SerializedDoday>
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

export interface FetchSelectedDodayWithProgressAction extends AnyAction {
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

export interface SetDirtyStatusAction extends AnyAction {
  type: ActionConstants.SET_DIRTY_STATUS;
  payload: boolean;
}

export interface SetUpdatesForSelectedDodayAction extends AnyAction {
  type: ActionConstants.SET_UPDATES_FOR_SELECTED_DODAY;
  payload: Partial<SerializedDoday>;
}

export interface RequestForSetUpdatesAction extends AnyAction {
  type: ActionConstants.REQUEST_FOR_SET_UPDATES;
  payload: Partial<SerializedDoday>;
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
  | FetchSelectedDodayWithProgressAction
  | FetchSelectedGoalAction
  | SetSelectedDodayAction
  | SetSelectedGoalAction
  | UpdateSelectedDodayAction
  | ClearSelectedDodayAction
  | SetDirtyStatusAction
  | RequestForSetUpdatesAction
  | SetUpdatesForSelectedDodayAction
  | ClearDirtyStuffAction;
