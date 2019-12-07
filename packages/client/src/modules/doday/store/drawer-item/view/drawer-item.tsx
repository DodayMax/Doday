import React, { useContext } from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { ModuleSysname, NodeLabel, LayoutType, RouteSysname } from '@doday/lib';
import { pushRouteActionCreator } from '@redux/navigation';
import { LayoutContext } from '@modules/layout/view/layout';
import { toggleDrawerActionCreator } from '@redux/layout';
import { RouteSystem } from '@root/core/systems';

export const StoreDrawerMenuItem = () => {
  const dispatch = useDispatch();
  const layoutType = useContext(LayoutContext);

  return (
    <ListItem
      key={ModuleSysname.Store}
      button
      onClick={() => {
        dispatch(
          pushRouteActionCreator(
            RouteSystem.api()
              .routes[RouteSysname.Store].create()
              .query({ node: [NodeLabel.Tool, NodeLabel.Module].join(',') })
              .build()
          )
        );
        if (layoutType === LayoutType.Mobile) {
          dispatch(toggleDrawerActionCreator());
        }
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
