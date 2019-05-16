import * as React from 'react';
import { Text } from '../../shared/_atoms/typography';
import { Page, PageHeader } from '../../shared/_molecules/page';
import { TypographySize } from '@root/lib/common-interfaces';
import { Pageflow } from '../../shared/_support/pageflow';

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
        <Text size={TypographySize.h1}>Profile</Text>
      </Page>
    );
  }
}
