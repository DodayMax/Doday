import React, { useContext } from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { routes } from '../../routes';
import { ModuleSysname, NodeLabel, LayoutType } from '@doday/lib';
import { pushRouteActionCreator } from '@root/modules/core/navigation';
import { LayoutContext } from '@root/modules/core/layout/src/views/layout';
import { toggleDrawerActionCreator } from '@root/modules/core/layout';

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
            routes.store
              .create()
              .query({ node: NodeLabel.Tool })
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
