import * as actions from './actions';
import { BuilderState } from '@lib/models';

export const initialState: BuilderState = {};

export default (
  state = initialState,
  action?: actions.ActionTypes
): BuilderState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_ACTIVITY_TYPE:
      return {
        ...state,
        activityType: action!.payload,
      };
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
    case actions.ActionConstants.SET_URL_PARSING_PROGRESS:
      return {
        ...state,
        isUrlParsing: action.payload,
      };
    case actions.ActionConstants.SET_PARSED_URL_METADATA_OBJECT:
      return {
        ...state,
        parsedMetadata: action.payload,
      };
    case actions.ActionConstants.CLEAR_PARSED_METADATA:
      return {
        ...state,
        parsedMetadata: undefined,
        activityType: undefined,
      };
    case actions.ActionConstants.CLEAR_BUILDER:
      return initialState;
    default:
      return state;
  }
};
