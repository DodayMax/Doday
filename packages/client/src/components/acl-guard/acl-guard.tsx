import * as React from 'react';
import { RootState } from '@doday/lib';
import { useSelector } from 'react-redux';
import { Icons } from '@doday/ui';
import { useTheme } from '@material-ui/core';

export interface ACLGuardProps {
  permission?: any;
  allowed: React.ReactElement<any>;
  forbidden?: React.ReactElement<any>;
}

// Guard for auth and permissions

export const ACLGuard = (props: ACLGuardProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth && state.auth.isAuthenticated
  );
  const theme = useTheme();
  const checkPermission = (permission: string) => true;

  const { permission, allowed, forbidden } = props;

  const renderContent = () => {
    if (isAuthenticated === undefined) {
      return <Icons.InlineLoader color={theme.palette.text.primary} />;
    }

    if (
      isAuthenticated &&
      (!permission || (permission && checkPermission(permission)))
    ) {
      return allowed;
    } else {
      return forbidden || null;
    }
  };

  return <React.Suspense fallback={null}>{renderContent()}</React.Suspense>;
};
