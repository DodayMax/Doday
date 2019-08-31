import { connect } from 'react-redux';
import { DialogState } from '@root/lib/models';
import {
  OpenDialogAction,
  actionCreators,
  CloseDialogAction,
} from '@root/ducks/dialog/actions';

export type WithDialog = {
  openDialog: (options: DialogState) => OpenDialogAction;
  closeDialog: () => CloseDialogAction;
};

export const withDialog = WrappedComponent =>
  connect(
    null,
    {
      openDialog: actionCreators.openDialogActionCreator,
      closeDialog: actionCreators.closeDialogActionCreator,
    }
  )(WrappedComponent);
