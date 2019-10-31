import React from 'react';
import _ from 'lodash';
import { makeStyles, createStyles, Theme, Button } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { openToastActionCreator } from '@core/toast';
import {
  openDialogActionCreator,
  closeDialogActionCreator,
} from '@core/dialog';
import { creatableEntitiesLabelsSelector } from '@root/modules/init/ms/selectors';
import { SpeedDialSpot, ModuleType } from '@doday/lib';
import { Spot } from '@root/modules/module-wrapper';

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
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export interface SpeedDialContext {
  handleClose?: () => void;
}

const mockedActions = [
  { icon: <ShareIcon />, name: 'Dialog', action: openDialogActionCreator },
  { icon: <DeleteIcon />, name: 'Toast', action: openToastActionCreator },
];

export const SpeedDialContext = React.createContext(
  undefined as SpeedDialContext
);

export const DodaySpeedDial = (props: SpeedDialProps) => {
  const dispatch = useDispatch();
  const css = useStyles(undefined);
  const { open, handleClose, handleOpen } = props;

  const creatable = useSelector(creatableEntitiesLabelsSelector);

  const handleClick = (item: any) => {
    switch (item.name) {
      case 'Dialog':
        dispatch(
          item.action({
            open: true,
            title: 'Hello there!',
            message: 'What you choose?',
            actions: [
              <Button
                key={1}
                onClick={() => {
                  dispatch(closeDialogActionCreator());
                }}
              >
                No
              </Button>,
              <Button
                key={2}
                onClick={() => {
                  dispatch(closeDialogActionCreator());
                }}
              >
                Yes
              </Button>,
            ],
          })
        );
        return;
      case 'Toast':
        dispatch(
          item.action({
            open: true,
            messages: ['Hello there'],
          })
        );
        return;
    }
  };

  return (
    <SpeedDialContext.Provider value={{ handleClose }}>
      <SpeedDial
        ariaLabel="Doday speed dial button"
        className={css.speedDial}
        icon={<SpeedDialIcon />}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {mockedActions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={action.name}
            onClick={() => handleClick(action)}
          />
        ))}
        <Spot
          moduleTypes={[ModuleType.Tool]}
          renderAll
          spot={SpeedDialSpot.Item}
          nodes={creatable}
        />
      </SpeedDial>
    </SpeedDialContext.Provider>
  );
};
