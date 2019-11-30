import * as React from 'react';
import MuiSnackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import { SnackbarContent } from './snackbar-content';
import { useDispatch, useSelector } from 'react-redux';
import { toastStateSelector, closeToastActionCreator } from '@redux/toast';

export const Snackbar = (props: SnackbarProps) => {
  const dispatch = useDispatch();
  const toastState = useSelector(toastStateSelector);

  const handleClose = () => dispatch(closeToastActionCreator());

  return (
    <MuiSnackbar
      open={toastState.open}
      autoHideDuration={toastState.autoHideDuration}
      onClose={handleClose}
      {...props}
    >
      <SnackbarContent
        onClose={handleClose}
        variant={toastState.type}
        message={toastState.messages.join('\n')}
        {...props.ContentProps}
      />
    </MuiSnackbar>
  );
};

Snackbar.defaultProps = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};
