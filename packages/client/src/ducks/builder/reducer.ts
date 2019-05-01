import * as actions from './actions';

export const initialState: BuilderStatus = {};

export default (
  state = initialState,
  action?: actions.ActionTypes
): BuilderStatus => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_BUILDER_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.ActionConstants.SET_BUILDER_SUCCESS_FLAG:
      return {
        ...state,
        success: action.payload,
      };
    case actions.ActionConstants.CLEAR_BUILDER:
      return initialState;
    default:
      return state;
  }
};

export type BuilderStatus = {
  loading?: boolean;
  success?: boolean;
};
