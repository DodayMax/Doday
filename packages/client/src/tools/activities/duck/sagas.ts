import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
  FetchActivitiesWithProgressAction,
  setActivitiesInProgressActionCreator,
  setCompletedActivitiesActionCreator,
} from './actions';
import { detectActivityType } from '@root/lib/utils/regexp';
import { parseMetadataFromUrl } from '@root/lib/utils/api-utils';
import { setAppLoadingState } from '@root/ducks/doday-app/actions';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';
import { api } from '@root/services';

/**
 * Fetch activities with Progress nodes with params
 *
 * @param {FetchActivitiesWithProgressAction} action
 */
function* fetchActivitiesWithProgressActionSaga(
  action: FetchActivitiesWithProgressAction
) {
  yield put(setAppLoadingState(true));
  const params: DodaysWithProgressQueryParams = action.payload;
  const activities = yield call(
    api.dodays.queries.fetchDodaysWithProgress,
    params
  );
  if (!params.completed) {
    yield put(setActivitiesInProgressActionCreator(activities));
  } else {
    yield put(setCompletedActivitiesActionCreator(activities));
  }
  yield put(setAppLoadingState(false));
}

/**
 * Fetch activity types for builder saga
 *
 * @param {ParseUrlMetadataAction} action
 */
function* parseUrlMetadataSaga(action: ParseUrlMetadataAction) {
  yield put(setUrlParsingProgressActionCreator(true));
  const metadata = yield call(parseMetadataFromUrl, action.payload);
  const activityType = detectActivityType(metadata);
  if (metadata) {
    yield put(setParsedUrlMetadataObjectActionCreator(metadata));
    yield put(setActivityTypeActionCreator(activityType));
  }
  yield put(setUrlParsingProgressActionCreator(false));
}

export default [
  takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga),
  takeLatest(
    ActionConstants.FETCH_ACTIVITIES_WITH_PROGRESS,
    fetchActivitiesWithProgressActionSaga
  ),
];
