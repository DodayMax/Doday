import { RootState } from '@lib/models';

export const isDrawerCollapsed = (state: RootState) =>
  state.heroSettings.isDrawerCollapsed;
