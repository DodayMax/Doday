export type AnySpot = AppSpot | LayoutSpot | TopbarSpot;

export enum LayoutType {
  Desktop = 'Desktop',
  Mobile = 'Mobile',
}

export enum AppSpot {
  Default = 'AppSpot',
}

export enum LayoutSpot {
  TopBar = 'TopBar',
  Drawer = 'Drawer',
  Sidebar = 'Sidebar',
  Page = 'Page',
  BottomNavigation = 'BottomNavigation',
  SpeedDial = 'SpeedDial',
}

export enum TopbarSpot {
  Right = 'Right',
  Left = 'Left',
  Middle = 'Middle',
}
