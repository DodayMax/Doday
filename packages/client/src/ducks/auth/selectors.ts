import { RootState } from '@root/lib/models';

export const myDID = (state: RootState) =>
  state.auth.hero && state.auth.hero.did;
