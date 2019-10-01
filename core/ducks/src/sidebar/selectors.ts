import { RootState, SidebarState } from '@doday/lib';

export const sidebarStateSelector = (state: RootState): SidebarState =>
  state.sidebar;
