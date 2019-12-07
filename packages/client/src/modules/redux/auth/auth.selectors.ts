import { RootState } from '@doday/lib';

export const myDIDSelector = (state: RootState) =>
  state.auth.hero && state.auth.hero.did;

export const heroSelector = (state: RootState) => state.auth.hero;

export const activeModulesSelector = (state: RootState) =>
  state.auth.hero.activeModules;

export const availableEntitiesSelector = (state: RootState) =>
  state.auth.hero.availableEntities;
