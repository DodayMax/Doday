import { IconNames } from '@root/components/shared/_atoms/icons';
import {
  ActivityToolState,
  ActivityBuilderState,
} from './activity/duck/reducer';
import {
  Activity,
  SerializedActivity,
  ActivityProgress,
  SerializedActivityProgress,
  APIresponseActivityProgress,
} from './activity/entities/activity';
import { RouteComponentProps } from 'react-router';
import { CellProps } from '@root/lib/common-interfaces';

export type ToolSysname = 'schedule' | 'activities' | 'memorizer';
export type ToolState = ActivityToolState;
export type ToolBuilderState = ActivityBuilderState;
export type ToolsBuilderState = { [K in ToolSysname]?: ToolBuilderState };
export type ToolsState = { [K in ToolSysname]?: ToolState };

export enum DodayType {
  Activity,
  FlashCard,
}

export type DodayLike = Activity;
export type SerializedDodayLike = SerializedActivity;
export type ProgressLike = ActivityProgress;
export type SerializedProgressLike = SerializedActivityProgress;
export type APIResponseProgressLike = APIresponseActivityProgress;

export interface ToolBeacon {
  config: ToolConfig;
  components: {
    dodayApp: React.ComponentType<
      React.HTMLAttributes<HTMLElement> &
        RouteComponentProps & { loading: boolean }
    >;
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
    serialize: (doday?: Partial<DodayLike>) => Partial<SerializedDodayLike>;
    deserialize: (
      doday?: Partial<SerializedDodayLike>
    ) => Partial<DodayLike> | undefined;
    serializeProgress: (
      progress?: Partial<ProgressLike>
    ) => Partial<SerializedProgressLike>;
    deserializeProgress: (
      progress?: Partial<SerializedProgressLike>
    ) => Partial<ProgressLike> | undefined;
    isActivity: (doday: DodayLike) => doday is DodayLike;
  }[];
  price: number;
  route: string;
  icon: IconNames;
};

export type WithTools = {
  activeTools: ToolBeacon[];
};
