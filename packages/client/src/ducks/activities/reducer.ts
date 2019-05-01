import * as actions from './actions';
import { BuilderStatus } from '../builder/reducer';
import { ActivityType } from '@root/lib/common-interfaces';

export const initialState: BuilderActivitiesState = {};

export default (
  state = initialState,
  action?: actions.ActionTypes
): BuilderActivitiesState => {
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
    case actions.ActionConstants.CLEAR_ACTIVITIES_BUILDER:
      return initialState;
    default:
      return state;
  }
};

export type BuilderActivitiesState = {
  activityType?: ActivityType;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
};
