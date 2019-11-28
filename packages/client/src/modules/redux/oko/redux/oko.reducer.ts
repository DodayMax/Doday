import { OKOActionTypes, OKOActionConstants } from './oko.actions';
import { OKOState } from '@doday/lib';
import _ from 'lodash';

export const OKOInitialState: OKOState = {
  entities: [],
  routes: {},
  spots: {},
  modules: {},
  tools: {},
  extensions: {},
};

export default (state = OKOInitialState, action: OKOActionTypes): OKOState => {
  const { type, payload } = action;
  switch (type) {
    case OKOActionConstants.REGISTER_MODULE:
      return {
        ...state,
        spots: {
          ...state.spots,
          [payload.config.spot]: {
            ...state.spots[payload.config.spot],
            modules:
              state.spots[payload.config.spot] &&
              state.spots[payload.config.spot].modules &&
              _.uniq(
                state.spots[payload.config.spot].modules.concat(
                  payload.config.sysname
                )
              ),
          },
        },
        modules: {
          ...state.modules,
          [payload.config.sysname]: payload,
        },
      };
    default:
      return state;
  }
};
