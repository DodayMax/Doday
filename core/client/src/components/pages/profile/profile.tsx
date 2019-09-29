import * as React from 'react';
import { Page, PageHeader, pageflow } from '@doday/shared';
import { Typography } from '@material-ui/core';

export const Profile = pageflow()(() => {
  return (
    <Page
      header={
        <PageHeader withClose>
          <a href="/api/logout">Logout</a>
        </PageHeader>
      }
    >
      <Typography variant="h2">Profile</Typography>
    </Page>
  );
});
