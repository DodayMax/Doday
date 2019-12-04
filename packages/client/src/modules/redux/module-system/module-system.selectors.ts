import { createSelector } from 'reselect';
import { RootState, SpotConfig } from '@doday/lib';

export const findSuitableModulesSelector = (params: SpotConfig) =>
  createSelector(
    (state: RootState) => state.modules,
    moduleSystemState => {
      const modulesForSpot =
        moduleSystemState.spots[params.sysname] &&
        moduleSystemState.spots[params.sysname].modules;
      let suitableModules;
      if (modulesForSpot && modulesForSpot.length) {
        /**
         * Find suitable loaded modules
         */
        suitableModules = modulesForSpot.filter(sysname => {
          let result = moduleSystemState.modules[sysname].status.loaded;
          if (params.node) {
            result =
              moduleSystemState.modules[sysname].config.node === params.node;
          }
          return result;
        });
        const suitableModuleObjects = suitableModules.map(
          item => moduleSystemState.modules[item]
        );
        return suitableModuleObjects;
      }
    }
  );

export const loadingModulesSelector = createSelector(
  (state: RootState) => state.modules.modules,
  modules => {
    return (
      (modules && Object.values(modules).filter(item => item.status.loading)) ||
      []
    );
  }
);
