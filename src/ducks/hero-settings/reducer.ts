import * as actions from './actions';
import { HeroSettingsState } from '@lib/models';

export const initialState: HeroSettingsState = {
  isDrawerShown: false,
  chosenDate: new Date(),
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
    case actions.ActionConstants.CHANGE_DATE:
      return {
        ...state,
        chosenDate: action!.payload,
      }
    default:
      return state;
  }
};