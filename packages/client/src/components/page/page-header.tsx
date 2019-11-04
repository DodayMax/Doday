import * as React from 'react';
import * as cuid from 'cuid';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  IconButton,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Menu,
  MenuItem,
  Box,
} from '@material-ui/core';
import { popFromStackActionCreator } from '@core/navigation';
import { AnimatedContext } from '../animated/animated';
import { LayoutContext } from '@root/modules/core/layout/src/views/layout';
import { LayoutType } from '@doday/lib';

const css = (theme: Theme) =>
  createStyles({
    headerContainer: {
      color: theme.palette.action.active,
      height: `${64}px`,
      boxSizing: 'border-box',
      padding: `0 ${theme.spacing(6)}px`,
    },
  });

export interface PageHeaderAction {
  title: string;
  action: () => void;
  className?: string;
}

interface PageHeaderProps extends Partial<RouteComponentProps> {
  status?: React.ReactElement<any>[];
  /** Use actions to add items to collapsed action menu */
  actions?: PageHeaderAction[];
  withClose?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const ITEM_HEIGHT = 48;

export const PageHeader = withStyles(css)(
  (props: PageHeaderProps & WithStyles) => {
    const dispatch = useDispatch();
    const [anchor, updateAnchor] = React.useState();
    const requestClose = React.useContext(AnimatedContext);
    const layoutType = React.useContext(LayoutContext);

    if (layoutType === LayoutType.Mobile) return null;

    const handleOpen = (event: React.MouseEvent<any>) =>
      updateAnchor(event.currentTarget);

    const handleClose = () => updateAnchor(undefined);

    const { status, actions, onClose, children, withClose, classes } = props;

    return (
      <Box className={classes.headerContainer}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {status}
        </Box>
        <Box
          width="100%"
          display="flex"
          flexGrow={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          {children}
          {actions && !!actions.length && (
            <>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={handleOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchor}
                open={!!anchor}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {actions.map(item => (
                  <MenuItem
                    key={cuid()}
                    onClick={() => {
                      handleClose();
                      item.action();
                    }}
                    className={item.className}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          {withClose && (
            <IconButton
              onClick={() => {
                if (requestClose) requestClose();
                setTimeout(() => {
                  dispatch(popFromStackActionCreator());
                  if (onClose) {
                    onClose();
                  }
                }, 200);
              }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    );
  }
);
