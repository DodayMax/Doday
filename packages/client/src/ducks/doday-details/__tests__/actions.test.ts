import {
  actionCreators,
  ActionConstants,
  SetDodayDetailsLoadingStateAction,
  FetchSelectedDodayAction,
  FetchSelectedProgressAction,
  SetSelectedDodayAction,
  ClearSelectedDodayAction,
  UpdateSelectedDodayAction,
  SetDirtyStatusAction,
  RequestForSetUpdatesAction,
  SetUpdatesForSelectedDodayAction,
  ClearDodayDetailsDirtyStuffAction,
} from '../actions';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { ProgressLike } from '@root/tools/types';

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

  it('Update selected doday in store', () => {
    const updates = {
      progress: {
        completed: true,
      },
    };
    const expectedActionObject: UpdateSelectedDodayAction = {
      type: ActionConstants.UPDATE_SELECTED_DODAY,
      payload: updates,
    };
    expect(actionCreators.updateSelectedDodayActionCreator(updates)).toEqual(
      expectedActionObject
    );
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
    const updates: Partial<ProgressLike> = {
      completed: false,
    };
    const payload = {
      progress: updates,
    };
    const expectedActionObject: RequestForSetUpdatesAction = {
      type: ActionConstants.REQUEST_FOR_SET_UPDATES,
      payload,
    };
    expect(
      actionCreators.requestForSetUpdatesActionCreator(payload.progress)
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
