import actions, {
  DodayDetailsActionConstants,
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
import { activity, ProgressLike } from '@doday/lib';

describe('Doday details action creators', () => {
  it('Set loading state for doday details peace of state', () => {
    const loading = true;
    const expectedActionObject: SetDodayDetailsLoadingStateAction = {
      type: DodayDetailsActionConstants.SET_LOADING_STATE,
      payload: loading,
    };
    expect(actions.setDodayDetailsLoadingStateActionCreator(loading)).toEqual(
      expectedActionObject
    );
  });

  it('Fetch selected doday', () => {
    const did = 'test did';
    const expectedActionObject: FetchSelectedDodayAction = {
      type: DodayDetailsActionConstants.FETCH_SELECTED_DODAY,
      payload: did,
    };
    expect(actions.fetchSelectedDodayActionCreator(did)).toEqual(
      expectedActionObject
    );
  });

  it('Fetch selected doday with progress node', () => {
    const did = 'test did';
    const expectedActionObject: FetchSelectedProgressAction = {
      type: DodayDetailsActionConstants.FETCH_SELECTED_PROGRESS,
      payload: did,
    };
    expect(actions.fetchSelectedProgressActionCreator(did)).toEqual(
      expectedActionObject
    );
  });

  it('Set selected doday to store', () => {
    const expectedActionObject: SetSelectedDodayAction = {
      type: DodayDetailsActionConstants.SET_SELECTED_DODAY,
      payload: activity,
    };
    expect(actions.setSelectedDodayActionCreator(activity)).toEqual(
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
      type: DodayDetailsActionConstants.UPDATE_SELECTED_DODAY,
      payload: updates,
    };
    expect(actions.updateSelectedDodayActionCreator(updates)).toEqual(
      expectedActionObject
    );
  });

  it('Clear selected doday from store', () => {
    const expectedActionObject: ClearSelectedDodayAction = {
      type: DodayDetailsActionConstants.CLEAR_SELECTED_DODAY,
    };
    expect(actions.clearSelectedDodayActionCreator()).toEqual(
      expectedActionObject
    );
  });

  it('Set dirty flag for selected doday when it has some updates', () => {
    const status = true;
    const expectedActionObject: SetDirtyStatusAction = {
      type: DodayDetailsActionConstants.SET_DIRTY_STATUS,
      payload: status,
    };
    expect(actions.setDirtyStatusActionCreator(status)).toEqual(
      expectedActionObject
    );
  });

  it('Set dirty flag for selected doday when it has some updates', () => {
    const status = true;
    const expectedActionObject: SetDirtyStatusAction = {
      type: DodayDetailsActionConstants.SET_DIRTY_STATUS,
      payload: status,
    };
    expect(actions.setDirtyStatusActionCreator(status)).toEqual(
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
      type: DodayDetailsActionConstants.REQUEST_FOR_SET_UPDATES,
      payload,
    };
    expect(actions.requestForSetUpdatesActionCreator(payload.progress)).toEqual(
      expectedActionObject
    );
  });

  it('Set updates for selected doday to store', () => {
    const updates: Partial<ProgressLike> = {
      completed: false,
    };
    const expectedActionObject: SetUpdatesForSelectedDodayAction = {
      type: DodayDetailsActionConstants.SET_UPDATES_FOR_SELECTED_DODAY,
      payload: updates,
    };
    expect(actions.setUpdatesForSelectedDodayActionCreator(updates)).toEqual(
      expectedActionObject
    );
  });

  it('Clear all updates and dirty status for selected doday', () => {
    const expectedActionObject: ClearDodayDetailsDirtyStuffAction = {
      type: DodayDetailsActionConstants.CLEAR_DIRTY_STUFF,
    };
    expect(actions.clearDodayDetailsDirtyStuffActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
