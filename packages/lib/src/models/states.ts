import { RouterState } from 'connected-react-router';
import {
  SidebarQueryParams,
  ToastType,
  Status,
  DodayModule,
} from '../common-interfaces';
import { Hero, Node } from './nodes';
import { EntityConfig } from './entity';
import { Route, RouteConfig, SpotConfig, ModuleSysname } from '../systems';

export type RootState = {
  router: RouterState;
  modules?: ModuleSystemState;
  layout?: LayoutState;
  auth?: AuthState;
  navigation?: NavigationState;
  sidebar?: SidebarState;
  toast?: ToastState;
  dialog?: DialogState;
  storeGrid?: StoreGridState;
};

export type ModuleSystemState = {
  entities: EntityConfig[];
  routes: { [key: string]: RouteConfig };
  spots: {
    [key: string]: {
      spot: SpotConfig;
      modules?: ModuleSysname[];
    };
  };
  modules: { [key: string]: DodayModule };
  tools: { [key: string]: DodayModule };
  extensions: { [key: string]: DodayModule };
};

export type SidebarState = {
  loading: boolean;
  route: string;
  routeParams: SidebarQueryParams;
  badge: number;
};

export interface AuthState {
  status: Status;
  isAuthenticated?: boolean;
  hero?: Hero;
}

export interface LayoutState {
  isDrawerCollapsed: boolean;
  isSidebarCollapsed: boolean;
  sidebarWidth: number;
  theme: 'light' | 'dark';
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

export interface NavigationState {
  base?: Route;
  stack: Route[];
  sidebar: {
    route?: Route;
  };
}

export interface StoreGridState {
  status: Status;
  items: Node[];
  count: number;
}
