import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
  FetchActivitiesAction,
  setActivitiesActionCreator,
  FetchActivitiesWithProgressAction,
} from './actions';
import { detectActivityType } from '@root/lib/utils/regexp';
import { parseMetadataFromUrl } from '@root/lib/utils/api-utils';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';
import {
  DodaysWithProgressQueryParams,
  DodaysQueryParams,
} from '@root/services/api/dodays/queries';
import { api } from '@root/services';

/**
 * Fetch Activities(Dodays) nodes with query params
 *
 * @param {FetchActivitiesAction} action
 */
function* fetchActivitiesActionSaga(action: FetchActivitiesAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const params: DodaysQueryParams = action.payload;
  const activities = yield call(api.dodays.queries.fetchDodays, params);
  yield put(setActivitiesActionCreator(activities));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Fetch Activities(Dodays) with Progress nodes with query params
 *
 * @param {FetchActivitiesWithProgressAction} action
 */
function* fetchActivitiesWithProgressActionSaga(
  action: FetchActivitiesWithProgressAction
) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const params: DodaysWithProgressQueryParams = action.payload;
  const activities = yield call(
    api.dodays.queries.fetchDodaysWithProgress,
    params
  );
  yield put(setActivitiesActionCreator(activities));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Parse url metadata from input url
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
  takeLatest(ActionConstants.FETCH_ACTIVITIES, fetchActivitiesActionSaga),
  takeLatest(
    ActionConstants.FETCH_ACTIVITIES_WITH_PROGRESS,
    fetchActivitiesWithProgressActionSaga
  ),
];
