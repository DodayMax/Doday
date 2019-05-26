import {
  ActionConstants,
  actionCreators,
  SetParsedUrlMetadataObjectAction,
  ParseUrlMetadataAction,
  SetActivityTypeAction,
  ClearParsedUrlMetadataAction,
} from '../actions';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';
import { DodayType } from '@root/tools/types';
import {
  SetActivitiesAction,
  FetchActivitiesAction,
  setActivitiesActionCreator,
  SetParseUrlMetadataProgressAction,
} from '../actions';
import { Activity } from '../../entities/activity';
import {
  activity,
  deserializedResource,
} from '@root/lib/common-interfaces/fake-data';
import { ActivityType } from '@root/lib/common-interfaces';
import { Resource } from '@root/lib/models/entities/resource';

describe('Activity tool action creators tests', () => {
  it('fetch activities', () => {
    const params: DodaysWithProgressQueryParams = {
      dodaytype: DodayType.Activity,
    };
    const expectedActionObject: FetchActivitiesAction = {
      type: ActionConstants.FETCH_ACTIVITIES,
      payload: params,
    };
    expect(actionCreators.fetchActivitiesActionCreator(params)).toEqual(
      expectedActionObject
    );
  });

  it('set activities to store', () => {
    const activities: Activity[] = [activity];
    const expectedActionObject: SetActivitiesAction = {
      type: ActionConstants.SET_ACTIVITIES,
      payload: activities,
    };
    expect(setActivitiesActionCreator(activities)).toEqual(
      expectedActionObject
    );
  });

  it('parse url', () => {
    const url = 'https://...';
    const expectedActionObject: ParseUrlMetadataAction = {
      type: ActionConstants.PARSE_URL,
      payload: url,
    };
    expect(actionCreators.parseUrlMetadataActionCreator(url)).toEqual(
      expectedActionObject
    );
  });

  it('set url parsing progress state', () => {
    const state = true;
    const expectedActionObject: SetParseUrlMetadataProgressAction = {
      type: ActionConstants.SET_URL_PARSING_PROGRESS,
      payload: state,
    };
    expect(actionCreators.setUrlParsingProgressActionCreator(state)).toEqual(
      expectedActionObject
    );
  });

  it('set parsed object from url', () => {
    const resource: Resource = deserializedResource;
    const expectedActionObject: SetParsedUrlMetadataObjectAction = {
      type: ActionConstants.SET_PARSED_URL_METADATA_OBJECT,
      payload: resource,
    };
    expect(
      actionCreators.setParsedUrlMetadataObjectActionCreator(resource)
    ).toEqual(expectedActionObject);
  });

  it('set activity type to store', () => {
    const type: ActivityType = 'read';
    const expectedActionObject: SetActivityTypeAction = {
      type: ActionConstants.SET_ACTIVITY_TYPE,
      payload: type,
    };
    expect(actionCreators.setActivityTypeActionCreator(type)).toEqual(
      expectedActionObject
    );
  });

  it('clear parsed metadata from store', () => {
    const expectedActionObject: ClearParsedUrlMetadataAction = {
      type: ActionConstants.CLEAR_PARSED_URL_METADATA,
    };
    expect(actionCreators.clearParsedUrlMetadataActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
