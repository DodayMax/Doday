import { AnyAction } from 'redux';
import { Hero } from '@root/lib/models/entities/hero';

export enum ActionConstants {
  FETCH_HERO = '[auth] FETCH_HERO',
  SET_HERO = '[auth] SET_HERO',
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
 * Define return types of actions
 */

export interface FetchHeroAction extends AnyAction {
  type: ActionConstants.FETCH_HERO;
}

export interface SetHeroAction extends AnyAction {
  type: ActionConstants.SET_HERO;
  payload: Hero;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = FetchHeroAction | SetHeroAction;
