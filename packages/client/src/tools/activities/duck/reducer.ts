import * as actions from './actions';
import { ActivityType } from '@root/lib/common-interfaces';

export const initialState: ActivityBuilderState = {};

export default (
  state = initialState,
  action?: actions.ActionTypes
): ActivityBuilderState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_ACTIVITY_TYPE:
      return {
        ...state,
        activityType: action!.payload,
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
    case actions.ActionConstants.CLEAR_PARSED_URL_METADATA:
      return {
        ...state,
        activityType: undefined,
        isUrlParsing: false,
        parsedMetadata: undefined,
      };
    case actions.ActionConstants.CLEAR_ACTIVITIES_BUILDER:
      return initialState;
    default:
      return state;
  }
};

export type ActivityBuilderState = {
  activityType?: ActivityType;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
};
