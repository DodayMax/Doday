import {
  ModuleSystemActionConstants,
  ModuleSystemActionTypes,
} from './actions';
import { ModuleSystemState, ModuleType } from '@doday/lib';

export const moduleSystemInitialState: ModuleSystemState = {
  entities: [],
  core: {},
  tools: {},
  extensions: {},
};

export default (
  state = moduleSystemInitialState,
  action: ModuleSystemActionTypes
): ModuleSystemState => {
  switch (action.type) {
    case ModuleSystemActionConstants.ADD_MODULE:
      switch (action.payload.type) {
        case ModuleType.Core:
          return {
            ...state,
            core: {
              ...state.core,
              [action.payload.module.config.sysname]: action.payload.module,
            },
          };
        case ModuleType.Tool:
          return {
            ...state,
            tools: {
              ...state.tools,
              [action.payload.module.config.sysname]: action.payload.module,
            },
          };
        case ModuleType.Extension:
          return {
            ...state,
            extensions: {
              ...state.extensions,
              [action.payload.module.config.sysname]: action.payload.module,
            },
          };
      }
      return;
    case ModuleSystemActionConstants.ADD_ENTITIES:
      return {
        ...state,
        entities: state.entities.concat(action.payload),
      };
    default:
      return state;
  }
};
