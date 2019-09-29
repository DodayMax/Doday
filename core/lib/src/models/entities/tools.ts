import { DodayType, Entity } from './common';
import { IconNames } from '../../types';
import { ReducersMapObject, AnyAction, Middleware } from 'redux';
import { LayoutSpot, NodeType } from '../../common-interfaces';
import { RootState } from '../states';

export interface ShopTool {
  sysname: string;
  title: string;
  description?: string;
  price: number;
}

export type ToolSysname = 'schedule' | 'activities' | 'memorizer';

/** Base interfaces to extends from */
export type BaseToolState = {};
export type BaseToolBuilderState = {};
/** Generic interfaces for RootState */
export type ToolsBuilderState = { [K in ToolSysname]?: BaseToolBuilderState };
export type ToolsState = { [K in ToolSysname]?: BaseToolState };

/** ToolBeacon export interface */
export interface ToolBeacon {
  loading?: boolean;
  loaded?: boolean;
  config: ToolConfig;
  getView?: (
    spot: LayoutSpot,
    entity: DodayType,
    node?: NodeType
  ) => ToolView | undefined;
  api?: any;
  actions?: {
    actionCreators: any;
    optimisticUpdatesActionCreators: {
      createDodayOptimisticUpdateActionCreator: any;
      updateDodayOptimisticUpdateActionCreator: any;
      takeDodayOptimisticUpdateActionCreator: any;
      untakeDodayOptimisticUpdateActionCreator: any;
      deleteDodayOptimisticUpdateActionCreator: any;
    };
  };
  modules?: {
    main: any;
    builder: any;
  };
  translations?: {
    [lang: string]: {
      [key: string]: string;
    };
  };
  stateSelector?: (state: RootState) => any;
}

export type ToolConfig = {
  sysname: ToolSysname;
  entities?: Entity[];
  route?: string;
  icon?: IconNames;
};

export type WithTools = {
  activeTools?: { [key: string]: ToolBeacon };
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
