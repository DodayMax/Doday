import {
  ModuleSystemActionConstants,
  ModuleSystemActionTypes,
} from './actions';
import { ModuleSystemState } from '@doday/lib';

export const moduleSystemInitialState: ModuleSystemState = {
  modules: {},
};

export default (
  state = moduleSystemInitialState,
  action: ModuleSystemActionTypes
): ModuleSystemState => {
  switch (action.type) {
    case ModuleSystemActionConstants.ADD_MODULE:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.payload.config.sysname]: action.payload,
        },
      };
    default:
      return state;
  }
};
