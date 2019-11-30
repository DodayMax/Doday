import { AnyAction } from 'redux';
import { Hero, Status } from '@doday/lib';

export enum AuthActionConstants {
  SET_AUTH_STATUS = '[auth] SET_AUTH_STATUS',
  SET_IS_AUTHENTICATED_STATUS = '[auth] SET_IS_AUTHENTICATED_STATUS',
  SIGN_IN_WITH_GOOGLE = '[auth] SIGN_IN_WITH_GOOGLE',
  LOGOUT = '[auth] LOGOUT',
  GET_CURRENT_HERO = '[auth] GET_CURRENT_HERO',
  SET_HERO = '[auth] SET_HERO',
}

/**
 * Define return types of actions
 */

export interface SetAuthStatusAction extends AnyAction {
  type: AuthActionConstants.SET_AUTH_STATUS;
  payload: Status;
}

export interface SetIsAuthenticatedStatusAction extends AnyAction {
  type: AuthActionConstants.SET_IS_AUTHENTICATED_STATUS;
  payload: boolean;
}

export interface SignInWithGoogleAction extends AnyAction {
  type: AuthActionConstants.SIGN_IN_WITH_GOOGLE;
}

export interface LogoutAction extends AnyAction {
  type: AuthActionConstants.LOGOUT;
}

export interface SetHeroAction extends AnyAction {
  type: AuthActionConstants.SET_HERO;
  payload: Hero;
}

export interface GetCurrentHeroAction extends AnyAction {
  type: AuthActionConstants.GET_CURRENT_HERO;
}

/**
 * Set auth status
 *
 * @export
 * @returns {SetAuthStatusAction}
 */
export const setAuthStatusActionCreator = (
  payload: Status
): SetAuthStatusAction => {
  return {
    payload,
    type: AuthActionConstants.SET_AUTH_STATUS,
  };
};

/**
 * Set isAuthenticated status
 *
 * @export
 * @returns {SetIsAuthenticatedStatusAction}
 */
export const setIsAuthenticatedStatusAction = (
  payload: boolean
): SetIsAuthenticatedStatusAction => {
  return {
    payload,
    type: AuthActionConstants.SET_IS_AUTHENTICATED_STATUS,
  };
};

/**
 * Auth with Google
 *
 * @export
 * @returns {SignInWithGoogleAction}
 */
export const signInWithGoogleActionCreator = (): SignInWithGoogleAction => {
  return {
    type: AuthActionConstants.SIGN_IN_WITH_GOOGLE,
  };
};

/**
 * Logout
 *
 * @export
 * @returns {LogoutAction}
 */
export const logoutActionCreator = (): LogoutAction => {
  return {
    type: AuthActionConstants.LOGOUT,
  };
};

/**
 * Set Hero to store
 *
 * @export
 * @returns {SetHeroAction}
 */
export function setHeroActionCreator(hero: Hero): SetHeroAction {
  return {
    type: AuthActionConstants.SET_HERO,
    payload: hero,
  };
}

/**
 * Get current Hero
 *
 * @export
 * @returns {GetCurrentHeroAction}
 */
export function getCurrentHeroActionCreator(): GetCurrentHeroAction {
  return {
    type: AuthActionConstants.GET_CURRENT_HERO,
  };
}

/**
 * Export all action types for reducers
 */

export type AuthActionTypes =
  | SetAuthStatusAction
  | SetIsAuthenticatedStatusAction
  | SignInWithGoogleAction
  | LogoutAction
  | SetHeroAction
  | GetCurrentHeroAction;
