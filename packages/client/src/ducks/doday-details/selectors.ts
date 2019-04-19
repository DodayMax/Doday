import { RootState } from '@root/lib/models';

export const updatesSelector = (state: RootState) => state.dodayDetails.updates;
export const selectedDoday = (state: RootState) =>
  state.dodayDetails.selectedDoday;
