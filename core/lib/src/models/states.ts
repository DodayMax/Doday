import { Hero } from './entities/hero';
import { SidebarQueryParams, ToastType } from '../common-interfaces';
import { DodayLike, ProgressLike } from './entities/common';
import { ToolsBuilderState, ToolBeacon, BaseToolState } from './entities';

export interface RootState {
  auth: AuthState;
  sidebar: SidebarState;
  details: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
  store: StoreState;
  activities: BaseToolState;
  toast: ToastState;
  dialog: DialogState;
}

export type SidebarState = {
  loading: boolean;
  route: string;
  routeParams: SidebarQueryParams;
  badge: number;
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
  isSidebarCollapsed: boolean;
  sidebarWidth: number;
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
