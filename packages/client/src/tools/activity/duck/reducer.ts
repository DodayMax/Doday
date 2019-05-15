import * as builderActions from '@ducks/builder/actions';
import * as actions from './actions';
import { ActivityType } from '@root/lib/common-interfaces';
import { DodayType } from '@root/tools/types';
import { Activity } from '../entities/activity';

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
      let updatedindex = 0;
      const updated = state.dodays.find((doday, index) => {
        if (doday.did === action.payload.did) {
          updatedindex = index;
          return true;
        }
      });
      const withoutUpdated = state.dodays.filter(
        doday => doday.did !== action.payload.did
      );
      withoutUpdated.splice(updatedindex, 0, {
        ...updated,
        progress: action.payload.updates.progress
          ? {
              ...updated.progress,
              ...action.payload.updates.progress,
            }
          : undefined,
        resource: action.payload.updates.resource
          ? {
              ...updated.resource,
              ...action.payload.updates.resource,
            }
          : undefined,
      });
      return {
        dodays: withoutUpdated,
      };
    case actions.ActionConstants.TAKE_DODAY_OPTIMISTIC_UPDATE:
      const taken = state.dodays.find(
        doday => doday.did === action.payload.did
      );
      const withoutTaken = state.dodays.filter(
        doday => doday.did !== action.payload.did
      );

      return {
        dodays: [
          {
            ...taken,
            progress: action.payload.progress,
          },
          ...withoutTaken,
        ],
      };
    case actions.ActionConstants.UNTAKE_DODAY_OPTIMISTIC_UPDATE:
      // remove progress
      let untakenindex = 0;
      const untakenDoday = state.dodays.find((doday, index) => {
        if (doday.did === action.payload) {
          untakenindex = index;
          return true;
        }
      });
      const withoutUntaken = state.dodays.filter(
        doday => doday.did !== action.payload
      );
      const { progress, ...untaken } = untakenDoday;
      withoutUntaken.splice(untakenindex, 0, untaken);
      return {
        dodays: withoutUntaken,
      };
    case actions.ActionConstants.DELETE_DODAY_OPTIMISTIC_UPDATE:
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
  dodays: Activity[];
}
