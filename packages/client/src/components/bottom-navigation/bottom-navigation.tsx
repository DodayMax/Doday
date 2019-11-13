import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { baseRouteSelector } from '@core/navigation';
import { pushRouteActionCreator } from '@core/navigation';
import AppsIcon from '@material-ui/icons/Apps';
import FaceIcon from '@material-ui/icons/Face';
import { useTranslation } from 'react-i18next';
import { BASE_ROUTES } from '@doday/lib';

export const DodayBottomNavigation = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const baseRoute = useSelector(baseRouteSelector);

  return (
    <BottomNavigation
      value={baseRoute.path}
      onChange={(event, newValue) => {
        dispatch(
          pushRouteActionCreator({
            path: newValue,
            base: newValue,
            url: newValue,
          })
        );
      }}
      showLabels
      {...props}
    >
      <BottomNavigationAction
        value={BASE_ROUTES.store}
        label={t('store:title')}
        icon={<AppsIcon />}
      />
      <BottomNavigationAction
        value={BASE_ROUTES.profile}
        label={t('store:profile')}
        icon={<FaceIcon />}
      />
    </BottomNavigation>
  );
};
