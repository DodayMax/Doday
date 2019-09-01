import { AnyAction } from 'redux';
import { Hero, ToolBeacon, ShopTool } from '@doday/lib';

export enum AuthActionConstants {
  FETCH_HERO = '[auth] FETCH_HERO',
  SET_HERO = '[auth] SET_HERO',
  LOAD_HERO_TOOLS = '[auth] LOAD_HERO_TOOLS',
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
 * Load Hero tools modules
 *
 * @export
 * @returns {LoadHeroToolsAction}
 */
function loadHeroToolsActionCreator(
  shopTools: ShopTool[]
): LoadHeroToolsAction {
  return {
    type: AuthActionConstants.LOAD_HERO_TOOLS,
    payload: shopTools,
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
  loadHeroToolsActionCreator,
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

export interface LoadHeroToolsAction extends AnyAction {
  type: AuthActionConstants.LOAD_HERO_TOOLS;
  payload: ShopTool[];
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
  | LoadHeroToolsAction
  | SetActiveToolBeaconsAction;
