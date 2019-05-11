import * as actions from './actions';
import { ActivityType } from '@root/lib/common-interfaces';
import { DodayLike } from '@root/lib/models/entities/common';

export const initialState: ActivityBuilderState = {
  activityType: 'do',
};
export const initialDodayAppState: ActivityDodayAppToolState = {
  inprogress: [],
  completed: [],
  published: [],
};

export const dodayAppReducer = (
  state = initialDodayAppState,
  action?: actions.ActionTypes
): ActivityDodayAppToolState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_ACTIVITIES_IN_PROGRESS:
      return {
        ...state,
        inprogress: action.payload,
      };
    case actions.ActionConstants.SET_COMPLETED_ACTIVITIES:
      return {
        ...state,
        completed: action.payload,
      };
    case actions.ActionConstants.SET_PUBLISHED_ACTIVITIES:
      return {
        ...state,
        published: action.payload,
      };
    default:
      return state;
  }
};

export const builderReducer = (
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
        activityType: 'do',
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

export interface ActivityDodayAppToolState {
  inprogress: DodayLike[];
  completed: DodayLike[];
  published: DodayLike[];
}
