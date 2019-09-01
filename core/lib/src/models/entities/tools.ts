import { RouteComponentProps } from 'react-router';
import { DodayType, Entity } from './common';
import { CellProps } from '../../common-interfaces';
import { IconNames } from '../../types';

export interface ShopTool {
  sysname: string;
  title: string;
  description?: string;
  price: number;
  path: string;
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
  config?: ToolConfig;
  components?: {
    dodayApp: React.ComponentType<
      React.HTMLAttributes<HTMLElement> &
        RouteComponentProps & { loading: boolean }
    >;
    cells: {
      [K in DodayType]?: {
        public: React.ComponentType<CellProps>;
        progress: React.ComponentType<CellProps>;
      };
    };
    builders: { [K in DodayType]?: React.ComponentType<WithTools> };
    details: {
      [K in DodayType]?: {
        public: React.ComponentType;
        progress: React.ComponentType;
      };
    };
    overview: React.ComponentType;
  };
  api?: any;
  duck?: {
    actions: {
      actionCreators: any;
      optimisticUpdatesActionCreators: {
        createDodayOptimisticUpdateActionCreator: any;
        updateDodayOptimisticUpdateActionCreator: any;
        takeDodayOptimisticUpdateActionCreator: any;
        untakeDodayOptimisticUpdateActionCreator: any;
        deleteDodayOptimisticUpdateActionCreator: any;
      };
    };
    sagas: any;
    reducers: {
      mainReducer: any;
      builderReducer: any;
    };
  };
}

export type ToolConfig = {
  sysname: ToolSysname;
  entities?: Entity[];
  price?: number;
  route?: string;
  icon?: IconNames;
};

export type WithTools = {
  activeTools: { [key: string]: ToolBeacon };
};
