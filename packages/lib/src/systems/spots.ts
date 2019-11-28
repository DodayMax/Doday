import { NodeLabel } from '../models';

export interface SpotConfig {
  /**
   * Layout spot sysname
   */
  sysname: AnySpot;
  /**
   * Desktop or Mobile
   */
  layoutType?: LayoutType;
  /**
   * NodeLabel for which view is needed
   */
  node?: NodeLabel;
  /**
   * Spot could have multiple active modules?
   * Spot will render all of them
   */
  multiple?: boolean;
}

export type AnySpot =
  | AppSpot
  | LayoutSpot
  | NavigationSpot
  | TopbarSpot
  | DrawerSpot
  | SpeedDialSpot
  | StoreSpot
  | BaseStackSpot;

export enum LayoutType {
  Desktop = 'Desktop',
  Mobile = 'Mobile',
}

export enum AppSpot {
  Default = 'AppSpot',
  Toast = 'Toast',
  Dialog = 'Dialog',
}

export enum LayoutSpot {
  TopBar = 'LayoutSpot.TopBar',
  Drawer = 'LayoutSpot.Drawer',
  Sidebar = 'LayoutSpot.Sidebar',
  Page = 'LayoutSpot.Page',
  BottomNavigation = 'LayoutSpot.BottomNavigation',
  SpeedDial = 'LayoutSpot.SpeedDial',
}

export enum NavigationSpot {
  BaseRoute = 'NavigationSpot.BaseRoute',
  StackedRoute = 'NavigationSpot.StackedRoute',
  SidebarRoute = 'NavigationSpot.SidebarRoute',
}

export enum BaseStackSpot {
  Builder = 'BaseStackSpot.Builder',
  Details = 'BaseStackSpot.Details',
  Progress = 'BaseStackSpot.Progress',
}

export enum TopbarSpot {
  Right = 'TopbarSpot.Right',
  Left = 'TopbarSpot.Left',
  NavItem = 'TopbarSpot.Middle',
}

export enum DrawerSpot {
  ToolItem = 'DrawerSpot.ToolItem',
}

export enum SpeedDialSpot {
  Item = 'SpeedDialSpot.Item',
}

export enum StoreSpot {
  Filter = 'StoreSpot.Filter',
  Grid = 'StoreSpot.Grid',
  Card = 'StoreSpot.Card',
}
