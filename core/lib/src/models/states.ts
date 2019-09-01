import { Hero } from './entities/hero';
import { DodayAppQueryParams, ToastType } from '../common-interfaces';
import { DodayLike, ProgressLike } from './entities/common';
import { ToolsState, ToolsBuilderState, ToolBeacon } from './entities';

export interface RootState {
  auth: AuthState;
  dodayApp: DodayAppState;
  dodayDetails: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
  store: StoreState;
  tools?: ToolsState;
  toast: ToastState;
  dialog: DialogState;
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
  status: {
    loading: boolean;
  };
  tools?: ToolsBuilderState;
}

export interface AuthState {
  hero?: Hero;
  activeTools: { [key: string]: ToolBeacon };
}

export interface HeroSettingsState {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  theme: 'light' | 'dark';
}

export interface StoreState {
  loading?: boolean;
  searching?: boolean;
  searchTerm?: string;
  totalCount?: number;
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

export interface DialogState {
  open: boolean;
  title: string;
  message?: string;
  actions: React.ReactNode[];
}
