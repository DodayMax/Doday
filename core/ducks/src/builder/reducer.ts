import { BuilderActionConstants, BuilderActionTypes } from './actions';

export const initialBuilderStatusState: BuilderStatus = {};

export default (
  state = initialBuilderStatusState,
  action: BuilderActionTypes
): BuilderStatus => {
  switch (action.type) {
    case BuilderActionConstants.SET_BUILDER_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case BuilderActionConstants.CLEAR_BUILDER:
      return initialBuilderStatusState;
    default:
      return state;
  }
};

export type BuilderStatus = {
  loading?: boolean;
};
