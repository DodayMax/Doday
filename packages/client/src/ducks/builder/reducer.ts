import * as actions from './actions';

export const initialBuilderStatusState: BuilderStatus = {};

export default (
  state = initialBuilderStatusState,
  action?: actions.ActionTypes
): BuilderStatus => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_BUILDER_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.ActionConstants.CLEAR_BUILDER:
      return initialBuilderStatusState;
    default:
      return state;
  }
};

export type BuilderStatus = {
  loading?: boolean;
};
