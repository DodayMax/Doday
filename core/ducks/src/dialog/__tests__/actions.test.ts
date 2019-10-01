import actions, {
  OpenDialogAction,
  DialogActionConstants,
  CloseDialogAction,
} from '../actions';

describe('Dialog action creators', () => {
  it('open dialog', () => {
    const payload: any = {
      open: true,
      title: 'Title',
      message: 'Test message',
      actions: [],
    };
    const expectedActionObject: OpenDialogAction = {
      type: DialogActionConstants.OPEN,
      payload,
    };
    expect(actions.openDialogActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('close dialog', () => {
    const expectedActionObject: CloseDialogAction = {
      type: DialogActionConstants.CLOSE,
    };
    expect(actions.closeDialogActionCreator()).toEqual(expectedActionObject);
  });
});
