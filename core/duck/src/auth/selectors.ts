import { RootState } from '@doday/lib';

export const myDID = (state: RootState) =>
  state.auth.hero && state.auth.hero.did;

export const activeTools = (state: RootState) => state.auth.activeTools;
