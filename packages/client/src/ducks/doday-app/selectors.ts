import { RootState } from '@lib/models';

export const chosenDate = (state: RootState) => state.dodayApp.chosenDate;

export const navStack = (state: RootState) => state.dodayApp.navStack;

export const goalByDIDFromStore = (state: RootState, did: string) =>
  state.dodayApp.goals.find(goal => goal.did === did);
