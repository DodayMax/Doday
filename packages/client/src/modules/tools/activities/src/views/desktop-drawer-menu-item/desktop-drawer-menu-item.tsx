import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import { useDispatch } from 'react-redux';
import { changeSidebarRouteActionCreator } from '@core/navigation';
import { routes } from '../../routes';
import { ModuleSysname } from '@doday/lib';

export const ActivitiesDrawerMenuItem = () => {
  const dispatch = useDispatch();

  return (
    <ListItem
      key={ModuleSysname.Activities}
      button
      onClick={() => {
        dispatch(
          changeSidebarRouteActionCreator(routes.activityApp.create().build())
        );
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
