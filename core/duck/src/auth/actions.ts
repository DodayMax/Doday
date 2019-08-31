import { AnyAction } from 'redux';
import { Hero, ToolBeacon } from '@doday/lib';

export enum AuthActionConstants {
  FETCH_HERO = '[auth] FETCH_HERO',
  SET_HERO = '[auth] SET_HERO',
  SET_ACTIVE_TOOL_BEACONS = '[auth] SET_ACTIVE_TOOL_BEACONS',
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
function setActiveToolBeaconsActionCreator(
  tools: ToolBeacon[]
): SetActiveToolBeaconsAction {
  return {
    type: AuthActionConstants.SET_ACTIVE_TOOL_BEACONS,
    payload: tools,
  };
}

export default {
  fetchHeroActionCreator,
  setHeroActionCreator,
  setActiveToolBeaconsActionCreator,
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
  payload: ToolBeacon[];
}

/**
 * Export all action types for reducers
 */

export type AuthActionTypes =
  | FetchHeroAction
  | SetHeroAction
  | SetActiveToolBeaconsAction;
