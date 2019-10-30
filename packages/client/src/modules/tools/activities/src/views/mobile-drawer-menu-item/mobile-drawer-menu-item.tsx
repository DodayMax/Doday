import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@core/navigation';
import { ModuleSysname } from '@doday/lib';
import { toggleDrawerActionCreator } from '@root/modules/core/layout';

export const MobileActivitiesDrawerMenuItem = () => {
  const dispatch = useDispatch();

  return (
    <ListItem
      key={ModuleSysname.Activities}
      button
      onClick={() => {
        dispatch(pushRouteActionCreator(`/${ModuleSysname.Activities}`));
        dispatch(toggleDrawerActionCreator());
      }}
    >
      <ListItemIcon>
        <DataUsageIcon fontSize={'large'} />
      </ListItemIcon>
      <ListItemText
        primary={'Activities'}
        primaryTypographyProps={{
          variant: 'body1',
        }}
      />
    </ListItem>
  );
};
