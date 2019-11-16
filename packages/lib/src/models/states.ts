import { RouterState } from 'connected-react-router';
import {
  SidebarQueryParams,
  ToastType,
  Status,
  ToolsBuilderState,
  ModuleObject,
  BaseToolState,
} from '../common-interfaces';
import { Hero, Node, Progress } from './nodes';
import { EntityConfig } from './entity';
import { Route } from '../systems';

export type RootState = {
  router: RouterState;
  ms?: ModuleSystemState;
  layout?: LayoutState;
  auth?: AuthState;
  navigation?: NavigationState;
  sidebar: SidebarState;
  details: DodayDetailsState;
  builder: BuilderState;
  activities: BaseToolState;
  toast: ToastState;
  dialog: DialogState;
  storeGrid?: StoreGridState;
};

export type ModuleSystemState = {
  entities: EntityConfig[];
  core: { [key: string]: ModuleObject };
  tools: { [key: string]: ModuleObject };
  extensions: { [key: string]: ModuleObject };
};

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
}

export interface LayoutState {
  isDrawerCollapsed: boolean;
  isSidebarCollapsed: boolean;
  sidebarWidth: number;
  theme: 'light' | 'dark';
}

export interface DodayDetailsState {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<Progress>;
  selectedDoday?: Node;
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
