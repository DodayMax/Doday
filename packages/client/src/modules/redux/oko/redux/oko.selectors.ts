import { createSelector } from 'reselect';
import { RootState } from '@doday/lib';

export const moduleBySysnameSelector = (sysname: string) =>
  createSelector(
    (state: RootState) => state.oko.modules[sysname],
    selectedModule => selectedModule
  );

export const modulesBySpotSelector = (spot: string) =>
  createSelector(
    (state: RootState) =>
      state.oko.spots[spot] && state.oko.spots[spot].modules,
    selected => selected || []
  );
