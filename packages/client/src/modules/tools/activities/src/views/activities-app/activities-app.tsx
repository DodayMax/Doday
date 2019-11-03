import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@root/modules/core/navigation';
import { routes } from '../../routes';

export const ActivitiesApp = () => {
  const dispatch = useDispatch();

  return (
    <Box display="flex" flexDirection="column">
      <div>Activities Sidebar</div>
      <Button
        onClick={() => {
          dispatch(
            pushRouteActionCreator(
              routes.details.create('k1j3kj12j31kkkk').build()
            )
          );
        }}
      >
        Push route
      </Button>
    </Box>
  );
};
