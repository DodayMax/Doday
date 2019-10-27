import { RootState } from '@doday/lib';

export const myDIDSelector = (state: RootState) =>
  state.auth.hero && state.auth.hero.did;

export const activeToolsSelector = (state: RootState) => state.auth.activeTools;
