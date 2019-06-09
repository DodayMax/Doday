import {
  CreateDodayAction,
  ActionConstants,
  actionCreators,
  CreateAndTakeDodayAction,
  TakeDodayAction,
  UpdateDodayAction,
  UntakeDodayAction,
  DeleteDodayAction,
} from '../actions';
import {
  deserializedActivity,
  deserializedResource,
  deserialzedActivityProgress,
  partialProgress,
  doday,
} from '@root/lib/common-interfaces/fake-data';
import { DodayType } from '@root/lib/models/entities/common';

describe('test api action creators', () => {
  it('createDodayActionCreator', () => {
    const newDoday = {
      doday: deserializedActivity,
      resource: deserializedResource,
    };
    const expectedActionObject: CreateDodayAction = {
      type: ActionConstants.CREATE_DODAY,
      payload: newDoday,
    };
    expect(actionCreators.createDodayActionCreator(newDoday)).toEqual(
      expectedActionObject
    );
  });

  it('createAndTakeDodayActionCreator', () => {
    const newDoday = {
      doday: deserializedActivity,
      progress: deserialzedActivityProgress,
      resource: deserializedResource,
    };
    const expectedActionObject: CreateAndTakeDodayAction = {
      type: ActionConstants.CREATE_AND_TAKE_DODAY,
      payload: newDoday,
    };
    expect(actionCreators.createAndTakeDodayActionCreator(newDoday)).toEqual(
      expectedActionObject
    );
  });

  it('takeDodayActionCreator', () => {
    const payload = {
      doday: doday,
      progress: deserialzedActivityProgress,
    };
    const expectedActionObject: TakeDodayAction = {
      type: ActionConstants.TAKE_DODAY,
      payload,
    };
    expect(actionCreators.takeDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('updateDodayActionCreator update progress', () => {
    const payload = {
      did: 'string',
      type: DodayType.Activity,
      updates: {
        progress: partialProgress,
      },
    };
    const expectedActionObject: UpdateDodayAction = {
      type: ActionConstants.UPDATE_DODAY,
      payload,
    };
    expect(actionCreators.updateDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('untakeDodayActionCreator', () => {
    const payload = {
      did: 'string',
      type: DodayType.Activity,
    };
    const expectedActionObject: UntakeDodayAction = {
      type: ActionConstants.UNTAKE_DODAY,
      payload,
    };
    expect(actionCreators.untakeDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('deleteDodayActionCreator', () => {
    const payload = {
      did: 'string',
      type: DodayType.Activity,
    };
    const expectedActionObject: DeleteDodayAction = {
      type: ActionConstants.DELETE_DODAY,
      payload,
    };
    expect(actionCreators.deleteDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });
});
