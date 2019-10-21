import { ReducersMapObject, AnyAction, Middleware } from 'redux';
import { LayoutSpot } from '../common-interfaces';
import { NodeLabel } from '../models/nodes';

/**
 * Type of Activity
 */
export type DodayType = 'do' | 'read' | 'watch';

export enum ModuleSysname {
  layout = 'layout',
  schedule = 'schedule',
  activities = 'activities',
  memorizer = 'memorizer',
}

/** Base interfaces to extends from */
export type BaseToolState = {};
export type BaseToolBuilderState = {};
/** Generic interfaces for RootState */
export type ToolsBuilderState = { [K in ModuleSysname]?: BaseToolBuilderState };
export type ToolsState = { [K in ModuleSysname]?: BaseToolState };

/** Module class */
export class Module implements Dynamic {
  status!: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
  config!: ModuleConfig;
  getView?: (
    spot: LayoutSpot,
    entity: NodeLabel,
    node?: NodeLabel
  ) => ToolView | undefined;
  actions?: any;
  translations?: {
    [lang: string]: {
      [key: string]: string;
    };
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
  loadedTools?: { [K in ModuleSysname]: Module };
};

export interface ToolView {
  component: React.ComponentType<any>;
  dependencies: IModule<any>[];
}

export interface IModule<State> {
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
