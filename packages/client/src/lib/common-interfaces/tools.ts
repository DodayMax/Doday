import { CellProps } from './doday-app';
import { DodayType } from '../models/entities/common';
import { ToolSysname } from '@root/tools';
import { IconNames } from '@root/components/shared/_atoms/icons';
import { RouteComponentProps } from 'react-router';

export interface ToolBeacon {
  config: ToolConfig;
  components: {
    dodayApp: React.ComponentType<RouteComponentProps>;
    cells: {
      [K in DodayType]?: {
        public: React.ComponentType<CellProps>;
        progress: React.ComponentType<CellProps>;
      }
    };
    builders: { [K in DodayType]?: React.ComponentType<WithTools> };
    details: {
      [K in DodayType]?: {
        public: React.ComponentType;
        progress: React.ComponentType;
      }
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
  entities: {
    type: DodayType;
    name: string;
  }[];
  price: number;
  route: string;
  icon: IconNames;
};

export type WithTools = {
  activeTools: ToolBeacon[];
};
