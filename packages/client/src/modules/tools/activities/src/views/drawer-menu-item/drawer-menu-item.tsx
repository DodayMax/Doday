import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';

export const ActivitiesDrawerMenuItem = () => {
  return (
    <>
      <ListItemIcon>
        <DataUsageIcon fontSize={'large'} />
      </ListItemIcon>
      <ListItemText
        primary={'Activities'}
        primaryTypographyProps={{
          variant: 'body1',
        }}
      />
    </>
  );
};
