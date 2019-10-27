import { RootState } from '@doday/lib';

export const navigationStateSelector = (state: RootState) => state.navigation;
export const baseRouteSelector = (state: RootState) =>
  state.navigation && state.navigation.base;
export const navigationStackSelector = (state: RootState) =>
  state.navigation && state.navigation.stack;
