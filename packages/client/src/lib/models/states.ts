import { Hero } from './entities/hero';
import { BuilderStatus } from '@root/ducks/builder/reducer';
import {
  ToolsState,
  ToolBeacon,
  DodayLike,
  ToolsBuilderState,
  ProgressLike,
} from '@root/tools/types';
import { DodayAppQueryParams, ToastType } from '../common-interfaces';

export interface RootState {
  auth: AuthState;
  dodayApp: DodayAppState;
  dodayDetails: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
  store: StoreState;
  tools: ToolsState;
  toast: ToastState;
}

export interface DodayAppStatusState {
  loading: boolean;
  route: string;
  routeParams: DodayAppQueryParams;
  badge: number;
}

export type DodayAppState = {
  status: DodayAppStatusState;
};

export interface BuilderState {
  status: BuilderStatus;
  tools: ToolsBuilderState;
}

export interface AuthState {
  hero?: Hero;
  activeTools: ToolBeacon[];
}

export interface HeroSettingsState {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  theme: 'light' | 'dark';
}

export interface StoreState {
  dodays: DodayLike[];
}

export interface DodayDetailsState {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<ProgressLike>;
  selectedDoday?: DodayLike;
}

export interface ToastState {
  open: boolean;
  type?: ToastType;
  messages: string[];
  autoHideDuration?: number;
}
