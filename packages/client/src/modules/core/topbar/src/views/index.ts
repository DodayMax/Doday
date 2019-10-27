import { ModuleView, LayoutSpot, LayoutType, GetViewParams } from '@doday/lib';
import { DesktopTopbar } from './desktop-topbar/desktop-topbar';
import { MobileTopbar } from './mobile-topbar/mobile-topbar';

export function getView(
  params: GetViewParams<LayoutSpot>
): ModuleView | undefined {
  switch (params.layoutType) {
    case LayoutType.Desktop:
      switch (params.spot) {
        default:
          return {
            component: DesktopTopbar,
            dependencies: [],
          };
      }
    case LayoutType.Mobile:
      switch (params.spot) {
        default:
          return {
            component: MobileTopbar,
            dependencies: [],
          };
      }
  }
}
