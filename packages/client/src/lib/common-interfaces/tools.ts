import { CellProps } from './doday-app';
import { DodayTypes } from '../models/entities/common';
import { ToolSysname } from '@root/tools';
import { IconNames } from '@root/components/shared/_atoms/icons';

export interface ToolBeacon {
  config: ToolConfig;
  components: {
    dodayApp: React.ComponentType;
    cells: {
      [K in DodayTypes]?: {
        public: React.ComponentType<CellProps>;
        progress: React.ComponentType<CellProps>;
      }
    };
    builders: { [K in DodayTypes]?: React.ComponentType };
    details: {
      [K in DodayTypes]?: {
        public: React.ComponentType;
        progress: React.ComponentType;
      }
    };
  };
  api?: any;
  duck?: any;
}

export type ToolConfig = {
  sysname: ToolSysname;
  entities: [DodayTypes];
  cost: number;
  route: string;
  icon: IconNames;
};
