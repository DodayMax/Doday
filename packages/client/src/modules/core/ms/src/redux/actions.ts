import { AnyAction } from 'redux';
import {
  ModuleObject,
  ModuleType,
  ModuleSysname,
  EntityConfig,
} from '@doday/lib';

export enum ModuleSystemActionConstants {
  LOAD_MODULE = '[ms] LOAD_MODULE',
  LOAD_MODULES = '[ms] LOAD_MODULES',
  ADD_MODULE = '[ms] ADD_MODULE',
  ADD_ENTITIES = '[ms] ADD_ENTITIES',
}

export interface LoadModuleAction extends AnyAction {
  type: ModuleSystemActionConstants.LOAD_MODULE;
  payload: {
    sysname: ModuleSysname;
    type: ModuleType;
  };
}

export interface LoadModulesAction extends AnyAction {
  type: ModuleSystemActionConstants.LOAD_MODULES;
  payload: {
    type: ModuleType;
    sysname: ModuleSysname;
  }[];
}

export interface AddModuleAction extends AnyAction {
  type: ModuleSystemActionConstants.ADD_MODULE;
  payload: {
    module: ModuleObject;
    type: ModuleType;
  };
}

export interface AddEntitiesAction extends AnyAction {
  type: ModuleSystemActionConstants.ADD_ENTITIES;
  payload: EntityConfig | EntityConfig[];
}

/**
 * Load new single module
 *
 * @export
 * @returns {LoadModuleAction}
 */
export function loadModuleActionCreator(payload: {
  sysname: ModuleSysname;
  type: ModuleType;
}): LoadModuleAction {
  return {
    type: ModuleSystemActionConstants.LOAD_MODULE,
    payload,
  };
}

/**
 * Load new modules
 *
 * @export
 * @returns {LoadModulesAction}
 */
export function loadModulesActionCreator(
  payload: {
    sysname: ModuleSysname;
    type: ModuleType;
  }[]
): LoadModulesAction {
  return {
    type: ModuleSystemActionConstants.LOAD_MODULES,
    payload,
  };
}

/**
 * Add new module (loaded or loading)
 *
 * @export
 * @returns {AddModuleAction}
 */
export function addModuleActionCreator(payload: {
  module: ModuleObject;
  type: ModuleType;
}): AddModuleAction {
  return {
    type: ModuleSystemActionConstants.ADD_MODULE,
    payload,
  };
}

/**
 * Add new entities provided by modules
 *
 * @export
 * @returns {AddEntitiesAction}
 */
export function addEntitiesActionCreator(
  payload: EntityConfig | EntityConfig[]
): AddEntitiesAction {
  return {
    type: ModuleSystemActionConstants.ADD_ENTITIES,
    payload,
  };
}

/**
 * Export all action types for reducers
 */

export type ModuleSystemActionTypes =
  | AddModuleAction
  | LoadModuleAction
  | LoadModulesAction
  | AddEntitiesAction;
