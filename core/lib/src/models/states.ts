import { RouterState } from 'connected-react-router';
import {
  SidebarQueryParams,
  ToastType,
  Status,
  ToolsBuilderState,
  ToolBeacon,
  BaseToolState,
} from '../common-interfaces';
import { Hero, Doday, Progress } from '../models/nodes';

export interface RootState {
  router: RouterState;
  auth: AuthState;
  sidebar: SidebarState;
  details: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
  store: StoreState;
  activities: BaseToolState;
  toast: ToastState;
  dialog: DialogState;
  navStack: NavStackState;
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
  status: Status;
  isAuthenticated?: boolean;
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
  dodays: Doday[];
}

export interface DodayDetailsState {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<Progress>;
  selectedDoday?: Doday;
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

export interface NavStackState {
  base: string;
  stack: string[];
}
