import { ReducersMapObject, AnyAction, Middleware } from 'redux';
import { NodeLabel } from '../models/nodes';
import { LayoutType, AnySpot } from './spots';

/**
 * Type of Activity
 */
export type ActivityType = 'do' | 'read' | 'watch';

export enum ModuleSysname {
  Layout = 'layout',
  MS = 'ms', // module system
  Auth = 'auth',
  Navigation = 'navigation',
  Topbar = 'topbar',
  Store = 'store',
  Profile = 'profile',
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
  status!: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
  config!: ModuleConfig;
  spots?: LS[];
  routes?: string[];
  label?: NodeLabel;
  getView?(params: GetViewParams<LS>): ModuleView | undefined;
  translations?: {
    [lang: string]: object;
  };
}

export interface GetViewParams<T = AnySpot> {
  layoutType?: LayoutType;
  spot?: T;
  label?: NodeLabel;
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
