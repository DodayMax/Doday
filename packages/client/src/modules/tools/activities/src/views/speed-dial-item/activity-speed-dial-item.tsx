import React from 'react';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { NodeLabel, STACKED_ROUTES } from '@doday/lib';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@root/modules/core/navigation';

export const ActivitySpeedDialItem = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(pushRouteActionCreator(STACKED_ROUTES.builder));
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
