import * as React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from './toast-content';

export const Snackbar = ({
  open,
  onClose,
  autoHideDuration,
  messages,
  type,
  SnackbarContentProps,
  ...props
}: any) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      {...props}
    >
      <SnackbarContent
        onClose={onClose}
        variant={type}
        message={messages.join('\n')}
        {...SnackbarContentProps}
      />
    </MuiSnackbar>
  );
};

Snackbar.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};
