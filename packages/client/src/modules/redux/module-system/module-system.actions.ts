import { AnyAction } from 'redux';
import {
  ModuleSysname,
  DodayModule,
  SpotConfig,
  EntityConfig,
  RouteConfig,
} from '@doday/lib';

export enum ModuleSystemActionConstants {
  FETCH_ACTIVE_MODULES_FOR_HERO = '[module-system] FETCH_ACTIVE_MODULES_FOR_HERO',
  LOAD_MODULE = '[module-system] LOAD_MODULE',
  LOAD_MODULES = '[module-system] LOAD_MODULES',
  REGISTER_MODULE_BY_SYSNAME = '[module-system] REGISTER_MODULE_BY_SYSNAME',
  REGISTER_MODULE_BY_SPOT = '[module-system] REGISTER_MODULE_BY_SPOT',
  REGISTER_ENTITY = '[module-system] REGISTER_ENTITY',
  REGISTER_SPOT = '[module-system] REGISTER_SPOT',
  REGISTER_ROUTE = '[module-system] REGISTER_ROUTE',
}

/** Action types */

export interface FetchActiveModulesForHeroAction extends AnyAction {
  type: ModuleSystemActionConstants.FETCH_ACTIVE_MODULES_FOR_HERO;
}

export interface LoadModuleAction extends AnyAction {
  type: ModuleSystemActionConstants.LOAD_MODULE;
  payload: ModuleSysname;
}

export interface LoadModulesAction extends AnyAction {
  type: ModuleSystemActionConstants.LOAD_MODULES;
  payload: ModuleSysname[];
}

export interface RegisterModuleBySysnameAction extends AnyAction {
  type: ModuleSystemActionConstants.REGISTER_MODULE_BY_SYSNAME;
  payload: DodayModule;
}

export interface RegisterModuleBySpotAction extends AnyAction {
  type: ModuleSystemActionConstants.REGISTER_MODULE_BY_SPOT;
  payload: DodayModule;
}

export interface RegisterSpotAction extends AnyAction {
  type: ModuleSystemActionConstants.REGISTER_SPOT;
  payload: SpotConfig;
}

export interface RegisterEntityAction extends AnyAction {
  type: ModuleSystemActionConstants.REGISTER_ENTITY;
  payload: EntityConfig;
}

export interface RegisterRouteAction extends AnyAction {
  type: ModuleSystemActionConstants.REGISTER_ROUTE;
  payload: RouteConfig;
}

/** Action creators */

/**
 * Fetch all active modules for Hero from Graph
 */
export function fetchActiveModulesForHeroActionCreator(): FetchActiveModulesForHeroAction {
  return {
    type: ModuleSystemActionConstants.FETCH_ACTIVE_MODULES_FOR_HERO,
  };
}

/**
 * Load module bundle
 */
export function loadModuleActionCreator(
  payload: ModuleSysname
): LoadModuleAction {
  return {
    type: ModuleSystemActionConstants.LOAD_MODULE,
    payload,
  };
}

/**
 * Load module bundles
 */
export function loadModulesActionCreator(
  payload: ModuleSysname[]
): LoadModulesAction {
  return {
    type: ModuleSystemActionConstants.LOAD_MODULES,
    payload,
  };
}

/**
 * Register module in the system and store it in redux
 * by sysname
 */
export function registerModuleBySysnameActionCreator(
  payload: DodayModule
): RegisterModuleBySysnameAction {
  return {
    type: ModuleSystemActionConstants.REGISTER_MODULE_BY_SYSNAME,
    payload,
  };
}

/**
 * Register modules in the system and store it in redux
 * by Spot
 */
export function registerModuleBySpotActionCreator(
  payload: DodayModule
): RegisterModuleBySpotAction {
  return {
    type: ModuleSystemActionConstants.REGISTER_MODULE_BY_SPOT,
    payload,
  };
}

/**
 * Register new Entity in the system and store it in redux
 */
export function registerEntityActionCreator(
  payload: EntityConfig
): RegisterEntityAction {
  return {
    type: ModuleSystemActionConstants.REGISTER_ENTITY,
    payload,
  };
}

/**
 * Register new Spot in the system and store it in redux
 */
export function registerSpotActionCreator(
  payload: SpotConfig
): RegisterSpotAction {
  return {
    type: ModuleSystemActionConstants.REGISTER_SPOT,
    payload,
  };
}

/**
 * Register new Route in the system and store it in redux
 */
export function registerRouteActionCreator(
  payload: RouteConfig
): RegisterRouteAction {
  return {
    type: ModuleSystemActionConstants.REGISTER_ROUTE,
    payload,
  };
}

/** Export all action types for reducers */
export type ModuleSystemActionTypes =
  | RegisterModuleBySpotAction
  | RegisterModuleBySysnameAction
  | RegisterEntityAction
  | RegisterSpotAction
  | RegisterRouteAction;
