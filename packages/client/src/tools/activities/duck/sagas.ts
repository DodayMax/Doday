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
  CreateActivityAction,
  CreateAndTakeActivityAction,
  FetchPublishedActivitiesAction,
  setPublishedActivitiesActionCreator,
} from './actions';
import { detectActivityType } from '@root/lib/utils/regexp';
import { parseMetadataFromUrl } from '@root/lib/utils/api-utils';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';
import {
  DodaysWithProgressQueryParams,
  DodaysQueryParams,
} from '@root/services/api/dodays/queries';
import { api } from '@root/services';
import { setBuilderSuccessFlag } from '@root/ducks/builder/actions';

/**
 * Fetch Activities with Progress nodes with query params
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
  if (!params.completed) {
    yield put(setActivitiesInProgressActionCreator(activities));
  } else {
    yield put(setCompletedActivitiesActionCreator(activities));
  }
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Fetch published Activity nodes with query params
 *
 * @param {FetchPublishedActivitiesAction} action
 */
function* fetchPublishedActivitiesActionSaga(
  action: FetchPublishedActivitiesAction
) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const params: DodaysQueryParams = action.payload;
  const activities = yield call(api.dodays.queries.fetchDodays, params);
  yield put(setPublishedActivitiesActionCreator(activities));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Parse url metadata from input url
 *
 * @param {CreateActivityAction} action
 */
function* createActivityActionSaga(action: CreateActivityAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.createDodayMutation, action.payload);
  yield put(setBuilderSuccessFlag(true));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Parse url metadata from input url
 *
 * @param {CreateAndTakeActivityAction} action
 */
function* createAndTakeActivityActionSaga(action: CreateAndTakeActivityAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.createAndTakeDodayMutation, action.payload);
  yield put(setBuilderSuccessFlag(true));
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
  takeLatest(ActionConstants.CREATE_ACTIVITY, createActivityActionSaga),
  takeLatest(
    ActionConstants.CREATE_AND_TAKE_ACTIVITY,
    createAndTakeActivityActionSaga
  ),
  takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga),
  takeLatest(
    ActionConstants.FETCH_ACTIVITIES_WITH_PROGRESS,
    fetchActivitiesWithProgressActionSaga
  ),
  takeLatest(
    ActionConstants.FETCH_PUBLISHED_ACTIVITIES,
    fetchPublishedActivitiesActionSaga
  ),
];
