import { RootState } from '@doday/lib';

export const updatesSelector = (state: RootState) => state.dodayDetails.updates;
export const selectedDoday = (state: RootState) =>
  state.dodayDetails.selectedDoday;
