import { connect } from 'react-redux';
import { DialogState } from '@doday/lib';
import ducks, { OpenDialogAction, CloseDialogAction } from '@doday/ducks';

export type WithDialog = {
  openDialog: (options: DialogState) => OpenDialogAction;
  closeDialog: () => CloseDialogAction;
};

export const withDialog = (WrappedComponent: React.ComponentType<any>) =>
  connect(
    null,
    {
      openDialog: ducks.dialog.actions.openDialogActionCreator,
      closeDialog: ducks.dialog.actions.closeDialogActionCreator,
    }
  )(WrappedComponent);
