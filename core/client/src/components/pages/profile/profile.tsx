import * as React from 'react';
import { Page, PageHeader, pageflow } from '@doday/shared';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logoutActionCreator } from '@doday/ducks';

export const Profile = pageflow()(() => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutActionCreator());
  };
  return (
    <Page
      permanent
      header={
        <PageHeader>
          <a onClick={logout}>Logout</a>
        </PageHeader>
      }
    >
      <Typography variant="h2">Profile</Typography>
    </Page>
  );
});
