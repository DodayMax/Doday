import * as builderActions from '@ducks/builder/actions';
import * as actions from './actions';
import { ActivityType } from '@root/lib/common-interfaces';
import { DodayLike, DodayTypes } from '@root/lib/models/entities/common';

export const initialState: ActivityBuilderState = {
  activityType: 'do',
};
export const initialDodayAppState: ActivityToolState = {
  dodays: [],
};

export const mainReducer = (
  state = initialDodayAppState,
  action?: actions.ActionTypes
): ActivityToolState => {
  switch (action && action.type) {
    case actions.ActionConstants.SET_ACTIVITIES:
      return {
        ...state,
        dodays: [...state.dodays, ...action.payload],
      };
    case actions.ActionConstants.CREATE_DODAY_OPTIMISTIC_UPDATE:
      if (action.payload.doday.type === DodayTypes.Activity) {
        return {
          ...state,
          dodays: [
            {
              ...action.payload.doday,
              progress: action.payload.progress,
              resource: action.payload.resource,
            },
            ...state.dodays,
          ],
        };
      }
      return state;
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
    case builderActions.ActionConstants.CLEAR_BUILDER:
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

export interface ActivityToolState {
  dodays: DodayLike[];
}
