import { AnyAction } from 'redux';
import { ModuleObject } from '@doday/lib';

export enum ModuleSystemActionConstants {
  ADD_MODULE = '[ms] ADD_MODULE',
}

/**
 * Store new modules (loaded or loading)
 *
 * @export
 * @returns {AddModuleAction}
 */
export function addModuleActionCreator(
  moduleObject: ModuleObject
): ModuleSystemActionTypes {
  return {
    type: ModuleSystemActionConstants.ADD_MODULE,
    payload: moduleObject,
  };
}

export default {
  addModuleActionCreator,
};

export interface AddModuleAction extends AnyAction {
  type: ModuleSystemActionConstants.ADD_MODULE;
  payload: ModuleObject;
}

/**
 * Export all action types for reducers
 */

export type ModuleSystemActionTypes = AddModuleAction;
