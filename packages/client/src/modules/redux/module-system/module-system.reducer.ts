import { uniq, uniqBy } from 'lodash';
import {
  ModuleSystemActionTypes,
  ModuleSystemActionConstants,
} from './module-system.actions';
import { ModuleSystemState } from '@doday/lib';

export const moduleSystemInitialState: ModuleSystemState = {
  entities: [],
  modules: {},
  spots: {},
  routes: {},
  tools: {},
  extensions: {},
};

export default (
  state = moduleSystemInitialState,
  action: ModuleSystemActionTypes
): ModuleSystemState => {
  switch (action.type) {
    case ModuleSystemActionConstants.REGISTER_MODULE_BY_SYSNAME:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.payload.config.sysname]: action.payload,
        },
      };
    case ModuleSystemActionConstants.REGISTER_MODULE_BY_SPOT:
      return {
        ...state,
        spots: {
          ...state.spots,
          [action.payload.config.spot]: {
            ...state.spots[action.payload.config.spot],
            modules:
              state.spots[action.payload.config.spot] &&
              state.spots[action.payload.config.spot].modules
                ? uniq(
                    state.spots[action.payload.config.spot].modules.concat(
                      action.payload.config.sysname
                    )
                  )
                : [action.payload.config.sysname],
          },
        },
      };
    case ModuleSystemActionConstants.REGISTER_SPOT:
      return {
        ...state,
        spots: {
          ...state.spots,
          [action.payload.sysname]: {
            ...state.spots[action.payload.sysname],
            spot: action.payload,
          },
        },
      };
    case ModuleSystemActionConstants.REGISTER_ROUTE:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.payload.sysname]: action.payload,
        },
      };
    case ModuleSystemActionConstants.REGISTER_ENTITY:
      return {
        ...state,
        entities: uniqBy(
          state.entities.concat(action.payload),
          item => item.doday
        ),
      };
    default:
      return state;
  }
};
