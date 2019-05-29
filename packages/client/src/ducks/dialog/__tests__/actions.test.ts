import {
  OpenDialogAction,
  ActionConstants,
  actionCreators,
  CloseDialogAction,
} from '../actions';
import { DodayDialogProps } from '@root/components/shared';

describe('Dialog action creators', () => {
  it('open dialog', () => {
    const payload: DodayDialogProps = {
      open: true,
      title: 'Title',
      message: 'Test message',
      actions: [],
    };
    const expectedActionObject: OpenDialogAction = {
      type: ActionConstants.OPEN,
      payload,
    };
    expect(actionCreators.openDialogActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('close dialog', () => {
    const expectedActionObject: CloseDialogAction = {
      type: ActionConstants.CLOSE,
    };
    expect(actionCreators.closeDialogActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
