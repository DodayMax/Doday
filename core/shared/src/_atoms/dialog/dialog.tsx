import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CloseDialogAction } from '@doday/duck';

export interface DodayDialogContainerProps {
  open: boolean;
  title: string;
  message?: string;
  actions: React.ReactNode[];
  closeDialog: () => CloseDialogAction;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" {...props} />;
});

export interface DodayDialogProps {
  open?: boolean;
  title?: string;
  message?: string;
  actions?: React.ReactNode[];
}

export const DodayDialogComponent = (
  props: DodayDialogProps & DodayDialogContainerProps
) => {
  function handleClose() {
    props.closeDialog();
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition as any}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
      {props.message && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>{props.actions}</DialogActions>
    </Dialog>
  );
};
