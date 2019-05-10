import { RootState } from '@lib/models';

export const chosenDate = (state: RootState) =>
  state.dodayApp.schedule.chosenDate;
