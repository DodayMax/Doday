import { call, put } from 'redux-saga/effects';
import {
  ActionConstants,
  actionCreators,
  FetchActivitiesAction,
  ParseUrlMetadataAction,
} from '../actions';
import { api } from '@root/services';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';
import {
  fetchActivitiesActionSaga,
  parseUrlMetadataActionSaga,
} from '../sagas';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';
import {
  activity,
  doday,
  deserializedResource,
} from '@root/lib/common-interfaces/fake-data';
import { detectActivityType } from '@root/lib/utils';
import { parseMetadataFromUrl } from '@root/lib/utils/api-utils';
import { Activity } from '@root/lib/models/entities/activity';
import { DodayType } from '@root/lib/models/entities/common';

describe('Test Activities sagas', () => {
  it('fetchActivitiesActionSaga', () => {
    const activities: Activity[] = [doday];
    const activitiesWithProgress: Activity[] = [activity];
    const params: DodaysWithProgressQueryParams = {
      dodaytype: DodayType.Activity,
    };
    const action: FetchActivitiesAction = {
      type: ActionConstants.FETCH_ACTIVITIES,
      payload: params,
    };
    const gen = fetchActivitiesActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayAppLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodays, action.payload)
    );
    expect(gen.next(activities).value).toEqual(
      call(api.dodays.queries.fetchDodaysWithProgress, action.payload)
    );
    expect(gen.next(activitiesWithProgress).value).toEqual(
      put(
        actionCreators.setActivitiesActionCreator(
          activities.concat(activitiesWithProgress)
        )
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayAppLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('parseUrlMetadataActionSaga', () => {
    const url = 'https://...';
    const metadata = deserializedResource;
    const activityType = detectActivityType(metadata);
    const action: ParseUrlMetadataAction = {
      type: ActionConstants.PARSE_URL,
      payload: url,
    };
    const gen = parseUrlMetadataActionSaga(action);
    expect(gen.next().value).toEqual(
      put(actionCreators.setUrlParsingProgressActionCreator(true))
    );
    expect(gen.next().value).toEqual(
      call(parseMetadataFromUrl, action.payload)
    );
    expect(gen.next(metadata).value).toEqual(
      call(detectActivityType, metadata)
    );
    expect(gen.next(activityType).value).toEqual(
      put(actionCreators.setParsedUrlMetadataObjectActionCreator(metadata))
    );
    expect(gen.next().value).toEqual(
      put(actionCreators.setActivityTypeActionCreator(activityType))
    );
    expect(gen.next().value).toEqual(
      put(actionCreators.setUrlParsingProgressActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('parseUrlMetadataActionSaga with bad url', () => {
    const url = 'https://...';
    const metadata = undefined;
    const activityType = detectActivityType(metadata);
    const action: ParseUrlMetadataAction = {
      type: ActionConstants.PARSE_URL,
      payload: url,
    };
    const gen = parseUrlMetadataActionSaga(action);
    expect(gen.next().value).toEqual(
      put(actionCreators.setUrlParsingProgressActionCreator(true))
    );
    expect(gen.next().value).toEqual(
      call(parseMetadataFromUrl, action.payload)
    );
    expect(gen.next(metadata).value).toEqual(
      call(detectActivityType, metadata)
    );
    expect(gen.next().value).toEqual(
      put(actionCreators.setUrlParsingProgressActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });
});
