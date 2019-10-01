import { RootState, ProgressLike } from '@doday/lib';

export const updatesSelector = (
  state: RootState
): Partial<ProgressLike> | undefined => state.details.updates;
export const selectedDodaySelector = (state: RootState) =>
  state.details.selectedDoday;
