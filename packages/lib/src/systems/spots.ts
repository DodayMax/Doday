export type AnySpot =
  | AppSpot
  | LayoutSpot
  | NavigationSpot
  | TopbarSpot
  | DrawerSpot;

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

export enum TopbarSpot {
  Right = 'TopbarSpot.Right',
  Left = 'TopbarSpot.Left',
  NavItem = 'TopbarSpot.Middle',
}

export enum DrawerSpot {
  ToolItem = 'DrawerSpot.ToolItem',
}
