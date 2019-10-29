import * as React from 'react';
import classnames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiSnackbarContent, {
  SnackbarContentProps,
} from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { colors, ToastType } from '@doday/lib';
import { CloseToastAction } from '../../redux';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const css = (theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: colors.green.light,
    },
    error: {
      backgroundColor: colors.red.light,
    },
    info: {
      backgroundColor: theme.palette.background.paper,
    },
    warning: {
      backgroundColor: colors.yellow.light,
    },
    icon: {
      fontSize: '2rem',
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'pre-line',
      fontSize: '1.2rem',
    },
  });

interface SnackbarContentExtendedProps {
  onClose: () => CloseToastAction;
  variant: ToastType;
}

type Props = SnackbarContentExtendedProps & SnackbarContentProps & WithStyles;

export const SnackbarContent = withStyles(css)((props: Props) => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <MuiSnackbarContent
      className={classnames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classnames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
});
