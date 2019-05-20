import {
  actionCreators,
  ActionConstants,
  SetDodayDetailsLoadingStateAction,
  FetchSelectedDodayAction,
  FetchSelectedProgressAction,
  SetSelectedDodayAction,
  UpdateSelectedDodayProgressAction,
  ClearSelectedDodayAction,
  SetDirtyStatusAction,
  RequestForSetUpdatesAction,
  SetUpdatesForSelectedDodayAction,
  ClearDodayDetailsDirtyStuffAction,
} from '../actions';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { ProgressLike, SerializedProgressLike } from '@root/tools/types';
import { deserializeActivityProgress } from '@root/tools/activity/entities/activity';

describe('Doday details action creators', () => {
  it('Set loading state for doday details peace of state', () => {
    const loading = true;
    const expectedActionObject: SetDodayDetailsLoadingStateAction = {
      type: ActionConstants.SET_LOADING_STATE,
      payload: loading,
    };
    expect(
      actionCreators.setDodayDetailsLoadingStateActionCreator(loading)
    ).toEqual(expectedActionObject);
  });

  it('Fetch selected doday', () => {
    const did = 'test did';
    const expectedActionObject: FetchSelectedDodayAction = {
      type: ActionConstants.FETCH_SELECTED_DODAY,
      payload: did,
    };
    expect(actionCreators.fetchSelectedDodayActionCreator(did)).toEqual(
      expectedActionObject
    );
  });

  it('Fetch selected doday with progress node', () => {
    const did = 'test did';
    const expectedActionObject: FetchSelectedProgressAction = {
      type: ActionConstants.FETCH_SELECTED_PROGRESS,
      payload: did,
    };
    expect(actionCreators.fetchSelectedProgressActionCreator(did)).toEqual(
      expectedActionObject
    );
  });

  it('Set selected doday to store', () => {
    const expectedActionObject: SetSelectedDodayAction = {
      type: ActionConstants.SET_SELECTED_DODAY,
      payload: activity,
    };
    expect(actionCreators.setSelectedDodayActionCreator(activity)).toEqual(
      expectedActionObject
    );
  });

  it('Update selected doday progress in store', () => {
    const updates: Partial<ProgressLike> = {
      completed: true,
    };
    const expectedActionObject: UpdateSelectedDodayProgressAction = {
      type: ActionConstants.UPDATE_SELECTED_DODAY_PROGRESS,
      payload: updates,
    };
    expect(
      actionCreators.updateSelectedDodayProgressActionCreator(updates)
    ).toEqual(expectedActionObject);
  });

  it('Clear selected doday from store', () => {
    const expectedActionObject: ClearSelectedDodayAction = {
      type: ActionConstants.CLEAR_SELECTED_DODAY,
    };
    expect(actionCreators.clearSelectedDodayActionCreator()).toEqual(
      expectedActionObject
    );
  });

  it('Set dirty flag for selected doday when it has some updates', () => {
    const status = true;
    const expectedActionObject: SetDirtyStatusAction = {
      type: ActionConstants.SET_DIRTY_STATUS,
      payload: status,
    };
    expect(actionCreators.setDirtyStatusActionCreator(status)).toEqual(
      expectedActionObject
    );
  });

  it('Set dirty flag for selected doday when it has some updates', () => {
    const status = true;
    const expectedActionObject: SetDirtyStatusAction = {
      type: ActionConstants.SET_DIRTY_STATUS,
      payload: status,
    };
    expect(actionCreators.setDirtyStatusActionCreator(status)).toEqual(
      expectedActionObject
    );
  });

  it('Request updates for selected doday', () => {
    const updates: Partial<SerializedProgressLike> = {
      completed: false,
    };
    const payload = {
      progress: updates,
      deserialize: deserializeActivityProgress,
    };
    const expectedActionObject: RequestForSetUpdatesAction = {
      type: ActionConstants.REQUEST_FOR_SET_UPDATES,
      payload,
    };
    expect(
      actionCreators.requestForSetUpdatesActionCreator(
        payload.progress,
        payload.deserialize
      )
    ).toEqual(expectedActionObject);
  });

  it('Set updates for selected doday to store', () => {
    const updates: Partial<ProgressLike> = {
      completed: false,
    };
    const expectedActionObject: SetUpdatesForSelectedDodayAction = {
      type: ActionConstants.SET_UPDATES_FOR_SELECTED_DODAY,
      payload: updates,
    };
    expect(
      actionCreators.setUpdatesForSelectedDodayActionCreator(updates)
    ).toEqual(expectedActionObject);
  });

  it('Clear all updates and dirty status for selected doday', () => {
    const expectedActionObject: ClearDodayDetailsDirtyStuffAction = {
      type: ActionConstants.CLEAR_DIRTY_STUFF,
    };
    expect(actionCreators.clearDodayDetailsDirtyStuffActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
