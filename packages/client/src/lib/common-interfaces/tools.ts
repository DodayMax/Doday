import { CellProps } from './doday-app';
import { DodayTypes } from '../models/entities/common';
import { ToolSysname } from '@root/tools';
import { IconNames } from '@root/components/shared/_atoms/icons';
import { RouteComponentProps } from 'react-router';

export interface ToolBeacon {
  config: ToolConfig;
  components: {
    dodayApp: React.ComponentType<RouteComponentProps>;
    cells: {
      [K in DodayTypes]?: {
        public: React.ComponentType<CellProps>;
        progress: React.ComponentType<CellProps>;
      }
    };
    builders: { [K in DodayTypes]?: React.ComponentType<WithTools> };
    details: {
      [K in DodayTypes]?: {
        public: React.ComponentType;
        progress: React.ComponentType;
      }
    };
    overview: React.ComponentType;
  };
  api?: any;
  duck?: any;
}

export type ToolConfig = {
  sysname: ToolSysname;
  entities: {
    type: DodayTypes;
    name: string;
  }[];
  cost: number;
  route: string;
  icon: IconNames;
};

export type WithTools = {
  activeTools: ToolBeacon[];
};
