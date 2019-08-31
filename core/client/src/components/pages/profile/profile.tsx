import * as React from 'react';
import { Page, PageHeader, Pageflow } from '@doday/shared';
import { Typography } from '@material-ui/core';

@Pageflow({ path: '/dashboard/profile' })
export class Profile extends React.Component {
  render() {
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
  }
}
