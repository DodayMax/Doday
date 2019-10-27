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

export type RootState = {
  router: RouterState;
  ms?: ModuleSystemState;
  layout?: LayoutState;
  auth?: AuthState;
  navigation?: NavigationState;
  sidebar: SidebarState;
  details: DodayDetailsState;
  builder: BuilderState;
  store: StoreState;
  activities: BaseToolState;
  toast: ToastState;
  dialog: DialogState;
};

export type ModuleSystemState = {
  modules: { [key: string]: ModuleObject };
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
  activeTools: { [key: string]: ModuleObject };
}

export interface LayoutState {
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
  dodays: Node[];
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
  base: string;
  stack: string[];
}
