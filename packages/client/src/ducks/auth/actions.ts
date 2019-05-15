import { AnyAction } from 'redux';
import { Hero } from '@root/lib/models/entities/hero';
import { ToolBeacon } from '@root/tools/types';

export enum ActionConstants {
  FETCH_HERO = '[auth] FETCH_HERO',
  SET_HERO = '[auth] SET_HERO',
  SET_ACTIVE_TOOL_BEACONS = '[auth] SET_ACTIVE_TOOL_BEACONS',
}

/**
 * Fetch Hero
 *
 * @export
 * @returns {FetchHeroAction}
 */
export function fetchHero(): FetchHeroAction {
  return {
    type: ActionConstants.FETCH_HERO,
  };
}

/**
 * Set Hero
 *
 * @export
 * @returns {SetHeroAction}
 */
export function setHero(hero: Hero): SetHeroAction {
  return {
    type: ActionConstants.SET_HERO,
    payload: hero,
  };
}

/**
 * Set active tool beacons
 *
 * @export
 * @returns {SetActiveToolBeaconsAction}
 */
export function setActiveToolBeaconsActionCreator(
  tools: ToolBeacon[]
): SetActiveToolBeaconsAction {
  return {
    type: ActionConstants.SET_ACTIVE_TOOL_BEACONS,
    payload: tools,
  };
}

/**
 * Define return types of actions
 */

export interface FetchHeroAction extends AnyAction {
  type: ActionConstants.FETCH_HERO;
}

export interface SetHeroAction extends AnyAction {
  type: ActionConstants.SET_HERO;
  payload: Hero;
}

export interface SetActiveToolBeaconsAction extends AnyAction {
  type: ActionConstants.SET_ACTIVE_TOOL_BEACONS;
  payload: ToolBeacon[];
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | FetchHeroAction
  | SetHeroAction
  | SetActiveToolBeaconsAction;
