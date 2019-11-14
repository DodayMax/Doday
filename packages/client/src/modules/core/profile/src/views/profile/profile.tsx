import React from 'react';
import { NavigationRoute } from '@root/modules/core/navigation';
import { routes } from '../../routes';

export const Profile = () => {
  return (
    <NavigationRoute base path={routes.profile.pattern}>
      {route => <div>Profile</div>}
    </NavigationRoute>
  );
};
