import { call, put } from 'redux-saga/effects';
import {
  ActionConstants,
  actionCreators,
  FetchActivitiesAction,
  ParseUrlMetadataAction,
} from '../actions';
import api, { DodaysWithProgressQueryParams } from '@doday/api';
import {
  fetchActivitiesActionSaga,
  parseUrlMetadataActionSaga,
} from '../sagas';
import ducks from '@doday/ducks';
import {
  activity,
  doday,
  deserializedResource,
  detectActivityType,
  parseMetadataFromUrl,
  Activity,
  NodeType,
} from '@doday/lib';

describe('Test Activities sagas', () => {
  it('fetchActivitiesActionSaga', () => {
    const activities: Activity[] = [doday];
    const activitiesWithProgress: Activity[] = [activity];
    const params: DodaysWithProgressQueryParams = {
      dodaytype: NodeType.Activity,
    };
    const action: FetchActivitiesAction = {
      type: ActionConstants.FETCH_ACTIVITIES,
      payload: params,
    };
    const gen = fetchActivitiesActionSaga(action);
    expect(gen.next().value).toEqual(
      put(ducks.sidebar.actions.setSidebarLoadingStateActionCreator(true))
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
      put(ducks.sidebar.actions.setSidebarLoadingStateActionCreator(false))
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
