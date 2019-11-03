import React, { useContext } from 'react';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {
  NodeLabel,
  STACKED_ROUTES,
  DodayRoutes,
  ModuleSysname,
} from '@doday/lib';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@root/modules/core/navigation';
import { SpeedDialContext } from '@root/components/speed-dial/speed-dial';
import { routes } from '../../routes';

export const ActivitySpeedDialItem = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleClose } = useContext(SpeedDialContext);

  const handleClick = () => {
    handleClose();
    dispatch(pushRouteActionCreator(routes.builder.create().build()));
  };
  return (
    <SpeedDialAction
      key={NodeLabel.Activity}
      ref={ref}
      {...props}
      icon={<CheckBoxOutlineBlankIcon />}
      tooltipTitle={'Activity'}
      tooltipOpen
      onClick={() => handleClick()}
    />
  );
});
