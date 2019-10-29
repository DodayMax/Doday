import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { openToastActionCreator } from '@root/modules/core/toast/src/redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(8),
      right: theme.spacing(8),
      zIndex: theme.zIndex.drawer + 3,
    },
  })
);

export interface SpeedDialProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

const mockedActions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <DeleteIcon />, name: 'Toast', action: openToastActionCreator },
];

export const DodaySpeedDial = (props: SpeedDialProps) => {
  const dispatch = useDispatch();
  const css = useStyles(undefined);
  const { open, handleClose, handleOpen } = props;

  const handleClick = (item: any) => {
    dispatch(
      item.action({
        open: true,
        messages: ['Hello there'],
      })
    );
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Doday speed dial button"
        className={css.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {mockedActions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action)}
          />
        ))}
      </SpeedDial>
    </>
  );
};
