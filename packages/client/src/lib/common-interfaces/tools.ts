import { DrawerMenuItem, CellProps } from './doday-app';
import { DodayTypes } from '../models/entities/common';
import { ToolSysname } from '@root/tools';

export interface ToolBeacon {
  config: ToolConfig;
  drawerMenuItem: DrawerMenuItem;
  routes: any;
  components: {
    dodayApp: React.ComponentType;
    cells: {
      public: React.ComponentType<CellProps>;
      progress: React.ComponentType<CellProps>;
    };
    builders: { [K in DodayTypes]?: React.ComponentType };
    details: {
      public: React.ComponentType;
      progress: React.ComponentType;
    };
  };
  api?: any;
  duck?: any;
}

export type ToolConfig = {
  sysname: ToolSysname;
  types: [DodayTypes];
  cost: number;
};
