import { RootState, ModuleSystemState } from '@doday/lib';
import { Behavior } from '@doday/lib/dist/src/models/entity';

export const moduleSystemStateSelector = (
  state: RootState
): ModuleSystemState => state.ms;

export const coreModulesSelector = (state: RootState) => state.ms.core;
export const toolModulesSelector = (state: RootState) => state.ms.tools;
export const extensionModulesSelector = (state: RootState) =>
  state.ms.extensions;
export const availableEntitiesSelector = (state: RootState) =>
  state.ms.entities;

export const creatableEntitiesSelector = (state: RootState) =>
  state.ms.entities.filter(item => item.behavior.includes(Behavior.Creatable));

export const creatableEntitiesLabelsSelector = (state: RootState) =>
  state.ms.entities
    .filter(item => item.behavior.includes(Behavior.Creatable))
    .map(item => item.doday);
