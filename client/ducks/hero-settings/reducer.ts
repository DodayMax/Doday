import * as actions from './actions';
import { HeroSettingsState } from '@lib/models';

export const initialState: HeroSettingsState = {
  isDrawerShown: false,
};

export default (
  state = initialState,
  action?: actions.ActionTypes,
): HeroSettingsState => {
  switch (action && action.type) {
    case actions.ActionConstants.TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerShown: !state.isDrawerShown,
      };
    default:
      return state;
  }
};