import { ReducersMapObject, AnyAction, Middleware } from 'redux';
import { NodeLabel } from '../models/nodes';
import { LayoutType, AnySpot } from './spots';
import { Entity } from '../models/entity';

/**
 * Type of Activity
 */
export type ActivityType = 'do' | 'read' | 'watch';

export enum ModuleSysname {
  Layout = 'layout',
  MS = 'ms', // module system
  Auth = 'auth',
  Navigation = 'navigation',
  Toast = 'toast',
  Dialog = 'dialog',
  Topbar = 'topbar',
  Store = 'store',
  Profile = 'profile',
  Activities = 'activities',
}

export enum ModuleType {
  Core = 'core',
  Tool = 'tools',
  Extension = 'extensions',
}

/** Base interfaces to extends from */
export type BaseToolState = {};
export type BaseToolBuilderState = {};
/** Generic interfaces for RootState */
export type ToolsBuilderState = { [K in ModuleSysname]?: BaseToolBuilderState };
export type ToolsState = { [K in ModuleSysname]?: BaseToolState };

/** Module class */
export class ModuleObject<LS = AnySpot> implements Dynamic {
  /**
   * Needed for the system to properly load modules
   */
  status!: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
  /**
   * Sysname and ModuleType for now
   */
  config!: ModuleConfig;
  /**
   * Just to simplify dev process we are store
   * node labels of the provided Entities as well
   */
  nodes?: NodeLabel[];
  /**
   * New Entities that the module provides
   */
  entities?: Entity[];
  /**
   * Layout spots that the module uses and for which
   * it has views
   */
  spots?: LS[];
  /**
   * Routes that the module uses and for which
   * it has views
   */
  routes?: string[];
  /**
   * Function with which you can pick up the desired
   * views according to the passed parameters
   */
  getView?(params: GetViewParams<LS>): ModuleView | undefined;
  /**
   * Translations for the module (if it needs them)
   */
  translations?: {
    [lang: string]: object;
  };
}

export interface GetViewParams<T = AnySpot> {
  /** Desktop or Mobile */
  layoutType?: LayoutType;
  /** Layout spot to which view is needed */
  spot?: T;
  /** NodeLabel for which view is needed */
  node?: NodeLabel;
  /** Route to which view is needed */
  route?: string;
}

export interface Dynamic {
  status: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
}

export type ModuleConfig = {
  sysname: ModuleSysname;
  type: ModuleType;
};

export type WithTools = {
  loadedTools?: { [K in ModuleSysname]: ModuleObject };
};

export interface ModuleView<P = any> {
  component: React.ComponentType<P>;
  dependencies: IModule<any>[];
  props?: { [key: string]: any };
}

export interface IModule<State = {}> {
  /**
   * Id of the module
   */
  id: string;
  /**
   * Reducers for the module
   */
  reducerMap?: ReducersMapObject<State, AnyAction>;
  /**
   * Middlewares to add to the store
   */
  middlewares?: Middleware[];
  /**
   * These actions are dispatched immediately after adding the module in the store
   */
  initialActions?: AnyAction[];
  /**
   * These actions are dispatched immediatly before removing the module from the store
   */
  finalActions?: AnyAction[];
  /**
   * Specifies if the module is retained forever in the store
   */
  retained?: boolean;
}
