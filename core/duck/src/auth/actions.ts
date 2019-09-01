import { AnyAction } from 'redux';
import { Hero, ToolBeacon } from '@doday/lib';

export enum AuthActionConstants {
  FETCH_HERO = '[auth] FETCH_HERO',
  SET_HERO = '[auth] SET_HERO',
  SET_ACTIVE_TOOL_BEACONS = '[auth] SET_ACTIVE_TOOL_BEACONS',
  ADD_ACTIVE_TOOL_BEACON = '[auth] ADD_ACTIVE_TOOL_BEACON',
}

/**
 * Fetch Hero node
 *
 * @export
 * @returns {FetchHeroAction}
 */
function fetchHeroActionCreator(): FetchHeroAction {
  return {
    type: AuthActionConstants.FETCH_HERO,
  };
}

/**
 * Set Hero to store
 *
 * @export
 * @returns {SetHeroAction}
 */
function setHeroActionCreator(hero: Hero): SetHeroAction {
  return {
    type: AuthActionConstants.SET_HERO,
    payload: hero,
  };
}

/**
 * Filter tools accordingly to the Hero's active tools and
 * set they to store
 *
 * @export
 * @returns {SetActiveToolBeaconsAction}
 */
function setActiveToolBeaconsActionCreator(tools: {
  [key: string]: ToolBeacon;
}): SetActiveToolBeaconsAction {
  return {
    type: AuthActionConstants.SET_ACTIVE_TOOL_BEACONS,
    payload: tools,
  };
}

/**
 * Add active tool
 *
 * @export
 * @returns {AddActiveToolBeaconAction}
 */
function addActiveToolBeaconActionCreator(
  tool: ToolBeacon
): AddActiveToolBeaconAction {
  return {
    type: AuthActionConstants.ADD_ACTIVE_TOOL_BEACON,
    payload: tool,
  };
}

export default {
  fetchHeroActionCreator,
  setHeroActionCreator,
  setActiveToolBeaconsActionCreator,
  addActiveToolBeaconActionCreator,
};

/**
 * Define return types of actions
 */

export interface FetchHeroAction extends AnyAction {
  type: AuthActionConstants.FETCH_HERO;
}

export interface SetHeroAction extends AnyAction {
  type: AuthActionConstants.SET_HERO;
  payload: Hero;
}

export interface SetActiveToolBeaconsAction extends AnyAction {
  type: AuthActionConstants.SET_ACTIVE_TOOL_BEACONS;
  payload: { [key: string]: ToolBeacon };
}

export interface AddActiveToolBeaconAction extends AnyAction {
  type: AuthActionConstants.ADD_ACTIVE_TOOL_BEACON;
  payload: ToolBeacon;
}

/**
 * Export all action types for reducers
 */

export type AuthActionTypes =
  | FetchHeroAction
  | SetHeroAction
  | SetActiveToolBeaconsAction
  | AddActiveToolBeaconAction;
