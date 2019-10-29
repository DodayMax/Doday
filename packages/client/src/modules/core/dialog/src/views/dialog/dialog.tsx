import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { dialogStateSelector, closeDialogActionCreator } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { DialogState } from '@doday/lib';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" {...props} />;
});

export const DodayDialog = () => {
  const dispatch = useDispatch();
  const { open, title, message, actions }: DialogState = useSelector(
    dialogStateSelector
  );

  const handleClose = () => {
    dispatch(closeDialogActionCreator());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition as any}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      {message && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
