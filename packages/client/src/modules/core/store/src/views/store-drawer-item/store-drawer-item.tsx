import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { routes } from '../../routes';
import { ModuleSysname, NodeLabel } from '@doday/lib';
import { pushRouteActionCreator } from '@root/modules/core/navigation';

export const StoreDrawerMenuItem = () => {
  const dispatch = useDispatch();

  return (
    <ListItem
      key={ModuleSysname.Store}
      button
      onClick={() => {
        dispatch(
          pushRouteActionCreator(
            routes.store
              .create()
              .query({ node: NodeLabel.Module })
              .build()
          )
        );
      }}
    >
      <ListItemIcon>
        <AddIcon fontSize={'large'} />
      </ListItemIcon>
      <ListItemText
        primary={'Add modules'}
        primaryTypographyProps={{
          variant: 'body1',
        }}
      />
    </ListItem>
  );
};
