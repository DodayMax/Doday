import { createSelector } from 'reselect';
import { RootState, SpotConfig, Behavior } from '@doday/lib';

export const findSuitableModulesSelector = (params: SpotConfig) =>
  createSelector(
    (state: RootState) => state.modules,
    moduleSystemState => {
      let modulesForSpot =
        moduleSystemState.spots[params.sysname] &&
        moduleSystemState.spots[params.sysname].modules;
      if (modulesForSpot && modulesForSpot.length) {
        if (params.node) {
          modulesForSpot = modulesForSpot.filter(
            sysname =>
              moduleSystemState.modules[sysname].config.node === params.node
          );
        }
        const moduleObjects = modulesForSpot.map(
          item => moduleSystemState.modules[item]
        );
        return moduleObjects.filter(item => item.status.loaded);
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

export const creatableEntitiesLabelsSelector = createSelector(
  (state: RootState) => state.modules.entities,
  entities =>
    entities.filter(item => item.behavior.includes(Behavior.Creatable))
);
