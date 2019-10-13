import * as React from 'react';
import { RootState } from '@doday/lib';
import { connect, useSelector } from 'react-redux';
import { auth } from '@doday/lib';
import { Icons } from '@doday/shared';
import { useTheme } from '@material-ui/core';

export interface ACLGuardProps {
  permission?: any;
  allowed: React.ReactElement<any>;
  forbidden?: React.ReactElement<any>;
}

// Guard for auth and permissions

export const ACLGuard = (props: ACLGuardProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
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
      auth.currentUser &&
      (!permission || (permission && checkPermission(permission)))
    ) {
      return allowed;
    } else {
      return forbidden || null;
    }
  };

  return <React.Suspense fallback={null}>{renderContent()}</React.Suspense>;
};

const mapState = (state: RootState) => ({
  auth: !!state.auth.hero,
});

export default connect(mapState)(ACLGuard);
