import { AnyAction } from 'redux';
import { ViewModule } from '@doday/lib';

export enum OKOActionConstants {
  REGISTER_MODULE = '[oko] REGISTER_MODULE',
  REGISTER_ENTITY = '[oko] REGISTER_ENTITY',
  REGISTER_SPOT = '[oko] REGISTER_SPOT',
  REGISTER_ROUTE = '[oko] REGISTER_ROUTE',
  SET_ACTIVE_MODULE = '[oko] SET_ACTIVE_MODULE',
}

/** Action types */

export interface RegisterModuleAction extends AnyAction {
  type: OKOActionConstants.REGISTER_MODULE;
  payload: ViewModule;
}

export interface SetActiveModuleAction extends AnyAction {
  type: OKOActionConstants.SET_ACTIVE_MODULE;
  payload: ViewModule;
}

/** Action creators */

/**
 * Register module in the system
 * @param payload ViewModule
 */
export function RegisterModuleActionCreator(
  payload: ViewModule
): RegisterModuleAction {
  return {
    type: OKOActionConstants.REGISTER_MODULE,
    payload,
  };
}

/** Export all action types for reducers */
export type OKOActionTypes = RegisterModuleAction;
