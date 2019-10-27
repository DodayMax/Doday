import { ReducersMapObject, AnyAction, Middleware } from 'redux';
import { NodeLabel } from '../models/nodes';
import { LayoutSpot, LayoutType } from './spots';

/**
 * Type of Activity
 */
export type ActivityType = 'do' | 'read' | 'watch';

export enum ModuleSysname {
  layout = 'layout',
  ms = 'ms', // module system
  topbar = 'topbar',
  schedule = 'schedule',
  activities = 'activities',
  memorizer = 'memorizer',
}

export enum ModuleType {
  core = 'core',
  tool = 'tools',
  extension = 'extensions',
}

/** Base interfaces to extends from */
export type BaseToolState = {};
export type BaseToolBuilderState = {};
/** Generic interfaces for RootState */
export type ToolsBuilderState = { [K in ModuleSysname]?: BaseToolBuilderState };
export type ToolsState = { [K in ModuleSysname]?: BaseToolState };

/** Module class */
export class ModuleObject<LS = LayoutSpot> implements Dynamic {
  status!: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
  config!: ModuleConfig;
  spots?: LS[];
  getView?(
    layoutType?: LayoutType,
    spot?: LS,
    entity?: NodeLabel,
    node?: NodeLabel
  ): ModuleView | undefined;
  translations?: {
    [lang: string]: object;
  };
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

export interface ModuleView {
  component: React.ComponentType<any>;
  dependencies: IModule<any>[];
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
