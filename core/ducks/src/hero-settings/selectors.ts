import { RootState } from '@doday/lib';

export const isDrawerCollapsedSelector = (state: RootState) =>
  state.heroSettings.isDrawerCollapsed;
