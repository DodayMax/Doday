import { AnyAction } from 'redux';

export enum ActionConstants {
  UPDATE_AUTHENTICATED_STATUS = '[auth] UPDATE_AUTHENTICATED_STATUS',
  SET_AUTHENTICATED_STATUS = '[auth] SET_AUTHENTICATED_STATUS',
}

/**
 * Update authenticated status
 *
 * @export
 * @returns {UpdateAuthenticatedStatus}
 */
export function updateAuthenticatedStatus(): UpdateAuthenticatedStatus {
  return {
    type: ActionConstants.UPDATE_AUTHENTICATED_STATUS,
  };
}

/**
 * Set authenticated status
 *
 * @export
 * @returns {SetAuthenticatedStatus}
 */
export function setAuthenticatedStatus(status: boolean): SetAuthenticatedStatus {
  return {
    type: ActionConstants.SET_AUTHENTICATED_STATUS,
    payload: status,
  };
}

/**
 * Define return types of actions
 */

export interface SetAuthenticatedStatus extends AnyAction {
  type: ActionConstants.SET_AUTHENTICATED_STATUS;
}

export interface UpdateAuthenticatedStatus extends AnyAction {
  type: ActionConstants.UPDATE_AUTHENTICATED_STATUS;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = SetAuthenticatedStatus
  | UpdateAuthenticatedStatus;