import { RootState } from '@doday/lib';

export const isDrawerCollapsed = (state: RootState) =>
  state.heroSettings.isDrawerCollapsed;
