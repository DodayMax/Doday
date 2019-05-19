import { call, put, select } from 'redux-saga/effects';
import { api } from '@root/services';
import { activity } from '@root/lib/common-interfaces/fake-data';
import {
  FetchSelectedDodayAction,
  ActionConstants,
  setSelectedDodayActionCreator,
  FetchSelectedProgressAction,
  RequestForSetUpdatesAction,
  setUpdatesForSelectedDodayActionCreator,
  setDirtyStatusActionCreator,
} from '../actions';
import {
  fetchSelectedDodayActionSaga,
  fetchSelectedProgressActionSaga,
  setUpdatesAndDirtyStatusSaga,
} from '../sagas';
import { ProgressLike } from '@root/tools/types';
import { updatesSelector } from '../selectors';
import { isDirty } from '@root/lib/utils';

describe("Test DodayDetails's sagas", () => {
  it('fetchSelectedDodayActionSaga', () => {
    const action: FetchSelectedDodayAction = {
      type: ActionConstants.FETCH_SELECTED_DODAY,
      payload: activity.did,
    };
    const gen = fetchSelectedDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodayByDID, action.payload)
    );
    expect(gen.next(activity).value).toEqual(
      put(setSelectedDodayActionCreator(activity))
    );
  });

  it('fetchSelectedProgressActionSaga', () => {
    const action: FetchSelectedProgressAction = {
      type: ActionConstants.FETCH_SELECTED_PROGRESS,
      payload: activity.did,
    };
    const gen = fetchSelectedProgressActionSaga(action);
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodayWithProgressByDID, action.payload)
    );
    expect(gen.next(activity).value).toEqual(
      put(setSelectedDodayActionCreator(activity))
    );
  });

  it('setUpdatesAndDirtyStatusSaga', () => {
    const updates: Partial<ProgressLike> = {
      completed: false,
    };
    const action: RequestForSetUpdatesAction = {
      type: ActionConstants.REQUEST_FOR_SET_UPDATES,
      payload: updates,
    };
    const gen = setUpdatesAndDirtyStatusSaga(action);
    const dirty = isDirty(activity, updates);
    expect(gen.next().value).toEqual(
      put(setUpdatesForSelectedDodayActionCreator(action.payload))
    );
    expect(gen.next().value).toEqual(select(updatesSelector));
    expect(gen.next().value).toEqual(select(updatesSelector));
    expect(gen.next().value).toEqual(call(isDirty, activity, updates));
    expect(gen.next().value).toEqual(put(setDirtyStatusActionCreator(dirty)));
  });
});
