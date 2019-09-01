import {
  ActionConstants,
  optimisticUpdatesActionCreators,
  CreateDodayOptimisticUpdateAction,
  UpdateDodayOptimisticUpdateAction,
  TakeDodayOptimisticUpdateAction,
  UntakeDodayOptimisticUpdateAction,
  DeleteDodayOptimisticUpdateAction,
} from '../actions';
import { doday, progress } from '@doday/lib';

describe('Activities optimistic sideeffects', () => {
  it('create doday optimistic update', () => {
    const payload = {
      doday: doday,
    };
    const expectedActionObject: CreateDodayOptimisticUpdateAction = {
      type: ActionConstants.CREATE_DODAY_OPTIMISTIC_UPDATE,
      payload,
    };
    expect(
      optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
        payload
      )
    ).toEqual(expectedActionObject);
  });

  it('update doday optimistic update', () => {
    const updates = {
      did: doday.did,
      updates: {
        doday: doday,
        progress: progress,
      },
    };
    const expectedActionObject: UpdateDodayOptimisticUpdateAction = {
      type: ActionConstants.UPDATE_DODAY_OPTIMISTIC_UPDATE,
      payload: updates,
    };
    expect(
      optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
        updates
      )
    ).toEqual(expectedActionObject);
  });

  it('take doday optimistic update', () => {
    const payload = {
      doday,
      progress: progress,
    };
    const expectedActionObject: TakeDodayOptimisticUpdateAction = {
      type: ActionConstants.TAKE_DODAY_OPTIMISTIC_UPDATE,
      payload,
    };
    expect(
      optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
        payload
      )
    ).toEqual(expectedActionObject);
  });

  it('untake doday optimistic update', () => {
    const did = doday.did;
    const expectedActionObject: UntakeDodayOptimisticUpdateAction = {
      type: ActionConstants.UNTAKE_DODAY_OPTIMISTIC_UPDATE,
      payload: did,
    };
    expect(
      optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
        did
      )
    ).toEqual(expectedActionObject);
  });

  it('delete doday optimistic update', () => {
    const did = doday.did;
    const expectedActionObject: DeleteDodayOptimisticUpdateAction = {
      type: ActionConstants.DELETE_DODAY_OPTIMISTIC_UPDATE,
      payload: did,
    };
    expect(
      optimisticUpdatesActionCreators.deleteDodayOptimisticUpdateActionCreator(
        did
      )
    ).toEqual(expectedActionObject);
  });
});
