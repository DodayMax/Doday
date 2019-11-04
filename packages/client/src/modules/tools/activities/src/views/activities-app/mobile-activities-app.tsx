import React from 'react';
import { Page } from '@root/components/page';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@root/modules/core/navigation';
import { routes } from '../../routes';

export const MobileActivitiesApp = () => {
  const dispatch = useDispatch();

  return (
    <Page base>
      Activities Sidebar
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
    </Page>
  );
};
