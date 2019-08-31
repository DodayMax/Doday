import * as React from 'react';
import { RootState } from '@doday/lib';
import { connect } from 'react-redux';

export interface ACLGuardProps {
  permission?: any;
  allowed: React.ReactElement<any>;
  forbidden?: React.ReactElement<any>;
}

interface PropsFromConnect {
  auth: boolean;
}

// Guard for auth and permissions

export class ACLGuard extends React.Component<
  ACLGuardProps & PropsFromConnect
> {
  // just mock for now
  checkPermission = (permission: string) => true;

  render() {
    const { permission, auth, allowed, forbidden } = this.props;
    if (permission && this.checkPermission(permission)) {
      return null;
    } else if (auth) {
      return allowed;
    } else {
      return forbidden || null;
    }
  }
}

const mapState = (state: RootState) => ({
  auth: !!state.auth.hero,
});

export default connect(mapState)(ACLGuard);
