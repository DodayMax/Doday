import * as React from 'react';
import { Page, PageHeader } from '../../shared/_molecules/page';
import { Pageflow } from '../../shared/_decorators/pageflow';
import { Typography } from '@material-ui/core';

@Pageflow({ path: '/profile' })
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
