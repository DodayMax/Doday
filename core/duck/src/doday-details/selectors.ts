import { RootState } from '@doday/lib';

export const updatesSelector = (state: RootState) => state.details.updates;
export const selectedDoday = (state: RootState) => state.details.selectedDoday;
