import { RootState, ModuleSystemState } from '@doday/lib';

export const moduleSystemStateSelector = (
  state: RootState
): ModuleSystemState => state.ms;
