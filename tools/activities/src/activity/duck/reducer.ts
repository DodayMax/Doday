import { BuilderActionConstants } from '@doday/duck';
import * as actions from './actions';
import {
  ActivityType,
  Activity,
  DodayType,
  BaseToolState,
  BaseToolBuilderState,
  Resource,
} from '@doday/lib';

export const initialActivityBuilderState: ActivityBuilderState = {
  activityType: 'do',
};
export const initialActivityToolState: ActivityToolState = {
  dodays: [],
};

export const mainReducer = (
  state = initialActivityToolState,
  action: actions.ActionTypes
): ActivityToolState => {
  switch (action.type) {
    case actions.ActionConstants.SET_ACTIVITIES:
      return {
        ...state,
        dodays: action.payload,
      };
    case actions.ActionConstants.CREATE_DODAY_OPTIMISTIC_UPDATE:
      if (action.payload.doday.type === DodayType.Activity) {
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
    case actions.ActionConstants.UPDATE_DODAY_OPTIMISTIC_UPDATE:
      if (!state.dodays.length) return state;
      let updatedindex = 0;
      const updated = state.dodays.find((doday, index) => {
        if (doday.did === action.payload.did) {
          updatedindex = index;
          return true;
        }
        return false;
      });
      const withoutUpdated = state.dodays.filter(
        doday => doday.did !== action.payload.did
      );
      withoutUpdated.splice(updatedindex, 0, {
        ...(updated as Activity),
        progress:
          action.payload.updates && action.payload.updates.progress
            ? {
                ...(updated && updated.progress),
                ...action.payload.updates.progress,
              }
            : undefined,
        resource:
          action.payload.updates && action.payload.updates.resource
            ? {
                ...(updated!.resource as Resource),
                ...action.payload.updates.resource,
              }
            : undefined,
      });
      return {
        dodays: withoutUpdated,
      };
    case actions.ActionConstants.TAKE_DODAY_OPTIMISTIC_UPDATE:
      const withoutTaken = state.dodays.filter(
        doday => doday.did !== action.payload.doday.did
      );

      return {
        dodays: [
          {
            ...action.payload.doday,
            progress: action.payload.progress,
          },
          ...withoutTaken,
        ],
      };
    case actions.ActionConstants.UNTAKE_DODAY_OPTIMISTIC_UPDATE:
      if (!state.dodays.length) return state;
      // remove progress
      let untakenindex = 0;
      const untakenDoday = state.dodays.find((doday, index) => {
        if (doday.did === action.payload) {
          untakenindex = index;
          return true;
        }
        return false;
      });
      const withoutUntaken = state.dodays.filter(
        doday => doday.did !== action.payload
      );
      const { progress, ...untaken } = untakenDoday!;
      withoutUntaken.splice(untakenindex, 0, untaken);
      return {
        dodays: withoutUntaken,
      };
    case actions.ActionConstants.DELETE_DODAY_OPTIMISTIC_UPDATE:
      if (!state.dodays.length) return state;
      // remove doday with action.payload.did
      const deleted = state.dodays.filter(
        doday => doday.did !== action.payload
      );
      return {
        dodays: [...deleted],
      };
    default:
      return state;
  }
};

export const builderReducer = (
  state = initialActivityBuilderState,
  action: actions.ActionTypes
): ActivityBuilderState => {
  switch (action.type) {
    case actions.ActionConstants.SET_ACTIVITY_TYPE:
      return {
        ...state,
        activityType: action!.payload,
      };
    case actions.ActionConstants.PIN_ACTIVITY:
      return {
        ...state,
        pinned: action!.payload,
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
    case BuilderActionConstants.CLEAR_BUILDER:
      return initialActivityBuilderState;
    default:
      return state;
  }
};

export interface ActivityBuilderState extends BaseToolBuilderState {
  activityType?: ActivityType;
  pinned?: boolean;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
}

export interface ActivityToolState extends BaseToolState {
  dodays: Activity[];
}
