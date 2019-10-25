import { NodeLabel, ModuleView, LayoutSpot, LayoutType } from '@doday/lib';
import { DesktopTopbar } from './desktop-topbar/desktop-topbar';
import { MobileTopbar } from './mobile-topbar/mobile-topbar';

export function getView(
  layoutType?: LayoutType,
  spot?: LayoutSpot,
  entity?: NodeLabel,
  node?: NodeLabel
): ModuleView | undefined {
  switch (layoutType) {
    case LayoutType.Desktop:
      switch (spot) {
        default:
          return {
            component: DesktopTopbar,
            dependencies: [],
          };
      }
    case LayoutType.Mobile:
      switch (spot) {
        default:
          return {
            component: MobileTopbar,
            dependencies: [],
          };
      }
  }
}
